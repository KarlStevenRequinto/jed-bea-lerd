import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getFeedPostById } from "@/lib/services/feed";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_IMAGES = 6;

type ListingCategoryInput = "real-estate" | "vehicle";

const sanitizeFilename = (filename: string): string =>
    filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();

const parsePrice = (priceInput: string): number => {
    const normalized = priceInput.replace(/[^0-9.]/g, "");
    return Number(normalized);
};

const buildTitle = (
    category: ListingCategoryInput,
    location: string,
    specs: Record<string, string>
): string => {
    if (category === "vehicle") {
        const vehicleDescriptors = [specs.transmission, specs.fuelType, "Vehicle"]
            .filter(Boolean)
            .join(" ");
        return `${vehicleDescriptors} in ${location}`.trim();
    }

    const bedroomPrefix = specs.bedrooms ? `${specs.bedrooms}-BR ` : "";
    return `${bedroomPrefix}Property in ${location}`.trim();
};

const buildDescription = (
    category: ListingCategoryInput,
    location: string,
    specs: Record<string, string>,
    customFeatures: Array<{ label: string; value: string }>
): string => {
    const summary =
        category === "vehicle"
            ? `Fresh vehicle listing available in ${location}.`
            : `Fresh real estate listing available in ${location}.`;

    const specEntries = Object.entries(specs)
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}: ${value}`);
    const customEntries = customFeatures.map((feature) => `${feature.label}: ${feature.value}`);
    const details = [...specEntries, ...customEntries];

    return details.length > 0 ? `${summary} ${details.join(" · ")}` : summary;
};

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    let formData: FormData;
    try {
        formData = await request.formData();
    } catch {
        return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const category = String(formData.get("category") ?? "") as ListingCategoryInput;
    const titleInput = String(formData.get("title") ?? "").trim();
    const captionInput = String(formData.get("caption") ?? "").trim();
    const priceInput = String(formData.get("price") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const featuredImage = formData.get("featuredImage");
    const additionalImages = formData
        .getAll("additionalImages")
        .filter((item): item is File => item instanceof File && item.size > 0);
    const customFeaturesRaw = String(formData.get("customFeatures") ?? "[]");

    if (category !== "real-estate" && category !== "vehicle") {
        return NextResponse.json({ error: "Invalid listing category." }, { status: 422 });
    }

    const price = parsePrice(priceInput);
    if (!Number.isFinite(price) || price <= 0) {
        return NextResponse.json({ error: "A valid listing price is required." }, { status: 422 });
    }

    if (!location) {
        return NextResponse.json({ error: "Location is required." }, { status: 422 });
    }

    if (!(featuredImage instanceof File) || featuredImage.size === 0) {
        return NextResponse.json({ error: "A featured image is required." }, { status: 422 });
    }

    const allImages = [featuredImage, ...additionalImages];
    if (allImages.length > MAX_TOTAL_IMAGES) {
        return NextResponse.json(
            { error: `You can upload up to ${MAX_TOTAL_IMAGES} listing images.` },
            { status: 422 }
        );
    }

    for (const image of allImages) {
        if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
            return NextResponse.json(
                { error: "Unsupported image type. Use JPEG, PNG, or WebP." },
                { status: 422 }
            );
        }

        if (image.size > MAX_IMAGE_SIZE_BYTES) {
            return NextResponse.json(
                { error: "Each image must be 5 MB or smaller." },
                { status: 422 }
            );
        }
    }

    let customFeatures: Array<{ label: string; value: string }> = [];
    try {
        const parsed = JSON.parse(customFeaturesRaw);
        if (Array.isArray(parsed)) {
            customFeatures = parsed.filter(
                (feature): feature is { label: string; value: string } =>
                    Boolean(feature?.label) && Boolean(feature?.value)
            );
        }
    } catch {
        return NextResponse.json({ error: "Invalid custom features payload." }, { status: 422 });
    }

    const specs =
        category === "vehicle"
            ? {
                mileage: String(formData.get("mileage") ?? "").trim(),
                fuelType: String(formData.get("fuel") ?? "").trim(),
                transmission: String(formData.get("transmission") ?? "").trim(),
                ...Object.fromEntries(customFeatures.map((feature) => [feature.label, feature.value])),
            }
            : {
                bedrooms: String(formData.get("bedrooms") ?? "").trim(),
                bathrooms: String(formData.get("bathrooms") ?? "").trim(),
                sqft: String(formData.get("sqft") ?? "").trim(),
                ...Object.fromEntries(customFeatures.map((feature) => [feature.label, feature.value])),
            };

    const title = titleInput || buildTitle(category, location, specs);
    const description = buildDescription(category, location, specs, customFeatures);

    const admin = createAdminClient();

    const { data: insertedListing, error: listingInsertError } = await admin
        .from("listings")
        .insert({
            user_id: user.id,
            category: category === "vehicle" ? "VEHICLE" : "PROPERTY",
            title,
            description,
            price,
            location,
            image_url: null,
            specs,
            status: "active",
        })
        .select("id")
        .single();

    if (listingInsertError || !insertedListing) {
        console.error("[create-listing] Failed to create listing:", listingInsertError);
        return NextResponse.json({ error: "Failed to create listing." }, { status: 500 });
    }

    const uploadedPaths: string[] = [];

    try {
        const storedMediaRows: Array<{
            listing_id: string;
            storage_path: string;
            public_url: string;
            sort_order: number;
            is_featured: boolean;
        }> = [];

        for (const [index, image] of allImages.entries()) {
            const fileLabel = index === 0 ? "featured" : `gallery-${index}`;
            const storagePath = `${user.id}/${insertedListing.id}/${fileLabel}-${sanitizeFilename(image.name)}`;

            const { error: uploadError } = await admin.storage
                .from("listing-media")
                .upload(storagePath, image, {
                    upsert: true,
                    contentType: image.type,
                });

            if (uploadError) {
                throw uploadError;
            }

            uploadedPaths.push(storagePath);
            const {
                data: { publicUrl },
            } = admin.storage.from("listing-media").getPublicUrl(storagePath);

            storedMediaRows.push({
                listing_id: insertedListing.id,
                storage_path: storagePath,
                public_url: publicUrl,
                sort_order: index,
                is_featured: index === 0,
            });
        }

        const featuredUrl = storedMediaRows[0]?.public_url ?? null;

        const { error: listingUpdateError } = await admin
            .from("listings")
            .update({ image_url: featuredUrl })
            .eq("id", insertedListing.id);

        if (listingUpdateError) {
            throw listingUpdateError;
        }

        if (storedMediaRows.length > 0) {
            const { error: mediaInsertError } = await admin
                .from("listing_media")
                .insert(storedMediaRows);

            if (mediaInsertError) {
                throw mediaInsertError;
            }
        }

        const { data: insertedFeedPost, error: feedPostError } = await admin
            .from("feed_posts")
            .insert({
                user_id: user.id,
                listing_id: insertedListing.id,
                content: captionInput || null,
                post_type: category === "vehicle" ? "vehicle" : "property",
                status: "published",
            })
            .select("id")
            .single();

        if (feedPostError || !insertedFeedPost) {
            throw feedPostError ?? new Error("Feed post insert failed");
        }

        const post = await getFeedPostById(insertedFeedPost.id);
        if (!post) {
            throw new Error("Published listing feed post could not be loaded");
        }

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error("[create-listing] Failed during publish flow:", error);

        if (uploadedPaths.length > 0) {
            await admin.storage.from("listing-media").remove(uploadedPaths);
        }

        await admin.from("feed_posts").delete().eq("listing_id", insertedListing.id);
        await admin.from("listing_media").delete().eq("listing_id", insertedListing.id);
        await admin.from("listings").delete().eq("id", insertedListing.id);

        return NextResponse.json({ error: "Failed to publish listing." }, { status: 500 });
    }
}

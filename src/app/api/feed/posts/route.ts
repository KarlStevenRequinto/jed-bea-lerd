import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getFeedPostById } from "@/lib/services/feed";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_MEDIA_FILES = 4;

const sanitizeFilename = (filename: string): string =>
    filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();

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

    const content = String(formData.get("content") ?? "").trim();
    const mediaFiles = formData
        .getAll("mediaFiles")
        .filter((item): item is File => item instanceof File && item.size > 0);

    if (!content && mediaFiles.length === 0) {
        return NextResponse.json({ error: "Post content or media is required" }, { status: 422 });
    }

    if (mediaFiles.length > MAX_MEDIA_FILES) {
        return NextResponse.json(
            { error: `You can upload up to ${MAX_MEDIA_FILES} files per post.` },
            { status: 422 }
        );
    }

    for (const file of mediaFiles) {
        const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
        const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

        if (!isImage && !isVideo) {
            return NextResponse.json(
                { error: "Unsupported media type. Use JPEG, PNG, WebP, MP4, WebM, or MOV." },
                { status: 422 }
            );
        }

        if (isImage && file.size > MAX_IMAGE_SIZE_BYTES) {
            return NextResponse.json(
                { error: "Image files must be 5 MB or smaller." },
                { status: 422 }
            );
        }

        if (isVideo && file.size > MAX_VIDEO_SIZE_BYTES) {
            return NextResponse.json(
                { error: "Video files must be 10 MB or smaller." },
                { status: 422 }
            );
        }
    }

    const admin = createAdminClient();
    const { data: insertedPost, error: insertError } = await admin
        .from("feed_posts")
        .insert({
            user_id: user.id,
            content: content || null,
            post_type: "social",
            status: "published",
        })
        .select("id")
        .single();

    if (insertError || !insertedPost) {
        console.error("[create-feed-post] Failed to create post:", insertError);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    const createdMediaRows: {
        post_id: string;
        media_type: "image" | "video";
        storage_path: string;
        public_url: string;
        sort_order: number;
    }[] = [];
    const uploadedStoragePaths: string[] = [];

    for (const [index, file] of mediaFiles.entries()) {
        const mediaType = file.type.startsWith("video/") ? "video" : "image";
        const storagePath = `${user.id}/${insertedPost.id}/${index}-${sanitizeFilename(file.name)}`;

        const { error: uploadError } = await admin.storage.from("feed-media").upload(storagePath, file, {
            upsert: true,
            contentType: file.type,
        });

        if (uploadError) {
            console.error("[create-feed-post] Failed to upload media:", uploadError);
            if (uploadedStoragePaths.length > 0) {
                await admin.storage.from("feed-media").remove(uploadedStoragePaths);
            }
            await admin.from("feed_posts").delete().eq("id", insertedPost.id);
            return NextResponse.json({ error: "Failed to upload media" }, { status: 500 });
        }

        uploadedStoragePaths.push(storagePath);

        const {
            data: { publicUrl },
        } = admin.storage.from("feed-media").getPublicUrl(storagePath);

        createdMediaRows.push({
            post_id: insertedPost.id,
            media_type: mediaType,
            storage_path: storagePath,
            public_url: publicUrl,
            sort_order: index,
        });
    }

    if (createdMediaRows.length > 0) {
        const { error: mediaInsertError } = await admin.from("feed_post_media").insert(createdMediaRows);

        if (mediaInsertError) {
            console.error("[create-feed-post] Failed to save media rows:", mediaInsertError);
            if (uploadedStoragePaths.length > 0) {
                await admin.storage.from("feed-media").remove(uploadedStoragePaths);
            }
            await admin.from("feed_posts").delete().eq("id", insertedPost.id);
            return NextResponse.json({ error: "Failed to save uploaded media" }, { status: 500 });
        }
    }

    const post = await getFeedPostById(insertedPost.id);
    if (!post) {
        return NextResponse.json({ error: "Post created but could not be loaded" }, { status: 500 });
    }

    return NextResponse.json({ post }, { status: 201 });
}

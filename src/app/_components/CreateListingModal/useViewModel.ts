import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { FeedPost } from "@/lib/types/feed";

export type ListingCategory = "real-estate" | "vehicle";

export interface CustomFeature {
    id: string;
    label: string;
    value: string;
}

export interface ImagePreview {
    id: string;
    file: File;
    url: string;
}

interface UseCreateListingModalViewModelProps {
    onClose: () => void;
    onPublished?: (post: FeedPost) => void;
}

export const useCreateListingModalViewModel = ({ onClose, onPublished }: UseCreateListingModalViewModelProps) => {
    const router = useRouter();
    const [category, setCategory] = useState<ListingCategory>("real-estate");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [sqft, setSqft] = useState("");
    const [mileage, setMileage] = useState("");
    const [fuel, setFuel] = useState("");
    const [transmission, setTransmission] = useState("");
    const [customFeatures, setCustomFeatures] = useState<CustomFeature[]>([]);
    const [featuredImage, setFeaturedImage] = useState<ImagePreview | null>(null);
    const [additionalImages, setAdditionalImages] = useState<ImagePreview[]>([]);
    const [isPublishing, setIsPublishing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const featuredImageRef = useRef<HTMLInputElement>(null);
    const additionalImagesRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleCategoryChange = (cat: ListingCategory) => {
        setCategory(cat);
        setBedrooms("");
        setBathrooms("");
        setSqft("");
        setMileage("");
        setFuel("");
        setTransmission("");
        setCustomFeatures([]);
        setErrorMessage("");
    };

    const addCustomFeature = () => {
        setCustomFeatures((prev) => [
            ...prev,
            { id: `feat-${Date.now()}-${Math.random()}`, label: "", value: "" },
        ]);
    };

    const updateCustomFeature = (id: string, field: "label" | "value", val: string) => {
        setCustomFeatures((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: val } : f)));
    };

    const removeCustomFeature = (id: string) => {
        setCustomFeatures((prev) => prev.filter((f) => f.id !== id));
    };

    const handleFeaturedImageSelect = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const file = files[0];
        if (featuredImage) URL.revokeObjectURL(featuredImage.url);
        setFeaturedImage({ id: `feat-${Date.now()}`, file, url: URL.createObjectURL(file) });
        setErrorMessage("");
        if (featuredImageRef.current) featuredImageRef.current.value = "";
    };

    const handleAdditionalImagesSelect = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const newImages: ImagePreview[] = Array.from(files).map((file) => ({
            id: `${Date.now()}-${Math.random()}`,
            file,
            url: URL.createObjectURL(file),
        }));
        setAdditionalImages((prev) => [...prev, ...newImages]);
        setErrorMessage("");
        if (additionalImagesRef.current) additionalImagesRef.current.value = "";
    };

    const removeAdditionalImage = (id: string) => {
        setAdditionalImages((prev) => {
            const target = prev.find((i) => i.id === id);
            if (target) URL.revokeObjectURL(target.url);
            return prev.filter((i) => i.id !== id);
        });
    };

    const cleanup = () => {
        if (featuredImage) URL.revokeObjectURL(featuredImage.url);
        additionalImages.forEach((i) => URL.revokeObjectURL(i.url));
    };

    const handleClose = () => {
        if (isPublishing) return;
        cleanup();
        onClose();
    };

    const handleDiscardDraft = () => {
        if (isPublishing) return;
        cleanup();
        onClose();
    };

    const handleSaveProgress = () => {
        onClose();
    };

    const handlePublish = async () => {
        if (!featuredImage || isPublishing) return;

        setIsPublishing(true);
        setErrorMessage("");

        try {
            const formData = new FormData();
            formData.append("category", category);
            formData.append("price", price.trim());
            formData.append("location", location.trim());
            formData.append("featuredImage", featuredImage.file);

            if (category === "real-estate") {
                formData.append("bedrooms", bedrooms.trim());
                formData.append("bathrooms", bathrooms.trim());
                formData.append("sqft", sqft.trim());
            } else {
                formData.append("mileage", mileage.trim());
                formData.append("fuel", fuel.trim());
                formData.append("transmission", transmission.trim());
            }

            formData.append(
                "customFeatures",
                JSON.stringify(
                    customFeatures
                        .map((feature) => ({
                            label: feature.label.trim(),
                            value: feature.value.trim(),
                        }))
                        .filter((feature) => feature.label && feature.value)
                )
            );

            additionalImages.forEach((image) => {
                formData.append("additionalImages", image.file);
            });

            const response = await fetch("/api/listings", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                setErrorMessage(result.error ?? "Failed to publish listing.");
                return;
            }

            if (result.post) {
                onPublished?.(result.post as FeedPost);
            }

            cleanup();
            onClose();
            router.refresh();
        } catch (error) {
            console.error("[create-listing] Failed to publish listing:", error);
            setErrorMessage("Failed to publish listing. Please try again.");
        } finally {
            setIsPublishing(false);
        }
    };

    const canPublish = price.trim() !== "" && location.trim() !== "" && featuredImage !== null;

    return {
        category,
        price,
        setPrice,
        location,
        setLocation,
        bedrooms,
        setBedrooms,
        bathrooms,
        setBathrooms,
        sqft,
        setSqft,
        mileage,
        setMileage,
        fuel,
        setFuel,
        transmission,
        setTransmission,
        customFeatures,
        addCustomFeature,
        updateCustomFeature,
        removeCustomFeature,
        featuredImage,
        additionalImages,
        featuredImageRef,
        additionalImagesRef,
        handleCategoryChange,
        handleFeaturedImageSelect,
        handleAdditionalImagesSelect,
        removeAdditionalImage,
        canPublish,
        handleClose,
        handleDiscardDraft,
        handleSaveProgress,
        handlePublish,
        isPublishing,
        errorMessage,
    };
};

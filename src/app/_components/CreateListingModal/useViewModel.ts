import { useState, useRef, useEffect } from "react";

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
}

export const useCreateListingModalViewModel = ({ onClose }: UseCreateListingModalViewModelProps) => {
    const [category, setCategory] = useState<ListingCategory>("real-estate");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");

    // Real estate features
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [sqft, setSqft] = useState("");

    // Vehicle features
    const [mileage, setMileage] = useState("");
    const [fuel, setFuel] = useState("");
    const [transmission, setTransmission] = useState("");

    // Custom / extra features
    const [customFeatures, setCustomFeatures] = useState<CustomFeature[]>([]);

    // Media
    const [featuredImage, setFeaturedImage] = useState<ImagePreview | null>(null);
    const [additionalImages, setAdditionalImages] = useState<ImagePreview[]>([]);

    const featuredImageRef = useRef<HTMLInputElement>(null);
    const additionalImagesRef = useRef<HTMLInputElement>(null);

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleCategoryChange = (cat: ListingCategory) => {
        setCategory(cat);
        // Reset category-specific fields when switching
        setBedrooms("");
        setBathrooms("");
        setSqft("");
        setMileage("");
        setFuel("");
        setTransmission("");
        setCustomFeatures([]);
    };

    const addCustomFeature = () => {
        setCustomFeatures((prev) => [
            ...prev,
            { id: `feat-${Date.now()}-${Math.random()}`, label: "", value: "" },
        ]);
    };

    const updateCustomFeature = (id: string, field: "label" | "value", val: string) => {
        setCustomFeatures((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [field]: val } : f))
        );
    };

    const removeCustomFeature = (id: string) => {
        setCustomFeatures((prev) => prev.filter((f) => f.id !== id));
    };

    const handleFeaturedImageSelect = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const file = files[0];
        if (featuredImage) URL.revokeObjectURL(featuredImage.url);
        setFeaturedImage({ id: `feat-${Date.now()}`, file, url: URL.createObjectURL(file) });
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
        cleanup();
        onClose();
    };

    const handleDiscardDraft = () => {
        cleanup();
        onClose();
    };

    const handleSaveProgress = () => {
        // TODO: persist draft to backend
        onClose();
    };

    const handlePublish = () => {
        // TODO: submit listing to backend
        cleanup();
        onClose();
    };

    const canPublish =
        price.trim() !== "" && location.trim() !== "" && featuredImage !== null;

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
    };
};

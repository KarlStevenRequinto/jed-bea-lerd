import { useState, useRef, useEffect } from "react";
import { MediaPreview } from "../FeedComposer/useViewModel";
import type { FeedPost } from "@/lib/types/feed";

interface UseCreatePostModalViewModelProps {
    initialMedia: MediaPreview[];
    onClose: () => void;
    onPost: (post: FeedPost) => void;
}

export const useCreatePostModalViewModel = ({
    initialMedia,
    onClose,
    onPost,
}: UseCreatePostModalViewModelProps) => {
    const [media, setMedia] = useState<MediaPreview[]>(initialMedia);
    const [caption, setCaption] = useState("");
    const addMoreRef = useRef<HTMLInputElement>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleCaptionChange = (value: string) => {
        setErrorMessage("");
        setCaption(value);
        const el = textareaRef.current;
        if (el) {
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
        }
    };

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleAddMore = () => addMoreRef.current?.click();
    const handlePhotoClick = () => photoInputRef.current?.click();
    const handleVideoClick = () => videoInputRef.current?.click();

    const handleMediaFiles = (files: FileList | null, type: "image" | "video") => {
        if (!files || files.length === 0) return;
        setErrorMessage("");
        const newPreviews: MediaPreview[] = Array.from(files).map((file) => ({
            id: `${Date.now()}-${Math.random()}`,
            file,
            url: URL.createObjectURL(file),
            type,
        }));
        setMedia((prev) => [...prev, ...newPreviews]);
        if (photoInputRef.current) photoInputRef.current.value = "";
        if (videoInputRef.current) videoInputRef.current.value = "";
    };

    const handleAddMoreFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setErrorMessage("");
        const newPreviews: MediaPreview[] = Array.from(files).map((file) => ({
            id: `${Date.now()}-${Math.random()}`,
            file,
            url: URL.createObjectURL(file),
            type: file.type.startsWith("video/") ? "video" : "image",
        }));
        setMedia((prev) => [...prev, ...newPreviews]);
        if (addMoreRef.current) addMoreRef.current.value = "";
    };

    const handleRemoveMedia = (id: string) => {
        setMedia((prev) => {
            const target = prev.find((p) => p.id === id);
            if (target) URL.revokeObjectURL(target.url);
            return prev.filter((p) => p.id !== id);
        });
    };

    const cleanup = () => {
        media.forEach((p) => URL.revokeObjectURL(p.url));
        setMedia([]);
        setCaption("");
    };

    const handlePost = async () => {
        if (isPosting) return;

        try {
            setIsPosting(true);
            setErrorMessage("");

            const formData = new FormData();
            formData.append("content", caption.trim());
            media.forEach((preview) => {
                formData.append("mediaFiles", preview.file);
            });

            const response = await fetch("/api/feed/posts", {
                method: "POST",
                body: formData,
            });

            const payload = await response.json().catch(() => null);
            if (!response.ok || !payload?.post) {
                throw new Error(payload?.error || "Failed to publish post.");
            }

            media.forEach((preview) => URL.revokeObjectURL(preview.url));
            onPost(payload.post as FeedPost);
            setMedia([]);
            setCaption("");
            onClose();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Failed to publish post.");
        } finally {
            setIsPosting(false);
        }
    };

    const handleSaveDraft = () => {
        // TODO: persist draft
        cleanup();
        onClose();
    };

    const handleClose = () => {
        cleanup();
        onClose();
    };

    const mediaLabel =
        media.length === 0
            ? null
            : media.every((m) => m.type === "video")
              ? `Selected Videos (${media.length})`
              : media.every((m) => m.type === "image")
                ? `Selected Photos (${media.length})`
                : `Selected Media (${media.length})`;

    const canPost = caption.trim().length > 0 || media.length > 0;

    return {
        media,
        caption,
        setCaption,
        textareaRef,
        handleCaptionChange,
        addMoreRef,
        photoInputRef,
        videoInputRef,
        mediaLabel,
        canPost,
        isPosting,
        errorMessage,
        handleAddMore,
        handlePhotoClick,
        handleVideoClick,
        handleMediaFiles,
        handleAddMoreFiles,
        handleRemoveMedia,
        handlePost,
        handleSaveDraft,
        handleClose,
    };
};

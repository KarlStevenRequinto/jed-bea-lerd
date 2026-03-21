import { useState, useRef, useEffect } from "react";
import { MediaPreview } from "../FeedComposer/useViewModel";

interface UseCreatePostModalViewModelProps {
    initialMedia: MediaPreview[];
    onClose: () => void;
    onPost: (caption: string, media: MediaPreview[]) => void;
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

    const handleCaptionChange = (value: string) => {
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

    const handlePost = () => {
        // Call onPost before clearing so object URLs remain valid in the feed
        onPost(caption, media);
        // Clear state without revoking URLs (feed post still references them)
        setMedia([]);
        setCaption("");
        onClose();
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

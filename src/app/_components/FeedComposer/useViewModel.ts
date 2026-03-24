import { useState, useRef } from "react";
import { useAppSelector } from "@/store";
import type { FeedPost } from "@/lib/types/feed";

export interface MediaPreview {
    id: string;
    file: File;
    url: string;
    type: "image" | "video";
}

interface UseFeedComposerViewModelProps {
    onPost: (post: FeedPost) => void;
}

export const useFeedComposerViewModel = ({ onPost }: UseFeedComposerViewModelProps) => {
    const user = useAppSelector((s) => s.auth.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInitialMedia, setModalInitialMedia] = useState<MediaPreview[]>([]);
    const [modalKey, setModalKey] = useState(0);

    const photoInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const userInitials =
        user?.firstName && user?.lastName
            ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
            : (user?.email?.[0]?.toUpperCase() ?? "U");

    const firstName = user?.firstName ?? "there";

    const openModal = (media: MediaPreview[]) => {
        setModalInitialMedia(media);
        setModalKey((k) => k + 1);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalInitialMedia([]);
    };

    const handlePhotoClick = () => photoInputRef.current?.click();
    const handleVideoClick = () => videoInputRef.current?.click();

    const handleFilesSelected = (files: FileList | null, type: "image" | "video") => {
        if (!files || files.length === 0) return;
        const previews: MediaPreview[] = Array.from(files).map((file) => ({
            id: `${Date.now()}-${Math.random()}`,
            file,
            url: URL.createObjectURL(file),
            type,
        }));
        if (photoInputRef.current) photoInputRef.current.value = "";
        if (videoInputRef.current) videoInputRef.current.value = "";
        openModal(previews);
    };

    return {
        user,
        userInitials,
        firstName,
        isModalOpen,
        modalInitialMedia,
        modalKey,
        photoInputRef,
        videoInputRef,
        onPost,
        openModal,
        closeModal,
        handlePhotoClick,
        handleVideoClick,
        handleFilesSelected,
    };
};

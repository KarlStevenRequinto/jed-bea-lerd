"use client";

import Image from "next/image";
import { useFeedComposerViewModel } from "./useViewModel";
import CreatePostModal from "../CreatePostModal";
import CreateListingModal from "../CreateListingModal";
import type { FeedPost } from "@/lib/types/feed";

interface FeedComposerProps {
    onPost: (post: FeedPost) => void;
}

const FeedComposer = ({ onPost }: FeedComposerProps) => {
    const {
        user,
        userInitials,
        firstName,
        isModalOpen,
        modalInitialMedia,
        modalKey,
        isListingModalOpen,
        photoInputRef,
        videoInputRef,
        openModal,
        closeModal,
        openListingModal,
        closeListingModal,
        handlePhotoClick,
        handleVideoClick,
        handleFilesSelected,
    } = useFeedComposerViewModel({ onPost });

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                {/* Hidden file inputs */}
                <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFilesSelected(e.target.files, "image")}
                />
                <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFilesSelected(e.target.files, "video")}
                />

                {/* Input row */}
                <div className="flex items-center gap-3">
                    <div className="shrink-0">
                        {user?.profilePhotoUrl ? (
                            <Image
                                src={user.profilePhotoUrl}
                                alt="Your avatar"
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-semibold text-white">
                                {userInitials}
                            </div>
                        )}
                    </div>

                    {/* Clicking this opens the modal */}
                    <button
                        type="button"
                        onClick={() => openModal([])}
                        className="flex-1 cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-sm text-gray-400 transition-colors hover:bg-gray-100"
                    >
                        {`What's on your mind, ${firstName}?`}
                    </button>
                </div>

                {/* Divider */}
                <div className="mt-3 border-t border-gray-100" />

                {/* Action row */}
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex gap-1">
                        <button
                            type="button"
                            onClick={handlePhotoClick}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            Photo
                        </button>

                        <button
                            type="button"
                            onClick={handleVideoClick}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                                <polygon points="23 7 16 12 23 17 23 7" />
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                            Video
                        </button>

                        <button
                            type="button"
                            onClick={openListingModal}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-brand)]">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            Listing
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => openModal([])}
                        className="cursor-pointer rounded-full bg-gray-100 px-5 py-1.5 text-sm font-semibold text-gray-400"
                    >
                        Post
                    </button>
                </div>
            </div>

            {/* Create Post Modal — mounts with a new key each open so state is fresh */}
            {isModalOpen && (
                <CreatePostModal
                    key={modalKey}
                    onClose={closeModal}
                    onPost={onPost}
                    initialMedia={modalInitialMedia}
                />
            )}

            {/* Create Listing Modal */}
            {isListingModalOpen && (
                <CreateListingModal onClose={closeListingModal} />
            )}
        </>
    );
};

export default FeedComposer;

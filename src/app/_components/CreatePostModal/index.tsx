"use client";

import Image from "next/image";
import { useCreatePostModalViewModel } from "./useViewModel";
import { MediaPreview } from "../FeedComposer/useViewModel";
import type { FeedPost } from "@/lib/types/feed";

interface CreatePostModalProps {
    onClose: () => void;
    onPost: (post: FeedPost) => void;
    initialMedia: MediaPreview[];
}

const CreatePostModal = ({ onClose, onPost, initialMedia }: CreatePostModalProps) => {
    const {
        media,
        caption,
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
    } = useCreatePostModalViewModel({ initialMedia, onClose, onPost });

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={handleClose}
        >
            {/* Modal card */}
            <div
                className="flex w-full max-w-2xl max-h-[85vh] flex-col rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Hidden inputs — inside stopPropagation div so file picker close doesn't bubble to backdrop */}
                <input
                    ref={addMoreRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleAddMoreFiles(e.target.files)}
                />
                <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleMediaFiles(e.target.files, "image")}
                />
                <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleMediaFiles(e.target.files, "video")}
                />

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 pb-4 pt-5">
                    <h2 className="text-base font-bold text-gray-800">Create Post</h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="cursor-pointer rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                    {/* Media section */}
                    {media.length > 0 && (
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-xs font-medium text-gray-500">{mediaLabel}</p>
                                <button
                                    type="button"
                                    onClick={handleAddMore}
                                    className="cursor-pointer text-xs font-semibold text-[var(--color-brand)] hover:underline"
                                >
                                    + Add more
                                </button>
                            </div>

                            {/* Thumbnail row */}
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {media.map((preview) => (
                                    <div
                                        key={preview.id}
                                        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100"
                                    >
                                        {preview.type === "image" ? (
                                            <Image
                                                src={preview.url}
                                                alt={preview.file.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                                                    <polygon points="23 7 16 12 23 17 23 7" />
                                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Remove */}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMedia(preview.id)}
                                            className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                                        >
                                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}

                                {/* Add more placeholder */}
                                <button
                                    type="button"
                                    onClick={handleAddMore}
                                    className="flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-400 transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Caption */}
                    <div>
                        {media.length > 0 && (
                            <p className="mb-1.5 text-xs font-medium text-gray-500">Caption</p>
                        )}
                        <textarea
                            ref={textareaRef}
                            autoFocus={media.length === 0}
                            placeholder="Write a caption..."
                            value={caption}
                            onChange={(e) => handleCaptionChange(e.target.value)}
                            rows={1}
                            className="w-full resize-none overflow-hidden rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[var(--color-brand)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)]"
                            style={{ minHeight: media.length > 0 ? "7rem" : "10rem" }}
                        />
                    </div>

                    {/* Tag chips */}
                    <div className="flex flex-wrap gap-2">
                        {[
                            { icon: "📍", label: "Add Location" },
                            { icon: "#", label: "Category" },
                            { icon: "👥", label: "Tag People" },
                        ].map(({ icon, label }) => (
                            <button
                                key={label}
                                type="button"
                                className="flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
                            >
                                <span>{icon}</span>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-6 py-4">
                    {/* Media action buttons row */}
                    <div className="mb-3 flex items-center gap-1">
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

                    </div>

                    {/* Bottom row: emoji/gif + Save Draft + Post to Feed */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                className="cursor-pointer rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="cursor-pointer rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                                    <line x1="7" y1="2" x2="7" y2="22" />
                                    <line x1="17" y1="2" x2="17" y2="22" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <line x1="2" y1="7" x2="7" y2="7" />
                                    <line x1="2" y1="17" x2="7" y2="17" />
                                    <line x1="17" y1="17" x2="22" y2="17" />
                                    <line x1="17" y1="7" x2="22" y2="7" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                className="cursor-pointer text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
                            >
                                Save Draft
                            </button>
                            <button
                                type="button"
                            onClick={handlePost}
                                disabled={!canPost || isPosting}
                                className={`rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors ${
                                    canPost && !isPosting
                                        ? "cursor-pointer bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)]"
                                        : "cursor-not-allowed bg-gray-200 text-gray-400"
                                }`}
                            >
                                {isPosting ? "Posting..." : "Post to Feed"}
                            </button>
                        </div>
                    </div>
                    {errorMessage && (
                        <p className="mt-3 text-sm text-red-500">{errorMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;

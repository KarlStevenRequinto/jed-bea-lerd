"use client";

import Link from "next/link";
import { useAuthGateModalViewModel } from "./useViewModel";

interface AuthGateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthGateModal = ({ isOpen, onClose }: AuthGateModalProps) => {
    useAuthGateModalViewModel({ isOpen, onClose });

    if (!isOpen) return null;

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(10, 30, 18, 0.55)" }}
            onClick={onClose}
        >
            {/* Blur layer */}
            <div className="absolute inset-0 backdrop-blur-sm" />

            {/* Modal card */}
            <div
                className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="cursor-pointer absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[var(--color-gray-500)] hover:bg-[var(--color-gray-100)] transition-colors text-xl leading-none"
                >
                    ×
                </button>

                {/* Lock icon */}
                <div className="flex justify-center mb-6">
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: "var(--color-brand-muted)" }}
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-brand-dark)"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                </div>

                {/* Headline */}
                <h2 className="text-center text-[1.5rem] font-bold text-[var(--color-gray-900)] mb-2">
                    Sign In to View Details
                </h2>
                <p className="text-center text-sm text-[var(--color-gray-500)] leading-relaxed mb-8">
                    Create a free account or sign in to access full listing details, contact sellers directly, and save your favorites.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col gap-3">
                    <Link
                        href="/login"
                        className="cursor-pointer w-full flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-sm text-white transition-colors"
                        style={{ background: "var(--color-brand-dark)" }}
                        onClick={onClose}
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/login?tab=register"
                        className="cursor-pointer w-full flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-sm border transition-colors hover:bg-[var(--color-brand-muted)]"
                        style={{
                            color: "var(--color-brand-dark)",
                            borderColor: "var(--color-brand-dark)",
                        }}
                        onClick={onClose}
                    >
                        Create Free Account
                    </Link>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[var(--color-gray-200)]" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-xs text-[var(--color-gray-500)]">
                            Browsing is always free
                        </span>
                    </div>
                </div>

                {/* Benefits list */}
                <ul className="space-y-2">
                    {[
                        "Full listing details & gallery",
                        "Direct contact with sellers",
                        "Save favorites & get price alerts",
                    ].map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2.5 text-sm text-[var(--color-gray-500)]">
                            <span
                                className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                                style={{ background: "var(--color-brand-muted)" }}
                            >
                                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                                    <path
                                        d="M2 6l3 3 5-5"
                                        stroke="var(--color-brand-dark)"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            {benefit}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AuthGateModal;

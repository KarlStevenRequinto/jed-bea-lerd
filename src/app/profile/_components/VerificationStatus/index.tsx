"use client";

import { useVerificationStatusViewModel } from "./useViewModel";

const VerificationStatus = () => {
    const { verificationData } = useVerificationStatusViewModel();

    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] p-5">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
                        stroke="var(--color-gray-600)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <h3 className="text-base font-semibold text-[var(--color-gray-900)]">
                    Verification Status
                </h3>
            </div>

            {/* Verified Badge */}
            {verificationData.isVerified && (
                <div className="mb-4">
                    <div className="bg-[var(--color-success)] text-white rounded-lg px-4 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 12L11 14L15 10M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Verified User</p>
                            <p className="text-xs opacity-90">Your identity is verified</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Verification Items */}
            <div>
                <p className="text-xs text-[var(--color-gray-500)] mb-3">
                    Verified badges show that:
                </p>
                <div className="space-y-2">
                    {verificationData.verificationItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                            {item.isVerified ? (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20 6L9 17L4 12"
                                        stroke="var(--color-gray-600)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="var(--color-gray-400)"
                                        strokeWidth="2"
                                    />
                                </svg>
                            )}
                            <span className="text-sm text-[var(--color-gray-700)]">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VerificationStatus;

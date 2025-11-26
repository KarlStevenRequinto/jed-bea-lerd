"use client";

import React from "react";
import { RefreshIconSvg, ShieldIconSvg } from "@/components/svg-icons";
import { useCaptchaViewModel } from "./useViewModel";

interface CaptchaProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    onCaptchaIdChange?: (captchaId: string) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ value, onChange, error, onCaptchaIdChange }) => {
    const { isLoading, canvasRef, handleRefresh } = useCaptchaViewModel(onCaptchaIdChange);

    return (
        <div className="space-y-1.5">
            <label className="inline-flex items-center gap-2 text-sm text-foreground">
                <ShieldIconSvg />
                <span>Verification Code *</span>
            </label>

            {/* CAPTCHA Display - Canvas based */}
            <div className="relative rounded-md border border-border bg-muted h-20 flex items-center justify-center overflow-hidden">
                {isLoading ? (
                    <div className="text-sm text-muted-foreground">Loading...</div>
                ) : (
                    <canvas ref={canvasRef} width={800} height={150} className="w-full h-full" style={{ imageRendering: "auto" }} />
                )}
            </div>

            {/* Input and Refresh */}
            <div className="flex items-center gap-2">
                <input
                    className="flex-1 rounded-md border border-border bg-primary-foreground px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter the code above"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={6}
                    required
                    aria-label="Enter CAPTCHA code"
                    aria-invalid={!!error}
                    aria-describedby={error ? "captcha-error" : undefined}
                />
                <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="flex items-center justify-center w-10 h-10 rounded-md border border-border bg-primary-foreground opacity-70 hover:opacity-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                    aria-label="Refresh CAPTCHA code"
                >
                    <RefreshIconSvg />
                </button>
            </div>

            {/* Fixed height container for error message to prevent layout shift */}
            <div className="min-h-[20px]">
                {error && (
                    <p id="captcha-error" className="text-xs text-red-600">
                        {error}
                    </p>
                )}
            </div>

            <p className="text-[12px] text-muted-foreground">Enter the code shown above to verify you&apos;re human</p>
        </div>
    );
};

export default Captcha;

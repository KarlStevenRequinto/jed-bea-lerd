import React from "react";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    percent: number;
    width: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, percent, width }) => {
    return (
        <div className="w-full max-w-3xl mx-auto pt-4 px-4 sm:px-6">
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-2 gap-2">
                <span className="truncate">
                    Step {currentStep} of {totalSteps}
                </span>
                <span className="whitespace-nowrap">{percent}% Complete</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                    className={`h-full ${width} transition-all duration-500 ease-in-out`}
                    style={{
                        background: "linear-gradient(90deg, var(--color-link) 0%, var(--color-success) 100%)",
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;

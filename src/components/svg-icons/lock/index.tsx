import React from "react";

interface LockIconSvgProps {
    color?: string;
    className?: string;
}

const LockIconSvg: React.FC<LockIconSvgProps> = ({ color = "currentColor", className }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect x="4" y="10" width="16" height="10" rx="2" stroke={color} strokeWidth="1.5" />
            <path
                d="M8 10V8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V10"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="12" cy="14" r="1.25" fill={color} />
        </svg>
    );
};

export default LockIconSvg;

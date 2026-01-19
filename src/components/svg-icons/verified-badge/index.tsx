import React from "react";

interface VerifiedBadgeIconSvgProps {
    size?: number;
}

const VerifiedBadgeIconSvg = ({ size = 20 }: VerifiedBadgeIconSvgProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="30" height="30" fill="url(#pattern0_554_449)" />
            <defs>
                <pattern id="pattern0_554_449" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_554_449" transform="scale(0.0104167)" />
                </pattern>
                <image
                    id="image0_554_449"
                    width="96"
                    height="96"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
};

export default VerifiedBadgeIconSvg;

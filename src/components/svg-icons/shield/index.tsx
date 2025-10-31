import React from "react";

interface ShieldIconSvgProps {
    width?: number;
    height?: number;
    className?: string;
}

const ShieldIconSvg: React.FC<ShieldIconSvgProps> = ({ width = 20, height = 20, className }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={className}
            style={{ minWidth: width, minHeight: height }}
        >
            <rect width="20" height="20" fill="url(#pattern0_76_145)" />
            <defs>
                <pattern id="pattern0_76_145" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_76_145" transform="scale(0.0104167)" />
                </pattern>
                <image
                    id="image0_76_145"
                    width="96"
                    height="96"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
};

export default ShieldIconSvg;

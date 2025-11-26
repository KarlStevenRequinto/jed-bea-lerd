import React from "react";

const HeartSvgIcon = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="15" height="15" fill="url(#pattern0_407_1781)" />
            <defs>
                <pattern id="pattern0_407_1781" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_407_1781" transform="scale(0.01)" />
                </pattern>
                <image
                    id="image0_407_1781"
                    width="100"
                    height="100"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
};

export default HeartSvgIcon;

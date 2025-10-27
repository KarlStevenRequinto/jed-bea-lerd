import React from "react";

const Protect = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="24" height="24" fill="url(#pattern0_211_358)" />
            <defs>
                <pattern id="pattern0_211_358" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_211_358" transform="scale(0.0104167)" />
                </pattern>
                <image
                    id="image0_211_358"
                    width="96"
                    height="96"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
};

export default Protect;

import React from "react";

interface BulletedListIconSvgProps {
    color?: "black" | "white";
    className?: string;
}

const BulletedListIconSvg: React.FC<BulletedListIconSvgProps> = ({ color = "black", className = "" }) => {
    // Unique ID to avoid conflicts when multiple instances render
    const uniqueId = React.useId();
    const patternId = `pattern-list-${uniqueId}`;
    const imageId = `image-list-${uniqueId}`;

    // CSS filter to convert black to white (invert the colors)
    const filterStyle = color === "white" ? { filter: "brightness(0) saturate(100%) invert(100%)" } : {};

    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={className}
            style={{ ...filterStyle, display: 'block' }}
        >
            <rect width="30" height="30" fill={`url(#${patternId})`} />
            <defs>
                <pattern id={patternId} patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref={`#${imageId}`} transform="scale(0.0104167)" />
                </pattern>
                <image
                    id={imageId}
                    width="96"
                    height="96"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABKElEQVR4nO3ZzUrDQBgF0Is7fTVbfCgRXPtDfZnaPpGKVbeRwmyTpm1wYnIO3OXkS2dCE7gJAAAAAAAAAAAwZzdJtkm+SjZJlrVvai7ukzQtuat9c3N48psDWXSsv0rynOSjx3WaieQ9yVOSyyEOYNtj4GvH+pcRbEhTKfvffrZdj0GfLWsvkvyMYCOaSvkue+AA8o8PYNNj0Lpj/Zz/glYZwLLHoOuO9fsX0WN5MTUzyVuSh6Fewimfmm3DbocaQrdF+drZlawPPPkAAAAAZ9AJV6QTrkgnnKOjE844ohNO3eiEM4ED0Ann5OiEUyc64SnSCQMAAAB/SCdckU64Ip1wjo5OOOOITjh1oxPOBA5AJ5yToxNOneiEp0gnDAAAAAAAAABA+vkFcsNOrUz22xYAAAAASUVORK5CYII="
                />
            </defs>
        </svg>
    );
};

export default BulletedListIconSvg;

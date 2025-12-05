import React from "react";

interface PriceTagSvgIconProps {
    color?: string;
    className?: string;
}

const PriceTagSvgIcon: React.FC<PriceTagSvgIconProps> = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="15" height="15" fill="url(#pattern0_407_1782)" />
            <defs>
                <pattern id="pattern0_407_1782" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_407_1782" transform="scale(0.01)" />
                </pattern>
                <image
                    id="image0_407_1782"
                    width="100"
                    height="100"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEE0lEQVR4nO3dy2oUQRTG8XahrpK4UNQHEDRBcG8Sb4kX0MS4MlEEXeg2IDLqSvfmIq7EheBbqKBvkI2XuFTJXklijEnkL+VUYCi6Z3pmeqZPVZ0PBgIpqk76R/WlMt2dJBqNRqPRaP4H2A88BN4DS8AK5WcVWAAeA3uTWALcsH+85PwELiehB5jGn/wNGgW/MLbzI8jdF+kYv4EHwDFgj4AaDwJ3gXWnzkdJJBjnE4EB7jm1LiSBY6wDFxOhAQ449S4nIQQPMbbjFp34HjzGCA4EzzGCAiH7AH62S+MPAHPAR3vxuWp/ngX6owIhHWOtGxjALuAZsEV2zO+eAjuDB6F8jLfkz5tGKF6DkI0x2qXxzcxoNvNBglA+xkDKbuoTMAb02M848NlpswkcCQqEkjFsDXMpGL0p7fqARaftTDAgCMCwdRiA2ozXaTvhtP0QBAjZGCMl1LLs1NFTp21v3iURb0AkYSSxg0jDMLEXffHtsiRimNgr8NqYs6m+JP2g/sVp+8Rt5wVIHYwzAmrrTzntXbSzodd+JlIwzGnvYe9AMjB+ScDYjl0OaTazDfqUB+IDholZBrHLIXnz2rulE18wHJR5uyvKyqY95vi1uFgH43QiPFSPKTPmDMp++W7F/vyk3lKJWBDfZkanIgJEMQSBKIYgEJ+PGcGBKIYgEMUQBKIYgkAUQxCIYggCUQxBIBkY5lt9JwsfLIB0FERnRnMBdncMpM7MOFHYIIHF3M2Vss12dHJmnCqk8kBjb22rzUoRnerMaDHAUWe7LXUKY7itjiMJUHG23buiMcw/aRQjR8yNqPZ+ltrcb7UzxWgjwLkUDLP99rXSmWIUj2Fyvchjhp5N5Yi5qSgDo9JKZ3oFLgjjTsZuaqidImMJ2RjTrZ4rbyhGWxhrhWDYDl+lYAy2WF9UoWgM26l5ClttxgqtOtAAo4Vj2I7XnQdtNfx6ZOyhUxi2829Op5OFVB1o6CSGHeCFL8+fCh7DDnIo5ZRNUcrAqBlsyh4/XJQLhQ/mYYCRrmHUDHozBeUPcCmJOMBwxqNoK90YXFGkYORAier6BAkYNcVEjYIkjNhRkIgRKwpVjBWRGLGh4ANGLCjAkDcYOVAyH9LiQ/ARI1QUfMYIDYUQMEJBISSMHCii3yRDiBi+ohAyhm8oxIDhCwowGA1GA5SNslGIEUMqCjFjSENBMXKhTHRp/EHFEIKCYshBQTHkoFDFcJ/frhhNolwpqH/FKAhlC7jaZr/HFaN4lMkW+1MMKSgohhwUFEMOCoohBwXFKBVlymmnGN0KcCsFxbwS4pp9Hep4xhV45+7PiD2kz5R60ZkhCKVSdq3RhOrtdWmPqdhebrlddo3RheqNqM+BrxbnO/CymRfLazQajUaTBJ5//JMGIQRnSboAAAAASUVORK5CYII="
                />
            </defs>
        </svg>
    );
};

export default PriceTagSvgIcon;

import React from "react";

interface GridIconSvgProps {
    color?: "white" | "black";
    className?: string;
}

const GridIconSvg: React.FC<GridIconSvgProps> = ({ color = "white", className = "" }) => {
    // CSS filter to convert white to black
    const filterStyle = color === "black" ? { filter: "brightness(0) saturate(100%)" } : {};

    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={className}
            style={filterStyle}
        >
            <rect width="30" height="30" fill="url(#pattern0_407_1905)" />
            <defs>
                <pattern id="pattern0_407_1905" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_407_1905" transform="scale(0.0104167)" />
                </pattern>
                <image
                    id="image0_407_1905"
                    width="96"
                    height="96"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACWklEQVR4nO2dTW4TQRgFDYuARAQskAiXwblIgCsEBFwqJByBDT8ngLBKLhAQcvaFWp6FBR5rUA/zYnfVAep9029sdzZfZjMRERERERERERkb4DZwa7arAA+BF8AZcA5csztcd890Cjwvzzq7KQB3gTfAT9rhB/AauJM+/CfAF9rlM3CQPPzL9AncAC4nL6F89Bp/8//k06RfR8Dbv0aQV1Pedjb94J4Ac+DeP3rXMsK81d7yLN0zlVtQH1fAg9p5hwxTrpp9HFd41zLCvKN6y5ve5wSe1c47ZIByz1/Hu0rvWkaYd3Tv/zqDoeHfe8KfNlTAvEd7XjvvkPBFT/h+QwXs92gXtfPu1EFtozcWjN5sMHqzwejNBqM3G4zebDB6s8HozQajNxuM3mwweuuCZYkFhLGAMBYQxgLCWECrBegdxxsLRm82GL3ZYPRmg9GbDUZvNhi92WD0ZoPRmw1GbzYYvdlg9GaD0ZsNRm82GL3ZYPTWBcsSCwhjAWEsIIwFhLGAVgvQO443FozebDB6s8HozQajNxuM3mwwerPB6M0GozcbjN5sMHoHB7uyDO73aH/VzluztG/eUAGHyaV9fctLTxsq4H2P9qR23iHhZX/+6Ot72ZICurX1fRzVzjt0dXHZn9/HWfcR3bXVxYcb3vzpVhcPeAta5XiSw19ZX1/+eYEs+QjsTVZAV8IBcNEN0DIXwONJD3+lhEfAB9r+xw0HkcNfKWGvW+lefoRa4Qp4OfnXzibKDaDszy8r3IFvG/5i3kYWwNfu2Y4mu+2IiIiIiIiIiMhsl/gNXfwy6+rv1bsAAAAASUVORK5CYII="
                />
            </defs>
        </svg>
    );
};

export default GridIconSvg;

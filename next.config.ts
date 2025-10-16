/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "source.unsplash.com" },
        ],
    },
    webpack: (config) => {
        const isIconsSvg = (file: string) => file.includes("src/assets/icons/") && file.endsWith(".svg");

        const rules = config.module.rules as any[];
        const svgRule = rules.find((rule: any) => typeof rule !== "string" && rule.test && rule.test.toString().includes("svg")) as any;
        if (svgRule) {
            if (Array.isArray(svgRule.exclude)) svgRule.exclude.push(isIconsSvg);
            else svgRule.exclude = [isIconsSvg];
        }

        rules.push({
            test: isIconsSvg,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        icon: true,
                        svgo: true,
                        svgoConfig: {
                            plugins: [
                                { name: "preset-default" },
                                { name: "removeDimensions", active: true },
                                { name: "removeViewBox", active: false },
                            ],
                        },
                    },
                },
            ],
        });
        return config;
    },
};

export default nextConfig;

"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add("theme-dark");
        } else {
            root.classList.remove("theme-dark");
        }
    }, [dark]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
            <button
                onClick={() => setDark((v) => !v)}
                className="rounded-md border border-border bg-primary-foreground text-foreground px-6 py-3 text-base font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                aria-pressed={dark}
            >
                {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
        </div>
    );
}

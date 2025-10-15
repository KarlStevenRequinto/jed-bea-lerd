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
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "var(--color-bg)", color: "var(--color-fg)" }}
    >
      <button
        onClick={() => setDark((v) => !v)}
        className="rounded-md border px-6 py-3 text-base font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          background: dark ? "#111" : "#fff",
          color: dark ? "#fff" : "#111",
          borderColor: dark ? "#333" : "#ddd",
        }}
        aria-pressed={dark}
      >
        {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

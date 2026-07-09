"use client";

import { useEffect, useState } from "react";
import SignOutButton from "./sign-out-button";

type Theme = "light" | "dark";

export default function DashboardShell({
  displayName,
}: {
  displayName?: string | null;
}) {
  const [theme, setTheme] = useState<Theme>("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("hendrickson-theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    }
    setHydrated(true);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    window.localStorage.setItem("hendrickson-theme", next);
  };

  const isDark = theme === "dark";

  // Avoid a light/dark flash on first paint before localStorage is read.
  if (!hydrated) {
    return <div className="min-h-screen bg-brand-gray" />;
  }

  return (
    <div className={isDark ? "min-h-screen bg-neutral-900" : "min-h-screen bg-brand-gray"}>
      <header className="relative z-10 flex items-center justify-between bg-brand-maroon px-6 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white p-1">
            <img
              src="/logo.png"
              alt="Hendrickson"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-lg font-bold text-white">Hendrickson</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white">{displayName}</span>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-black text-white transition hover:bg-[#B3B3B3]"
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
            )}
          </button>

          <SignOutButton />
        </div>
      </header>

      <main className="p-8">
        <h1
          className={
            isDark
              ? "text-2xl font-bold text-white"
              : "text-2xl font-bold text-black"
          }
        >
          Dashboard
        </h1>
        <p className={isDark ? "mt-1 text-white/60" : "mt-1 text-black/60"}>
          Welcome back, {displayName}
        </p>
      </main>
    </div>
  );
}

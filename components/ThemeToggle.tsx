"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const read = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, read, () => "dark");
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {
          // Storage can be blocked; the choice still applies for this visit.
        }
      }}
      className="btn btn-icon"
      title={`Switch to ${next} mode`}
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none">
        <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
      <span className="sr-only">Switch to {next} mode</span>
    </button>
  );
}

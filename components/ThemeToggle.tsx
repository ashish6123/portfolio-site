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
      className="border-rule text-ink hover:border-accent rounded-full border px-3 py-1.5 font-mono text-xs transition-colors"
      aria-label={`Switch to ${next} mode`}
    >
      {theme === "dark" ? "Morning light" : "Evening lamp"}
    </button>
  );
}

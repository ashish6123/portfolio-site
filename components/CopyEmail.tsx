"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard can be blocked; the address is still visible to select.
        }
      }}
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}

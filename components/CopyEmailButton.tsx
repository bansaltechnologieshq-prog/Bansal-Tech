"use client";

import { useEffect, useState } from "react";
import { buttonClass } from "@/components/Button";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.prompt("Copy this email address:", email);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={buttonClass("secondary", "w-full sm:w-auto sm:min-w-40")}
    >
      <span aria-live="polite">{copied ? "Email copied" : "Copy email"}</span>
    </button>
  );
}

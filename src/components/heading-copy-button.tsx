"use client";

import { Check, Link2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function HeadingCopyButton({
  headingId,
  headingLabel,
}: {
  headingId: string;
  headingLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  async function copyHeadingLink() {
    const url = new URL(window.location.href);
    url.hash = headingId;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url.toString());
      } else {
        const input = document.createElement("textarea");
        input.value = url.toString();
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }

      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.hash = headingId;
    }
  }

  return (
    <button
      type="button"
      className="lemma-heading-copy"
      aria-label={
        copied
          ? `Copied link to ${headingLabel}`
          : `Copy link to ${headingLabel}`
      }
      title={copied ? "Link copied" : "Copy section link"}
      onClick={copyHeadingLink}
    >
      {copied ? (
        <Check aria-hidden="true" className="h-4 w-4" />
      ) : (
        <Link2 aria-hidden="true" className="h-4 w-4" />
      )}
    </button>
  );
}

"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HelpSearchButton } from "@/components/help-search";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { appUrl } from "@/lib/site";

type MobileHelpItem = {
  id: string;
  title: string;
  url: string;
  active: boolean;
};

export function MobileHelpMenu({
  items,
}: {
  items: MobileHelpItem[];
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(true);

  const closeMenu = useCallback((restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = true;
    const previousOverflow = document.body.style.overflow;
    const background = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("footer"),
    ].filter((element): element is HTMLElement => Boolean(element));
    const backgroundInertState = background.map(
      (element) => [element, element.inert] as const,
    );

    document.body.style.overflow = "hidden";
    background.forEach((element) => {
      element.inert = true;
    });
    requestAnimationFrame(() => closeRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      backgroundInertState.forEach(([element, inert]) => {
        element.inert = inert;
      });
      if (restoreFocusRef.current) triggerRef.current?.focus();
    };
  }, [closeMenu, open]);

  return (
    <div className="ml-auto xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="flex min-h-11 items-center gap-2 rounded border border-[var(--border)] bg-white px-3 text-sm font-semibold text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-expanded={open}
        aria-controls="mobile-help-menu"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" className="h-4 w-4" />
        Menu
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 bg-[color:rgba(18,18,18,0.42)] p-3 backdrop-blur-[2px] sm:p-5"
              onPointerDown={(event) => {
                if (event.target === event.currentTarget) closeMenu();
              }}
            >
              <div
                ref={dialogRef}
                id="mobile-help-menu"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-help-menu-title"
                className="ml-auto flex max-h-[calc(100dvh-1.5rem)] w-[min(92vw,360px)] flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-[0_30px_90px_-30px_rgba(18,18,18,0.5)] sm:max-h-[calc(100dvh-2.5rem)]"
              >
                <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                      Speiros Help Center
                    </p>
                    <h2
                      id="mobile-help-menu-title"
                      className="mt-1 text-base font-semibold text-[var(--ink)]"
                    >
                      Browse help
                    </h2>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    aria-label="Close help menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    onClick={() => closeMenu()}
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>

                <div className="overflow-y-auto p-3">
                  <nav className="grid gap-1" aria-label="Primary help">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        aria-current={item.active ? "location" : undefined}
                        className={[
                          "rounded px-3 py-2.5 text-sm font-medium",
                          item.active
                            ? "bg-[var(--surface)] text-[var(--accent)]"
                            : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]",
                        ].join(" ")}
                        onClick={() => closeMenu(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-3 grid gap-2 border-t border-[var(--border)] pt-3">
                    <HelpSearchButton
                      compact
                      className="w-full"
                      onOpen={() => {
                        closeMenu(false);
                        triggerRef.current?.focus();
                      }}
                    />
                    <TrackedAnchor
                      href={appUrl}
                      event="docs_open_app_click"
                      eventProps={{
                        cta_id: "docs_mobile_open_app",
                        cta_text: "Open app",
                        location: "mobile_menu",
                      }}
                      className="inline-flex min-h-10 items-center justify-center rounded bg-[var(--accent)] px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                      onClick={() => closeMenu(false)}
                    >
                      Open app
                    </TrackedAnchor>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

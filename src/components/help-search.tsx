"use client";

import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchContext } from "fumadocs-ui/contexts/search";


const HELP_SEARCH_OPEN_EVENT = "lemma:help-search-open";

type SearchResult = {
  id: string;
  type: "page" | "heading" | "text";
  content: string;
  url: string;
  breadcrumbs?: string[];
};

type SearchGroup = {
  pageUrl: string;
  href: string;
  title: string;
  section?: string;
  snippets: string[];
};

function cleanSearchText(value: string) {
  return value
    .replace(/<\/?mark>/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function groupSearchResults(results: SearchResult[]) {
  const groups = new Map<string, SearchGroup>();

  for (const result of results) {
    const pageUrl = result.url.split("#")[0] || "/";
    const existing = groups.get(pageUrl);
    const fallbackTitle =
      result.breadcrumbs?.at(-1) ??
      cleanSearchText(result.content) ??
      "Help article";
    const group =
      existing ??
      ({
        pageUrl,
        href: pageUrl === "/" ? "/" : result.url,
        title: fallbackTitle,
        section: result.breadcrumbs?.at(-2),
        snippets: [],
      } satisfies SearchGroup);

    if (result.type === "page") {
      group.href = pageUrl;
      group.title = cleanSearchText(result.content);
      group.section = result.breadcrumbs?.at(-1);
    } else {
      const snippet = cleanSearchText(result.content);
      if (
        snippet &&
        snippet !== group.title &&
        !group.snippets.includes(snippet) &&
        group.snippets.length < 2
      ) {
        group.snippets.push(snippet);
      }
    }

    groups.set(pageUrl, group);
  }

  return Array.from(groups.values()).slice(0, 8);
}

export function HelpSearchButton({
  compact = false,
  className = "",
  onOpen,
}: {
  compact?: boolean;
  className?: string;
  onOpen?: () => void;
}) {
  function openSearch() {
    onOpen?.();
    window.dispatchEvent(new Event(HELP_SEARCH_OPEN_EVENT));
  }

  return (
    <button
      type="button"
      className={[
        "group inline-flex items-center border border-[var(--border)] bg-white text-left text-[var(--muted)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
        compact
          ? "min-h-10 rounded px-3 text-sm"
          : "min-h-14 w-full max-w-2xl rounded-lg px-4 text-base",
        className,
      ].join(" ")}
      onClick={openSearch}
      aria-label="Search Speiros help"
      aria-haspopup="dialog"
      aria-controls="lemma-help-search-dialog"
    >
      <Search
        aria-hidden="true"
        className={compact ? "mr-2 h-4 w-4" : "mr-3 h-5 w-5"}
      />
      <span className="min-w-0 flex-1 truncate">
        Search a task, problem, or “getting started”
      </span>
      {!compact ? (
        <span
          className="ml-3 hidden shrink-0 items-center gap-1 text-xs text-[var(--subtle)] sm:inline-flex"
          aria-hidden="true"
        >
          <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[11px]">
            ⌘/Ctrl
          </kbd>
          <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[11px]">
            K
          </kbd>
        </span>
      ) : null}
    </button>
  );
}

export function HelpSearchDialog() {
  const { setOpenSearch } = useSearchContext();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const groupedResults = useMemo(() => groupSearchResults(results), [results]);

  useEffect(() => {
    function openSearch() {
      setOpenSearch(false);
      openerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setOpen(true);
      setQuery("");
      setResults([]);
      setError(false);
      if (!dialogRef.current?.open) dialogRef.current?.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    }

    function handleShortcut(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        openSearch();
      }
    }

    window.addEventListener(HELP_SEARCH_OPEN_EVENT, openSearch);
    window.addEventListener("keydown", handleShortcut, { capture: true });

    return () => {
      window.removeEventListener(HELP_SEARCH_OPEN_EVENT, openSearch);
      window.removeEventListener("keydown", handleShortcut, { capture: true });
    };
  }, [setOpenSearch]);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!open || trimmedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      setError(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Search request failed");
        setResults((await response.json()) as SearchResult[]);
      } catch (requestError) {
        if ((requestError as Error).name !== "AbortError") {
          setResults([]);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 180);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [open, query]);

  function closeSearch() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      id="lemma-help-search-dialog"
      className="lemma-search-dialog"
      aria-labelledby="lemma-help-search-title"
      onClose={() => {
        setOpen(false);
        openerRef.current?.focus();
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeSearch();
      }}
    >
      <div className="flex max-h-[min(82dvh,720px)] flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 sm:px-5">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
              Speiros Help Center
            </p>
            <h2
              id="lemma-help-search-title"
              className="mt-1 text-base font-semibold text-[var(--ink)]"
            >
              Find the next step
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close help search"
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            onClick={closeSearch}
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-[var(--border)] p-4 sm:p-5">
          <label htmlFor="lemma-help-search-input" className="sr-only">
            Search Speiros help
          </label>
          <div className="flex min-h-12 items-center rounded-lg border border-[var(--border)] bg-white px-3 focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent-soft)]">
            <Search
              aria-hidden="true"
              className="mr-3 h-5 w-5 shrink-0 text-[var(--muted)]"
            />
            <input
              ref={inputRef}
              id="lemma-help-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “getting started”, “connect LinkedIn”, or “reply”"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-3 text-base text-[var(--ink)] outline-none placeholder:text-[var(--subtle)]"
            />
          </div>
        </div>

        <div className="min-h-48 overflow-y-auto p-3 sm:p-4">
          <div className="sr-only" aria-live="polite">
            {loading
              ? "Searching"
              : query.trim().length < 2
                ? "Enter at least two characters"
                : `${groupedResults.length} help ${
                    groupedResults.length === 1 ? "article" : "articles"
                  } found`}
          </div>

          {query.trim().length < 2 ? (
            <div className="px-2 py-8 text-center">
              <p className="text-sm font-semibold text-[var(--ink)]">
                Search by the job or state you see.
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Results are grouped by guide, so each article is one keyboard
                stop.
              </p>
            </div>
          ) : loading ? (
            <div className="px-2 py-8 text-center text-sm text-[var(--muted)]">
              Searching the Help Center…
            </div>
          ) : error ? (
            <div className="px-2 py-8 text-center">
              <p className="text-sm font-semibold text-[var(--ink)]">
                Search is temporarily unavailable.
              </p>
              <a
                href="/help/support"
                className="mt-3 inline-flex text-sm font-semibold text-[var(--accent)] underline underline-offset-4"
              >
                Contact support
              </a>
            </div>
          ) : groupedResults.length > 0 ? (
            <ul className="grid gap-2">
              {groupedResults.map((result) => (
                <li key={result.pageUrl}>
                  <Link
                    href={result.href}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-lg border border-transparent px-3 py-3 transition hover:border-[var(--border)] hover:bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    onClick={closeSearch}
                  >
                    <span className="min-w-0">
                      {result.section ? (
                        <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]">
                          {result.section}
                        </span>
                      ) : null}
                      <span className="mt-1 block text-sm font-semibold leading-5 text-[var(--ink)]">
                        {result.title}
                      </span>
                      {result.snippets[0] ? (
                        <span className="mt-1.5 line-clamp-2 block text-sm leading-5 text-[var(--muted)]">
                          {result.snippets[0]}
                        </span>
                      ) : null}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-[var(--subtle)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)] motion-reduce:group-hover:translate-x-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-2 py-8 text-center">
              <p className="text-sm font-semibold text-[var(--ink)]">
                No guide matches “{query.trim()}”.
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Start with the beginner path or browse recovery guidance.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Link
                  href="/start/overview"
                  className="inline-flex min-h-10 items-center rounded bg-[var(--accent)] px-3 text-sm font-semibold text-white"
                  onClick={closeSearch}
                >
                  Start with Speiros
                </Link>
                <Link
                  href="/help"
                  className="inline-flex min-h-10 items-center rounded border border-[var(--border)] bg-white px-3 text-sm font-semibold text-[var(--ink)]"
                  onClick={closeSearch}
                >
                  Troubleshoot
                </Link>
              </div>
              <a
                href="/help/support"
                className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)] underline underline-offset-4"
              >
                Report missing guidance
              </a>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}

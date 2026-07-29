import Link from "next/link";
import {
  HelpFooter,
  HelpHeader,
  getHelpCollections,
  type HelpArticle,
} from "@/components/help-center";
import { HelpSearchButton } from "@/components/help-search";
import { source } from "@/lib/source";

function getArticles(): HelpArticle[] {
  return source
    .getPages()
    .filter((page) => page.url !== "/")
    .map((page) => ({
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      slugs: page.slugs,
    }));
}

export default function NotFound() {
  const collections = getHelpCollections(getArticles());

  return (
    <>
      <HelpHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex min-h-[62vh] max-w-3xl flex-col items-start justify-center px-5 py-20 sm:px-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          Page not found
        </p>
        <h1 className="mt-4 font-display text-5xl font-[720] tracking-[-0.04em] text-[var(--ink)]">
          We could not find that guide.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
          The address may be mistyped, or the guide may have moved. Search for
          the task you were trying to complete, or return to Lemma 101.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <HelpSearchButton compact />
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded bg-[var(--accent)] px-4 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
          >
            Go to Help Center
          </Link>
          <Link
            href="/start/lemma-101"
            className="inline-flex min-h-11 items-center rounded border border-[var(--border)] bg-white px-4 text-sm font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
          >
            Start Lemma 101
          </Link>
        </div>
        <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
          {collections.slice(0, 3).map((collection) => (
            <Link
              key={collection.slug}
              href={collection.url}
              className="rounded-lg border border-[var(--border)] bg-white p-4 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {collection.title}
            </Link>
          ))}
        </div>
      </main>
      <HelpFooter />
    </>
  );
}

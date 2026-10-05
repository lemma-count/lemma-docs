import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Compass,
  MessageSquareWarning,
  RadioTower,
  Send,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import type { TableOfContents } from "fumadocs-core/toc";
import {
  HelpSearchButton,
  HelpSearchDialog,
} from "@/components/help-search";
import { MobileHelpMenu } from "@/components/mobile-help-menu";
import { TrackedAnchor } from "@/components/tracked-anchor";
import { appUrl } from "@/lib/site";
import startMeta from "../../content/docs/start/meta.json";
import recruitingMeta from "../../content/docs/recruiting/meta.json";
import candidatesMeta from "../../content/docs/candidates/meta.json";
import workMeta from "../../content/docs/work/meta.json";
import settingsMeta from "../../content/docs/settings/meta.json";
import helpMeta from "../../content/docs/help/meta.json";

export type HelpArticle = {
  title: string;
  description?: string;
  url: string;
  slugs: string[];
};

export type HelpCollection = {
  slug: string;
  title: string;
  label: string;
  description: string;
  intent: string;
  url: string;
  icon: LucideIcon;
  articles: HelpArticle[];
};

type PrimaryHelpItem = {
  id: string;
  title: string;
  url: string;
};

const primaryHelpNav: PrimaryHelpItem[] = [
  { id: "new", title: "New to Speiros", url: "/start" },
  { id: "tasks", title: "Do a task", url: "/#tasks" },
  { id: "settings", title: "Connect and configure", url: "/settings" },
  { id: "help", title: "Troubleshoot", url: "/help" },
];

function isPrimaryHelpItemActive(item: PrimaryHelpItem, activeUrl?: string) {
  if (!activeUrl) return false;
  if (item.id === "new") return activeUrl.startsWith("/start");
  if (item.id === "settings") return activeUrl.startsWith("/settings");
  if (item.id === "help") return activeUrl.startsWith("/help");
  return false;
}

const collectionConfigs = [
  {
    slug: "start", title: "Start here", label: "Start",
    description: "Find your way around Speiros and follow your first recruiting workflow.",
    intent: "First steps", icon: Compass, pages: startMeta.pages,
  },
  {
    slug: "recruiting", title: "Prepare a recruitment", label: "Recruiting",
    description: "Give Speiros company context, define the role, and review what it learns.",
    intent: "Context and roles", icon: BookOpen, pages: recruitingMeta.pages,
  },
  {
    slug: "candidates", title: "Find and select candidates", label: "Candidates",
    description: "Shape a search, inspect profiles, import people, and confirm your selection.",
    intent: "Find the right people", icon: UsersRound, pages: candidatesMeta.pages,
  },
  {
    slug: "work", title: "Supervise the work", label: "Work",
    description: "Review drafts, authorize outreach, follow sending, and respond to candidates.",
    intent: "Decisions and conversations", icon: Send, pages: workMeta.pages,
  },
  {
    slug: "settings", title: "Connect and configure", label: "Settings",
    description: "Set up accounts, calendars, tools, workspace access, and billing.",
    intent: "Accounts and tools", icon: RadioTower, pages: settingsMeta.pages,
  },
  {
    slug: "help", title: "Resolve a problem", label: "Help",
    description: "Understand states and evidence, recover blocked work, and get support.",
    intent: "Understand and recover", icon: ShieldCheck, pages: helpMeta.pages,
  },
] as const;

export function getHelpCollections(pages: HelpArticle[]): HelpCollection[] {
  return collectionConfigs.map((config) => {
    const { pages: authoredPages, ...collection } = config;
    const articleOrder = new Map(
      authoredPages.map((page, index) => [page, index]),
    );

    return {
      ...collection,
      url: `/${config.slug}`,
      articles: pages
        .filter((page) => page.slugs[0] === config.slug)
        .sort((a, b) => {
          const aSlug = a.slugs.slice(1).join("/") || "index";
          const bSlug = b.slugs.slice(1).join("/") || "index";
          return (
            (articleOrder.get(aSlug) ?? Number.MAX_SAFE_INTEGER) -
            (articleOrder.get(bSlug) ?? Number.MAX_SAFE_INTEGER)
          );
        }),
    };
  });
}

export function getCollectionForUrl(
  collections: HelpCollection[],
  url: string,
) {
  const slug = url.split("/").filter(Boolean)[0];
  return collections.find((collection) => collection.slug === slug);
}

export function getPopularArticles(pages: HelpArticle[]) {
  const preferredUrls = [
    "/start/first-recruitment",
    "/recruiting/create-role",
    "/candidates/search",
    "/candidates/confirm-selection",
    "/work/approve-sequence",
    "/work/replies",
  ];

  return preferredUrls
    .map((url) => pages.find((page) => page.url === url))
    .filter((page): page is HelpArticle => Boolean(page));
}

export function HelpHeader({
  activeUrl,
}: {
  activeUrl?: string;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-50 -translate-y-24 rounded bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-white transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:rgba(252,252,252,0.96)] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-4 px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 text-[var(--ink)]"
            aria-label="Speiros Help Center"
          >
            <img src="/speiros-mark.svg" alt="" className="h-8 w-8 shrink-0" />
            <span className="text-xl font-semibold tracking-tight">Speiros</span>
            <span className="hidden border-l border-[var(--border)] pl-3 text-sm font-medium text-[var(--muted)] sm:inline">
              Help Center
            </span>
          </Link>

          <nav
            aria-label="Primary help"
            className="ml-2 hidden min-w-0 flex-1 items-center gap-0.5 xl:flex"
          >
            {primaryHelpNav.map((item) => {
              const isActive = isPrimaryHelpItemActive(item, activeUrl);
              return (
              <Link
                key={item.id}
                href={item.url}
                aria-current={isActive ? "location" : undefined}
                className={[
                  "whitespace-nowrap rounded px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-[var(--surface)] text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]",
                ].join(" ")}
              >
                {item.title}
              </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden shrink-0 items-center gap-3 lg:flex">
            <HelpSearchButton compact />
            <TrackedAnchor
              href={appUrl}
              event="docs_open_app_click"
              eventProps={{
                cta_id: "docs_header_open_app",
                cta_text: "Open app",
                location: "header",
              }}
              className="inline-flex min-h-10 items-center rounded bg-[var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Open app
            </TrackedAnchor>
          </div>

          <MobileHelpMenu
            items={primaryHelpNav.map((item) => ({
              ...item,
              active: isPrimaryHelpItemActive(item, activeUrl),
            }))}
          />
        </div>
      </header>
      <HelpSearchDialog />
    </>
  );
}

export function HelpFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--ink)] text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-7 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <img src="/speiros-mark.svg" alt="" className="h-8 w-8" />
            <span className="text-xl font-semibold tracking-tight">Speiros</span>
            <span className="border-l border-white/20 pl-3 text-sm font-medium text-white/72">
              Help Center
            </span>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/68">
            Practical guidance for recruiting with clear context, reviewable work,
            and human supervision.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/72">
          <TrackedAnchor
            className="transition hover:text-white"
            href="https://speiros.com"
            event="docs_footer_product_click"
            eventProps={{
              cta_id: "docs_footer_product",
              cta_text: "Product",
              location: "footer",
            }}
          >
            Product
          </TrackedAnchor>
          <TrackedAnchor
            className="transition hover:text-white"
            href={appUrl}
            event="docs_footer_app_click"
            eventProps={{
              cta_id: "docs_footer_app",
              cta_text: "Open app",
              location: "footer",
            }}
          >
            Open app
          </TrackedAnchor>
          <Link className="transition hover:text-white" href="/help">
            Help and support
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function HelpHome({
  collections,
  popularArticles,
}: {
  collections: HelpCollection[];
  popularArticles: HelpArticle[];
}) {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="border-b border-[var(--border)] bg-[var(--paper)]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] lg:min-h-[610px] lg:grid-cols-[minmax(0,0.95fr)_minmax(460px,0.82fr)]">
          <div className="flex min-w-0 flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
              <span className="h-2 w-2 bg-[var(--accent)]" aria-hidden />
              Guidance / Recruiting with Speiros
            </p>
            <h1 className="mt-6 max-w-[760px] font-display text-[3.15rem] font-[720] leading-[0.92] tracking-[-0.05em] text-[var(--ink)] sm:text-[4.6rem]">
              One clear next step for your recruiting work.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--body)] sm:text-lg sm:leading-8">
              Build your role context, find and select candidates, then supervise
              the conversations that move your recruitment forward.
            </p>
            <div className="mt-8 max-w-2xl">
              <HelpSearchButton />
            </div>

            <div className="mt-8 grid max-w-2xl gap-5 border-t border-[var(--border)] pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                  New to Speiros
                </div>
                <h2 className="mt-2 text-lg font-semibold text-[var(--ink)]">
                  Start with your first recruitment
                </h2>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                  Follow the path from your company context and open role
                  to reviewed outreach and visible results.
                </p>
              </div>
              <Link
                href="/start/first-recruitment"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-[var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                Start recruiting with Speiros
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[390px] min-w-0 overflow-hidden border-t border-[var(--border)] lg:min-h-[610px] lg:border-l lg:border-t-0">
            <Image
              src="/brand/visuals/lemma-horizon-threshold.webp"
              alt="Two precise blue architectural thresholds frame a small orange signal on a white horizon."
              fill
              priority
              sizes="(min-width: 1400px) 630px, (min-width: 1024px) 46vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover object-[54%_56%]"
            />
            <div className="absolute bottom-0 left-0 border-r border-t border-[var(--border)] bg-[color:rgba(252,252,252,0.94)] px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)] backdrop-blur-sm">
              Return / Next decision visible
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Choose a path
          </p>
          <h2 className="mt-3 font-display text-3xl font-[700] tracking-[-0.035em] text-[var(--ink)] sm:text-4xl">
            Start from what you need now.
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--muted)]">
            You do not need to know which product area contains the answer.
          </p>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <IntentCard
            href="/start/first-recruitment"
            icon={Compass}
            label="New to Speiros"
            title="Follow the beginner path"
          >
            Prepare a role, find candidates, review a sequence, and check what happened.
          </IntentCard>
          <IntentCard
            href="/#tasks"
            icon={CheckCircle2}
            label="Do a task"
            title="Get something done"
          >
            Jump to a role, search, candidate selection, approval, or recovery guide.
          </IntentCard>
          <IntentCard
            href="/help"
            icon={MessageSquareWarning}
            label="Something is wrong"
            title="Troubleshoot a problem"
          >
            Diagnose blocked work from the state or symptom you can see.
          </IntentCard>
          <IntentCard
            href="/help"
            icon={BookOpen}
            label="Look something up"
            title="Understand states and evidence"
          >
            Check what is prepared, authorized, scheduled, confirmed, or waiting for you.
          </IntentCard>
        </div>
      </section>

      <section
        id="tasks"
        className="scroll-mt-24 border-y border-[var(--border)] bg-[var(--surface)]"
      >
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Get something done
          </p>
          <h2 className="mt-3 font-display text-3xl font-[700] tracking-[-0.035em] text-[var(--ink)] sm:text-4xl">
            Start with the job in front of you.
          </h2>
        </div>
        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {popularArticles.map((article, index) => (
            <ArticleListLink
              key={article.url}
              article={article}
              index={index + 1}
            />
          ))}
        </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              Browse product areas
            </p>
            <h2 className="mt-3 font-display text-3xl font-[700] tracking-[-0.035em] text-[var(--ink)] sm:text-4xl">
              Go deeper once you know the area.
            </h2>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">
              Use these collections when you already know which part of the
              workflow you need.
            </p>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((collection) => (
                <CollectionCard key={collection.slug} collection={collection} />
              ))}
          </div>
        </div>
      </section>

    </main>
  );
}

export function HelpArticleShell({
  page,
  collection,
  toc,
  children,
}: {
  page: HelpArticle;
  collection?: HelpCollection;
  toc: TableOfContents;
  children: ReactNode;
}) {
  const collectionArticles =
    collection?.articles.filter((article) => article.url !== collection.url) ??
    [];
  const collectionNavItems = collection
    ? [
        {
          title: "Overview",
          description: collection.description,
          url: collection.url,
          slugs: [collection.slug],
        },
        ...collectionArticles,
      ]
    : [];
  const currentIndex = collectionNavItems.findIndex(
    (article) => article.url === page.url,
  );
  const collectionPrevious =
    currentIndex > 0 ? collectionNavItems[currentIndex - 1] : null;
  const collectionNext =
    currentIndex >= 0 && currentIndex < collectionNavItems.length - 1
      ? collectionNavItems[currentIndex + 1]
      : null;
  const previous = collectionPrevious;
  const next = collectionNext;
  const tocItems = toc.filter((item) => item.depth <= 3);
  const isCollectionIndex = collection?.url === page.url;
  const CollectionIcon = collection?.icon;

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="bg-white outline-none"
    >
      <div className="mx-auto grid max-w-[1240px] justify-center gap-9 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,760px)_300px] lg:px-10 lg:py-12">
        <div className="min-w-0">
          <nav
            className="mb-6 flex min-w-0 items-center gap-2 text-sm text-[var(--muted)]"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="shrink-0 hover:text-[var(--ink)]">
              Help Center
            </Link>
            {collection ? (
              <>
                <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                {isCollectionIndex ? (
                  <span
                    aria-current="page"
                    className="truncate font-medium text-[var(--ink)]"
                  >
                    {collection.title}
                  </span>
                ) : (
                  <>
                    <Link
                      href={collection.url}
                      className="shrink-0 hover:text-[var(--ink)]"
                    >
                      {collection.title}
                    </Link>
                    <ChevronRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0"
                    />
                    <span
                      aria-current="page"
                      className="truncate font-medium text-[var(--ink)]"
                    >
                      {page.title}
                    </span>
                  </>
                )}
              </>
            ) : null}
          </nav>

          <div className="border-b border-[var(--border)] pb-8">
            {collection && CollectionIcon ? (
              <div className="mb-4 inline-flex items-center gap-2 rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                <CollectionIcon aria-hidden="true" className="h-4 w-4" />
                {collection.intent}
              </div>
            ) : null}
            <h1 className="max-w-[720px] font-sans text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.025em] text-[var(--ink)] sm:text-[2.85rem]">
              {page.title}
            </h1>
            {page.description ? (
              <p className="mt-4 max-w-[700px] text-lg leading-8 text-[var(--muted)]">
                {page.description}
              </p>
            ) : null}

          </div>

          {collection && collectionNavItems.length > 1 ? (
            <details className="group/collection my-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 lg:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] [&::-webkit-details-marker]:hidden">
                <span>In this collection</span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-open/collection:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <nav className="mt-3 grid gap-1" aria-label={collection.title}>
                {collectionNavItems.map((article) => {
                  const isActive = article.url === page.url;
                  return (
                    <Link
                      key={article.url}
                      href={article.url}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "rounded px-3 py-2 text-sm leading-5",
                        isActive
                          ? "bg-white font-semibold text-[var(--accent)]"
                          : "text-[var(--muted)] hover:bg-white hover:text-[var(--ink)]",
                      ].join(" ")}
                    >
                      {article.title}
                    </Link>
                  );
                })}
              </nav>
            </details>
          ) : null}

          {tocItems.length > 2 ? (
            <details className="group/toc mb-6 rounded-lg border border-[var(--border)] bg-white p-4 lg:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] [&::-webkit-details-marker]:hidden">
                <span>On this page</span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-open/toc:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <nav className="mt-3 grid gap-1" aria-label="Table of contents">
                {tocItems.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    className={[
                      "rounded px-3 py-2 text-sm leading-5 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]",
                      item.depth === 3 ? "ml-3" : "",
                    ].join(" ")}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </details>
          ) : null}

          <article className="lemma-article py-8">{children}</article>

          {(previous || next) && (
            <nav
              aria-label="Article pagination"
              className="grid gap-3 border-t border-[var(--border)] pt-7 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={previous.url}
                  className="group rounded-lg border border-[var(--border)] bg-white p-4 transition hover:border-[var(--accent)]"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                    <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                    Previous
                  </span>
                  <span className="mt-2 block text-sm font-semibold leading-5 text-[var(--ink)]">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              {next ? (
                <Link
                  href={next.url}
                  className="group rounded-lg border border-[var(--border)] bg-white p-4 text-left transition hover:border-[var(--accent)] sm:text-right"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)] sm:justify-end">
                    Next
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="mt-2 block text-sm font-semibold leading-5 text-[var(--ink)]">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          )}

        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7rem)] space-y-5 overflow-y-auto overscroll-contain pr-1">
            <HelpSearchButton compact className="w-full" />
            {collection && collectionNavItems.length > 0 ? (
              <div className="rounded-lg border border-[var(--border)] bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--subtle)]">
                  In this collection
                </div>
                <nav className="mt-3 space-y-1" aria-label={collection.title}>
                  {collectionNavItems.map((article) => {
                    const isActive = article.url === page.url;
                    return (
                      <Link
                        key={article.url}
                        href={article.url}
                        aria-current={isActive ? "page" : undefined}
                        className={[
                          "block rounded px-3 py-2 text-sm leading-5 transition",
                          isActive
                            ? "bg-[var(--surface)] font-semibold text-[var(--accent)]"
                            : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]",
                        ].join(" ")}
                      >
                        {article.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ) : null}
            {tocItems.length > 0 ? (
              <div className="rounded-lg border border-[var(--border)] bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--subtle)]">
                  On this page
                </div>
                <nav className="mt-3 space-y-2" aria-label="Table of contents">
                  {tocItems.map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        className={[
                          "block text-sm leading-5 text-[var(--muted)] hover:text-[var(--accent)]",
                          item.depth === 3 ? "pl-3" : "",
                        ].join(" ")}
                      >
                        {item.title}
                      </a>
                    ))}
                </nav>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </main>
  );
}

function CollectionCard({ collection }: { collection: HelpCollection }) {
  const Icon = collection.icon;
  return (
    <Link
      href={collection.url}
      className="group flex min-h-48 flex-col rounded-lg border border-[var(--border)] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_-36px_rgba(18,18,18,0.28)] motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-[var(--surface)] text-[var(--accent)]">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 text-[var(--subtle)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)] motion-reduce:group-hover:translate-x-0"
        />
      </div>
      <div className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--subtle)]">
        {collection.intent}
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-6 text-[var(--ink)]">
        {collection.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted)]">
        {collection.description}
      </p>
    </Link>
  );
}

function IntentCard({
  href,
  icon: Icon,
  label,
  title,
  children,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-52 flex-col rounded-lg border border-[var(--border)] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_-36px_rgba(18,18,18,0.28)] motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 text-[var(--subtle)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)] motion-reduce:group-hover:translate-x-0"
        />
      </div>
      <div className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
        {label}
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-6 text-[var(--ink)]">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted)]">
        {children}
      </p>
    </Link>
  );
}

function ArticleListLink({
  article,
  index,
}: {
  article: HelpArticle;
  index: number;
}) {
  return (
    <Link
      href={article.url}
      className="group grid min-h-36 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 rounded-lg border border-[var(--border)] bg-white p-5 transition hover:border-[var(--accent)] hover:shadow-[0_20px_50px_-38px_rgba(18,18,18,0.26)]"
    >
      <span className="font-mono text-xs font-semibold text-[var(--accent)]">
        {String(index).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold leading-5 text-[var(--ink)]">
          {article.title}
        </span>
        {article.description ? (
          <span className="mt-2 block text-sm leading-5 text-[var(--muted)]">
            {article.description}
          </span>
        ) : null}
      </span>
      <ArrowRight
        aria-hidden="true"
        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--subtle)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)] motion-reduce:group-hover:translate-x-0"
      />
    </Link>
  );
}

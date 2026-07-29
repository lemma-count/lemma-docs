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
  MessageSquareReply,
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
import senderMeta from "../../content/docs/sender/meta.json";
import leadsMeta from "../../content/docs/leads/meta.json";
import missionsMeta from "../../content/docs/missions/meta.json";
import outboxMeta from "../../content/docs/outbox/meta.json";
import referenceMeta from "../../content/docs/reference/meta.json";

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
  { id: "new", title: "New to Lemma", url: "/start" },
  { id: "tasks", title: "Do a task", url: "/#tasks" },
  {
    id: "troubleshoot",
    title: "Troubleshoot",
    url: "/reference/troubleshooting",
  },
  { id: "reference", title: "Reference", url: "/reference" },
];

function isPrimaryHelpItemActive(item: PrimaryHelpItem, activeUrl?: string) {
  if (!activeUrl) return false;
  if (item.id === "new") return activeUrl.startsWith("/start");
  if (item.id === "troubleshoot") {
    return activeUrl === "/reference/troubleshooting";
  }
  if (item.id === "reference") {
    return (
      activeUrl.startsWith("/reference") &&
      activeUrl !== "/reference/troubleshooting"
    );
  }
  return false;
}

const collectionConfigs = [
  {
    slug: "start",
    title: "Start here",
    label: "Start",
    description:
      "Understand Lemma, connect a LinkedIn Sender, and reach your first reviewable work.",
    intent: "First setup",
    icon: Compass,
    pages: startMeta.pages,
  },
  {
    slug: "sender",
    title: "Sender",
    label: "Sender",
    description:
      "Connect, schedule, pause, resume, or recover the LinkedIn account Lemma can use.",
    intent: "Channel readiness",
    icon: RadioTower,
    pages: senderMeta.pages,
  },
  {
    slug: "leads",
    title: "Leads",
    label: "Leads",
    description:
      "Bring in the right people from LinkedIn or a spreadsheet and keep them organized.",
    intent: "Audience",
    icon: UsersRound,
    pages: leadsMeta.pages,
  },
  {
    slug: "missions",
    title: "Missions",
    label: "Missions",
    description:
      "Turn an outbound outcome into a bounded plan, research, and reviewable Sequence.",
    intent: "Plan the work",
    icon: Send,
    pages: missionsMeta.pages,
  },
  {
    slug: "outbox",
    title: "Outbox",
    label: "Outbox",
    description:
      "Review and validate Lemma-authored Sequences, act on Manual work, handle replies, and resolve problems.",
    intent: "Review and run",
    icon: MessageSquareReply,
    pages: outboxMeta.pages,
  },
  {
    slug: "reference",
    title: "Reference",
    label: "Reference",
    description:
      "Check execution truth, safety boundaries, product terms, and recovery guidance.",
    intent: "Truth and recovery",
    icon: ShieldCheck,
    pages: referenceMeta.pages,
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
    "/start/quickstart",
    "/sender/connect-and-activate",
    "/leads/import-from-linkedin",
    "/missions/create-lemma-led",
    "/outbox/review-sequences",
    "/outbox/resolve-problems",
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
            aria-label="Lemma Help Center"
          >
            <img
              src="/brand/logo/lemma-lockup-horizontal-ink.svg"
              alt="Lemma"
              className="h-[25px] w-auto shrink-0"
            />
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
            <img
              src="/brand/logo/lemma-lockup-horizontal-paper.svg"
              alt="Lemma"
              className="h-[25px] w-auto"
            />
            <span className="border-l border-white/20 pl-3 text-sm font-medium text-white/72">
              Help Center
            </span>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/68">
            Practical guidance for researched, reviewable, operator-controlled
            outbound.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/72">
          <TrackedAnchor
            className="transition hover:text-white"
            href="https://heylemma.com"
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
          <Link className="transition hover:text-white" href="/reference">
            Reference
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
              Guidance / LinkedIn outbound
            </p>
            <h1 className="mt-6 max-w-[760px] font-display text-[3.15rem] font-[720] leading-[0.92] tracking-[-0.05em] text-[var(--ink)] sm:text-[4.6rem]">
              One clear next step for every outbound job.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--body)] sm:text-lg sm:leading-8">
              New to Lemma? Follow one guided path from the five core concepts
              to your first reviewed Sequence and verified outcome.
            </p>
            <div className="mt-8 max-w-2xl">
              <HelpSearchButton />
            </div>

            <div className="mt-8 grid max-w-2xl gap-5 border-t border-[var(--border)] pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                  New to Lemma
                </div>
                <h2 className="mt-2 text-lg font-semibold text-[var(--ink)]">
                  Start with Lemma 101
                </h2>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                  Learn the map first, then follow the setup path that matches
                  your current setup.
                </p>
              </div>
              <Link
                href="/start/lemma-101"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-[var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                Start Lemma 101
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
            href="/start/lemma-101"
            icon={Compass}
            label="New to Lemma"
            title="Follow the beginner path"
          >
            Learn the map, set up, review one Sequence, and verify what happened.
          </IntentCard>
          <IntentCard
            href="/#tasks"
            icon={CheckCircle2}
            label="Do a task"
            title="Get something done"
          >
            Jump directly to a setup, import, Mission, review, or recovery guide.
          </IntentCard>
          <IntentCard
            href="/reference/troubleshooting"
            icon={MessageSquareWarning}
            label="Something is wrong"
            title="Troubleshoot a problem"
          >
            Diagnose blocked work from the state or symptom you can see.
          </IntentCard>
          <IntentCard
            href="/reference"
            icon={BookOpen}
            label="Look something up"
            title="Open the reference"
          >
            Check product terms, execution truth, safety, time, and account rules.
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
            {collections
              .filter(({ slug }) =>
                ["sender", "leads", "missions", "outbox"].includes(slug),
              )
              .map((collection) => (
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
  const journeyPagination: Record<
    string,
    {
      previous: { title: string; url: string } | null;
      next: { title: string; url: string } | null;
    }
  > = {
    "/start": {
      previous: null,
      next: { title: "Lemma 101", url: "/start/lemma-101" },
    },
    "/start/lemma-101": {
      previous: { title: "Start here", url: "/start" },
      next: { title: "Choose your setup path", url: "/start#choose-your-path" },
    },
    "/start/onboarding": {
      previous: {
        title: "Choose your setup path",
        url: "/start#choose-your-path",
      },
      next: {
        title: "Review your first Sequence",
        url: "/start/review-first-sequence",
      },
    },
    "/start/quickstart": {
      previous: {
        title: "Choose your setup path",
        url: "/start#choose-your-path",
      },
      next: {
        title: "Review your first Sequence",
        url: "/start/review-first-sequence",
      },
    },
    "/start/review-first-sequence": {
      previous: {
        title: "Choose your setup path",
        url: "/start#choose-your-path",
      },
      next: {
        title: "Verify the first outcome",
        url: "/start/verify-first-outcome",
      },
    },
    "/start/verify-first-outcome": {
      previous: {
        title: "Review your first Sequence",
        url: "/start/review-first-sequence",
      },
      next: { title: "Understand Home", url: "/start/home" },
    },
    "/start/home": {
      previous: {
        title: "Verify the first outcome",
        url: "/start/verify-first-outcome",
      },
      next: null,
    },
  };
  const journey = journeyPagination[page.url];
  const previous = journey ? journey.previous : collectionPrevious;
  const next = journey ? journey.next : collectionNext;
  const beginnerProgress: Record<
    string,
    { current: number; label: string }
  > = {
    "/start/lemma-101": { current: 1, label: "Learn the map" },
    "/start/onboarding": { current: 2, label: "Complete first-time setup" },
    "/start/quickstart": { current: 2, label: "Prepare your current setup" },
    "/start/review-first-sequence": {
      current: 3,
      label: "Review the first Sequence",
    },
    "/start/verify-first-outcome": {
      current: 4,
      label: "Verify what happened",
    },
  };
  const progress = beginnerProgress[page.url];
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
            {progress ? (
              <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-semibold text-[var(--ink)]">
                    Lemma 101 · Step {progress.current} of 4
                  </span>
                  <span className="text-right text-[var(--muted)]">
                    {progress.label}
                  </span>
                </div>
                <div
                  className="mt-3 grid grid-cols-4 gap-1.5"
                  aria-label={`Step ${progress.current} of 4`}
                >
                  {[1, 2, 3, 4].map((step) => (
                    <span
                      key={step}
                      aria-hidden="true"
                      className={[
                        "h-1.5 rounded-full",
                        step <= progress.current
                          ? "bg-[var(--accent)]"
                          : "bg-[var(--border)]",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>
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

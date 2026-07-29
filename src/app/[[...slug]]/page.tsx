import { getMDXComponents } from "@/components/mdx";
import {
  HelpArticleShell,
  HelpFooter,
  HelpHeader,
  HelpHome,
  getCollectionForUrl,
  getHelpCollections,
  getPopularArticles,
  type HelpArticle,
} from "@/components/help-center";
import { source } from "@/lib/source";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { siteName } from "@/lib/site";

const retiredRouteRedirects: Record<string, string> = {
  "/create": "/missions/create-lemma-led",
  "/missions/cockpit-and-controls": "/missions/mission-controls",
  "/start/how-studies-work": "/start/core-concepts",
  "/start/navigate-lemma": "/start/core-concepts",
};

function getRetiredDestination(slugs?: string[]) {
  if (!slugs || slugs.length === 0) return null;
  return retiredRouteRedirects[`/${slugs.join("/")}`] ?? null;
}

function getHelpArticles(): HelpArticle[] {
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

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  const retiredDestination = getRetiredDestination(params.slug);
  if (!page && retiredDestination) permanentRedirect(retiredDestination);
  if (!page) notFound();

  const articles = getHelpArticles();
  const collections = getHelpCollections(articles);
  const collection = getCollectionForUrl(collections, page.url);

  if (page.url === "/") {
    return (
      <>
        <HelpHeader activeUrl="/" />
        <HelpHome
          collections={collections}
          popularArticles={getPopularArticles(articles)}
        />
        <HelpFooter />
      </>
    );
  }

  const MDX = page.data.body;
  const article = {
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    slugs: page.slugs,
  };

  return (
    <>
      <HelpHeader activeUrl={page.url} />
      <HelpArticleShell
        page={article}
        collection={collection}
        toc={page.data.toc}
      >
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </HelpArticleShell>
      <HelpFooter />
    </>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  const retiredDestination = getRetiredDestination(params.slug);
  if (!page && retiredDestination) {
    return {
      title: {
        absolute: siteName,
      },
      description:
        "Practical guidance for researched, reviewable, operator-controlled outbound with Lemma.",
      alternates: {
        canonical: retiredDestination,
      },
    };
  }
  if (!page) notFound();

  return {
    title:
      page.url === "/"
        ? {
            absolute: siteName,
          }
        : page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
    },
    openGraph: {
      type: page.url === "/" ? "website" : "article",
      title: page.url === "/" ? siteName : page.data.title,
      description: page.data.description,
      url: page.url,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Lemma Help Center — One clear next step for every outbound job.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.url === "/" ? siteName : page.data.title,
      description: page.data.description,
      images: ["/og.png"],
    },
  };
}

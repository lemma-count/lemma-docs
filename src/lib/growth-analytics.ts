"use client";

import type { CaptureResult, Properties } from "posthog-js";
import { siteUrl } from "@/lib/site";

const POSTHOG_PROJECT_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const PUBLIC_SITE_HOSTNAME = new URL(siteUrl).hostname;

type PostHogClient = typeof import("posthog-js").default;

let posthogClient: PostHogClient | null = null;
let posthogLoader: Promise<PostHogClient | null> | null = null;
let posthogInitialization: Promise<boolean> | null = null;

declare global {
  interface Window {
    __growthPostHogInitialized?: boolean;
  }
}

type GrowthPropertyValue = string | number | boolean;
type GrowthProperties = Record<string, GrowthPropertyValue>;

function cleanProperties(
  properties: Record<string, GrowthPropertyValue | null | undefined>,
): GrowthProperties {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== null && value !== undefined),
  ) as GrowthProperties;
}

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname || "/";
}

function getDocsSection(pathname: string) {
  return pathname.split("/").filter(Boolean)[0] ?? "home";
}

function getPageType(pathname: string) {
  if (pathname === "/") return "docs_home";

  const parts = pathname.split("/").filter(Boolean);
  const section = parts[0] ?? "unknown";
  const depth = parts.length > 1 ? "article" : "section_home";

  return `docs_${section}_${depth}`;
}

function getEnvironment(hostname: string) {
  if (hostname === "localhost" || hostname === "127.0.0.1") return "development";
  if (hostname === PUBLIC_SITE_HOSTNAME) return "production";
  if (hostname.endsWith(".vercel.app")) return "preview";

  return "production";
}

function isInternalTraffic(url: URL) {
  const hostname = url.hostname;

  return (
    url.searchParams.get("growth_internal") === "1" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  );
}

export function getGrowthAnalyticsProperties(): GrowthProperties {
  if (typeof window === "undefined") {
    return {
      growth_os_version: "posthog-web-v1",
      venture_id: "lemma",
      site_id: "lemma-docs",
      traffic_surface: "docs_site",
      page_type: "unknown",
      docs_section: "unknown",
      is_internal: true,
      environment: "server",
    };
  }

  const url = new URL(window.location.href);
  const pathname = normalizePath(url.pathname);
  const contentId = pathname === "/" ? "home" : pathname.slice(1).replaceAll("/", ":");

  return cleanProperties({
    growth_os_version: "posthog-web-v1",
    venture_id: "lemma",
    site_id: "lemma-docs",
    traffic_surface: "docs_site",
    page_type: getPageType(pathname),
    docs_section: getDocsSection(pathname),
    source_asset_id: `lemma-docs:${contentId}`,
    content_id: contentId,
    is_internal: isInternalTraffic(url),
    environment: getEnvironment(url.hostname),
    utm_source: url.searchParams.get("utm_source"),
    utm_medium: url.searchParams.get("utm_medium"),
    utm_campaign: url.searchParams.get("utm_campaign"),
    utm_term: url.searchParams.get("utm_term"),
    utm_content: url.searchParams.get("utm_content"),
  });
}

function enrichEvent(event: CaptureResult | null) {
  if (!event) return event;

  return {
    ...event,
    properties: {
      ...getGrowthAnalyticsProperties(),
      ...event.properties,
    } satisfies Properties,
  };
}

async function loadPostHog() {
  if (!POSTHOG_PROJECT_TOKEN || typeof window === "undefined") return null;
  if (posthogClient) return posthogClient;

  posthogLoader ??= import("posthog-js").then((module) => {
    posthogClient = module.default;
    return posthogClient;
  });

  return posthogLoader;
}

export function initGrowthAnalytics(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.__growthPostHogInitialized) return Promise.resolve(true);
  if (!POSTHOG_PROJECT_TOKEN) return Promise.resolve(false);

  posthogInitialization ??= (async () => {
    const posthog = await loadPostHog();
    if (!posthog) return false;

    if (!window.__growthPostHogInitialized) {
      posthog.init(POSTHOG_PROJECT_TOKEN, {
        api_host: POSTHOG_HOST,
        defaults: "2026-01-30",
        capture_pageview: false,
        autocapture: false,
        disable_session_recording: true,
        request_batching: false,
        before_send: enrichEvent,
      });
      posthog.register(getGrowthAnalyticsProperties());
      window.__growthPostHogInitialized = true;
    }

    return true;
  })();

  return posthogInitialization;
}

export function refreshGrowthAnalyticsProperties() {
  if (
    typeof window === "undefined" ||
    !window.__growthPostHogInitialized ||
    !posthogClient
  ) {
    return;
  }

  posthogClient.register(getGrowthAnalyticsProperties());
}

export function trackGrowthPageview() {
  if (
    typeof window === "undefined" ||
    !window.__growthPostHogInitialized ||
    !posthogClient
  ) {
    return;
  }

  posthogClient.capture("$pageview", getGrowthAnalyticsProperties());
}

export async function trackGrowthCta(
  ctaEvent: string,
  properties: Record<string, GrowthPropertyValue | null | undefined> = {},
) {
  if (!(await initGrowthAnalytics()) || !posthogClient) return;

  posthogClient.capture("growth_cta_clicked", {
    ...getGrowthAnalyticsProperties(),
    ...cleanProperties({
      cta_event: ctaEvent,
      ...properties,
    }),
  });
}

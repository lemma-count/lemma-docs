const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.heylemma.com";

export const siteUrl = configuredSiteUrl.replace(/\/+$/, "");

export const siteName = "Speiros Help Center";

export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.speiros.com";

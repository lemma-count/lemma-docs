const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.heylemma.com";

export const siteUrl = configuredSiteUrl.replace(/\/+$/, "");

export const siteName = "Lemma Help Center";

export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.heylemma.com";

export const supportEmail =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@heylemma.com";

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: new URL(page.url, siteUrl).toString(),
    changeFrequency: page.url === "/" ? "weekly" : "monthly",
    priority: page.url === "/" ? 1 : page.slugs.length === 1 ? 0.8 : 0.7,
  }));
}

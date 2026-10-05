import { source } from "@/lib/source";
import { siteUrl } from "@/lib/site";
import redirects from "../../legacy-redirects.json";
import { createDocumentationService } from "./documentation-core";

// A derived in-memory index of the same compiled collection used by rendered
// pages. No copied Markdown corpus or independently maintained agent knowledge.
let service: Promise<ReturnType<typeof createDocumentationService>> | undefined;
export function getDocumentationService() {
  service ??= Promise.all(source.getPages().map(async (page) => ({
    path: page.url,
    title: page.data.title,
    description: page.data.description,
    markdown: await page.data.getText("processed"),
  }))).then((pages) => createDocumentationService(pages, siteUrl, redirects)).catch((error) => {
    service = undefined;
    throw error;
  });
  return service;
}

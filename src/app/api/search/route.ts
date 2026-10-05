import { getDocumentationService } from "@/lib/documentation";
import { DocumentationError } from "@/lib/documentation-core";

const sections: Record<string, string> = {
  start: "Start here", recruiting: "Prepare a recruitment", candidates: "Find and select candidates",
  work: "Supervise the work", settings: "Connect and configure", help: "Resolve a problem",
};
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = params.get("query")?.trim();
  if (!query) return Response.json([]);
  try {
    const requestedLimit = params.has("limit") ? Number(params.get("limit")) : 8;
    const limit = Number.isInteger(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 10) : 8;
    const { results } = (await getDocumentationService()).search(query, limit);
    return Response.json(results.flatMap((result) => [
      { id: result.path, type: "page", content: result.title, url: result.path, breadcrumbs: [sections[result.path.split("/")[1]] ?? "Speiros Help Center"] },
      { id: `${result.path}:excerpt`, type: "text", content: result.excerpt, url: result.path },
    ]));
  } catch (error) {
    if (error instanceof DocumentationError) return Response.json({ error: error.code }, { status: error.status });
    console.error("documentation_search_failed", error);
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}

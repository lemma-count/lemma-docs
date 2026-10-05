import { getDocumentationService } from "@/lib/documentation";
import { DocumentationError, DOCUMENTATION_VERSION } from "@/lib/documentation-core";

export const runtime = "nodejs";
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  try {
    const service = await getDocumentationService();
    const action = params.get("action");
    const result = action === "search"
      ? service.search(params.get("query") ?? "", params.has("limit") ? Number(params.get("limit")) : 5)
      : action === "read"
        ? service.read(params.get("path") ?? "")
        : (() => { throw new DocumentationError("invalid_request", "Choose action search or read.", 400); })();
    return Response.json(result, { headers: { "Cache-Control": "public, max-age=60, s-maxage=300", "ETag": `"${result.revision}"` } });
  } catch (error) {
    if (error instanceof DocumentationError) {
      return Response.json({ version: DOCUMENTATION_VERSION, error: { code: error.code, message: error.message } }, { status: error.status });
    }
    console.error("documentation_read_failed", error);
    return Response.json({ version: DOCUMENTATION_VERSION, error: { code: "unavailable", message: "Documentation is temporarily unavailable." } }, { status: 503 });
  }
}

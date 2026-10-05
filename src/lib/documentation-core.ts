import { createHash } from "node:crypto";

export const DOCUMENTATION_VERSION = "v1" as const;
export const MAX_QUERY_LENGTH = 300;
export const MAX_MARKDOWN_LENGTH = 32_000;
export const MAX_RESULTS = 10;

export type DocumentationPage = {
  path: string;
  title: string;
  description?: string;
  markdown: string;
};
export type DocumentationResult = {
  path: string;
  url: string;
  title: string;
  description: string;
  excerpt: string;
};
export class DocumentationError extends Error {
  readonly code: "invalid_request" | "not_found";
  readonly status: number;
  constructor(code: "invalid_request" | "not_found", message: string, status: number) {
    super(message);
    this.name = "DocumentationError";
    this.code = code;
    this.status = status;
  }
}

export function validDocumentationPath(path: string): boolean {
  return path.length <= 256 && (path === "/" || /^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(path));
}

// Word-level translation and inflection, not a routing table: every page competes
// on the same title, description, headings and content evidence.
const synonyms: Record<string, string> = {
  fermer: "close", ferme: "close", closed: "close", closing: "close",
  ouvrir: "open", ouverture: "open", ouvert: "open",
  creer: "create", creation: "create", created: "create", creating: "create",
  importer: "import", importation: "import", imported: "import",
  candidat: "candidate", candidats: "candidate", candidate: "candidate", candidates: "candidate",
  emploi: "job", emplois: "job", poste: "role", postes: "role", roles: "role",
  contexte: "context", entreprise: "company", entreprises: "company",
  recherche: "search", rechercher: "search", chercher: "search", sourcing: "search",
  selection: "select", selectionner: "select", selected: "select",
  approuver: "approve", approval: "approve", approved: "approve", validation: "approve", validate: "approve",
  reponse: "reply", reponses: "reply", repondre: "reply", replies: "reply",
  calendrier: "calendar", fuseau: "timezone", horaires: "schedule",
  connexion: "connect", connection: "connect", connecter: "connect", connecte: "connect", connectee: "connect", connected: "connect",
  erreur: "error", erreurs: "error", echec: "failure", failed: "failure",
  tableur: "spreadsheet", csv: "spreadsheet", xlsx: "spreadsheet",
  debutant: "beginner", demarrer: "start", commencer: "start",
};
const stopwords = new Set("a an the to of in for with and or is are i my how can do does should what when why you your le la les de du des un une en et ou je mon ma mes comment puis peux est pour avec quel quelle au aux on it this that me please speiros".split(" "));
function words(text: string): string[] {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().match(/[a-z0-9]+/g) ?? [];
}
function token(word: string): string {
  if (synonyms[word]) return synonyms[word];
  return word.length > 4 && word.endsWith("s") ? word.slice(0, -1) : word;
}
function tokens(text: string): string[] {
  return words(text).filter((word) => !stopwords.has(word)).map(token);
}
function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/<[^>]+>/g, " ").replace(/[*`#_]/g, "").replace(/\s+/g, " ").trim();
}
function digest(value: string): string { return createHash("sha256").update(value).digest("hex"); }
function count(tokensInField: string[], word: string): number { return tokensInField.filter((entry) => entry === word).length; }

export function createDocumentationService(pages: DocumentationPage[], origin: string, redirects: Record<string, string> = {}) {
  const canonicalOrigin = new URL(origin).origin;
  const documents = pages.map((page) => ({
    ...page,
    description: page.description ?? "",
    revision: digest(JSON.stringify([page.path, page.title, page.description ?? "", page.markdown])),
    titleTokens: tokens(page.title),
    descriptionTokens: tokens(page.description ?? ""),
    headingTokens: tokens((page.markdown.match(/^#{1,6}\s+.*$/gm) ?? []).join(" ")),
    bodyTokens: tokens(plain(page.markdown)),
  }));
  const revision = digest(documents.map((page) => `${page.path}:${page.revision}`).sort().join("\n"));
  function resolve(path: string) {
    if (!validDocumentationPath(path)) throw new DocumentationError("invalid_request", "Use a documentation page path.", 400);
    const canonicalPath = redirects[path] ?? path;
    const page = documents.find((entry) => entry.path === canonicalPath);
    if (!page) throw new DocumentationError("not_found", "This documentation page does not exist.", 404);
    return page;
  }
  return {
    search(query: string, limit = 5) {
      query = query.trim();
      if (!query || query.length > MAX_QUERY_LENGTH || !Number.isInteger(limit) || limit < 1 || limit > MAX_RESULTS) {
        throw new DocumentationError("invalid_request", "Use a question of 1–300 characters and a limit of 1–10.", 400);
      }
      const terms = [...new Set(tokens(query))];
      const scored = documents.map((page) => {
        let matched = 0;
        let score = 0;
        for (const term of terms) {
          const title = count(page.titleTokens, term);
          const description = count(page.descriptionTokens, term);
          const heading = count(page.headingTokens, term);
          const body = count(page.bodyTokens, term);
          if (title || description || heading || body) matched++;
          score += (title ? 12 : 0) + (description ? 6 : 0) + (heading ? 8 : 0) + Math.min(body, 3);
        }
        // Coverage beats a prolific mention of just one query word. Index pages
        // remain useful, but concrete guides win when both explain the question.
        score *= terms.length ? (matched / terms.length) ** 3 : 0;
        if (page.path === "/" || page.path.split("/").length === 2) score *= 0.75;
        const blocks = page.markdown.split(/\n\s*\n/).map(plain).filter(Boolean);
        const excerpt = blocks.map((content) => ({ content, matches: terms.filter((term) => tokens(content).includes(term)).length }))
          .sort((a, b) => b.matches - a.matches)[0]?.content ?? page.description;
        return { page, score, excerpt: excerpt.slice(0, 500) };
      }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score || a.page.path.localeCompare(b.page.path));
      const results: DocumentationResult[] = scored.slice(0, limit).map(({ page, excerpt }) => ({
        path: page.path, url: new URL(page.path, canonicalOrigin).href, title: page.title, description: page.description, excerpt,
      }));
      return { version: DOCUMENTATION_VERSION, revision, query, results };
    },
    read(path: string) {
      const page = resolve(path);
      return {
        version: DOCUMENTATION_VERSION, revision: page.revision, path: page.path,
        url: new URL(page.path, canonicalOrigin).href, title: page.title, description: page.description,
        markdown: page.markdown.slice(0, MAX_MARKDOWN_LENGTH), truncated: page.markdown.length > MAX_MARKDOWN_LENGTH,
      };
    },
  };
}

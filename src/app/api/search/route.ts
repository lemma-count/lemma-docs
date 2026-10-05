import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

const search = createFromSource(source, {
  async buildIndex(page) {
    const structuredData = page.data.structuredData;

    if (page.url === "/") {
      return {
        id: page.url,
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        structuredData: {
          headings: [],
          contents: [
            {
              heading: undefined,
              content:
                "Speiros recruiting help for roles, company context, candidate search, selection, missions, sequence approval, replies, Sender accounts, calendars, integrations, and troubleshooting.",
            },
          ],
        },
      };
    }

    return {
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData,
    };
  },
  search: {
    limit: 32,
  },
});

const sequenceReviewPattern =
  /\b(validate|validation|batch|edit|editing|reschedule|prioriti[sz]e|add|remove|delete)\b.*\b(sequence|touch|message)\b|\b(sequence|touch|message)\b.*\b(validate|validation|edit|reschedule|prioriti[sz]e|add|remove|delete)\b/i;

const queryExpansions: Array<[RegExp, string]> = [
  [
    /\b(getting started|how (?:do|can) i start|beginner|new to speiros|commencer|d[eé]marrer|d[eé]butant)\b/i,
    "Speiros beginner start first setup recruitment",
  ],
  [
    /\b(first|premi[eè]re?)\b.*\b(mission|recruitment|recruiting|outreach)\b|\b(mission|recruitment|recruiting|outreach)\b.*\b(first|premi[eè]re?)\b/i,
    "first recruitment role candidates mission",
  ],
  [/\b(error|errors|broken|failure|failed)\b/i, "troubleshooting problem recovery"],
  [/\b(csv|spreadsheet|xlsx)\b/i, "spreadsheet import candidates file"],
  [
    /\b(sales navigator|recruiter|linkedin search|search url)\b/i,
    "LinkedIn search candidates products",
  ],
  [/\b(connect|connection)\b.*\b(linkedin|sender)\b/i, "Sender settings"],
  [/\b(pause|reconnect|replace)\b.*\bsender\b/i, "Sender settings"],
  [/\b(reply|replies|response)\b/i, "Work candidate replies Needs you"],
  [/\b(status|statuses|state|states)\b/i, "Sending plan sequence status evidence"],
  [sequenceReviewPattern, "review approve Sequence drafts"],
  [/\b(time ?zone|Europe\/Paris|browser local|send date)\b/i, "timezones display Sender calendar Sending plan"],
  [/\b(rate limit|rate-limited|cooldown)\b/i, "LinkedIn import paused"],
];

const curatedDestinations: Array<[RegExp, string]> = [
  [/\b(role|job description|hiring brief)\b/i, "/recruiting/create-role"],
  [/\b(company context|recruiting context|knowledge|publish)\b/i, "/recruiting/review-context"],
  [/\b(select|selection|cohort|confirm audience)\b/i, "/candidates/confirm-selection"],
  [/\b(calendar|interview availability)\b/i, "/settings/calendar"],
  [/\b(do not contact|dnc|opt.?out)\b/i, "/help/do-not-contact"],
  [
    /\b(getting started|how (?:do|can) i start|beginner|new to speiros|commencer|d[eé]marrer|d[eé]butant)\b/i,
    "/start/overview",
  ],
  [
    /\b(first|premi[eè]re?)\b.*\b(mission|recruitment|recruiting|outreach)\b|\b(mission|recruitment|recruiting|outreach)\b.*\b(first|premi[eè]re?)\b/i,
    "/start/first-recruitment",
  ],
  [/\b(connect|connection)\b.*\b(linkedin|sender)\b/i, "/settings/connect-linkedin"],
  [/\b(pause|reconnect|replace)\b.*\bsender\b/i, "/settings/recover-sender"],
  [/\b(error|errors|broken|failure|failed|troubleshoot)\b/i, "/help"],
  [/\b(csv|spreadsheet|xlsx)\b/i, "/candidates/import-spreadsheet"],
  [
    /\b(sales navigator|recruiter|linkedin search|search url)\b/i,
    "/candidates/linkedin-products",
  ],
  [/\b(reply|replies|response)\b/i, "/work/replies"],
  [/\b(status|statuses|state|states)\b/i, "/help/statuses"],
  [sequenceReviewPattern, "/work/approve-sequence"],
  [/\b(time ?zone|Europe\/Paris|browser local|send date)\b/i, "/help/timezones"],
  [/\b(rate limit|rate-limited|cooldown)\b/i, "/help/search-import"],
  [/\b(onboarding|first setup)\b/i, "/start/onboarding"],
];

function expandQuery(query: string) {
  const expansions = queryExpansions
    .filter(([pattern]) => pattern.test(query))
    .map(([, terms]) => terms);

  return [query, ...expansions].join(" ");
}

function getCuratedDestination(query: string) {
  return curatedDestinations.find(([pattern]) => pattern.test(query))?.[1];
}

function pageUrl(url: string) {
  return url.split("#", 1)[0];
}

function getCuratedResult(destination: string) {
  const page = source.getPages().find((candidate) => candidate.url === destination);
  if (!page) return null;

  return {
    id: page.url,
    type: "page" as const,
    content: page.data.title,
    url: page.url,
    breadcrumbs: [
      {
        start: "Start here",
        recruiting: "Prepare a recruitment",
        candidates: "Find and select candidates",
        work: "Supervise the work",
        settings: "Connect and configure",
        help: "Resolve a problem",
      }[page.slugs[0] ?? ""] ?? "Speiros Help Center",
    ],
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query")?.trim();

  if (!query) return Response.json([]);

  const rawLimit = url.searchParams.get("limit");
  const requestedLimit = rawLimit === null ? null : Number(rawLimit);
  const limit = requestedLimit !== null && Number.isInteger(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 32)
    : 24;
  const results = await search.search(expandQuery(query), { limit });
  const curatedDestination = getCuratedDestination(query);

  if (!curatedDestination) return Response.json(results);

  const curatedResult = getCuratedResult(curatedDestination);
  if (!curatedResult) return Response.json(results);

  return Response.json([
    curatedResult,
    ...results.filter((result) => pageUrl(result.url) !== curatedDestination),
  ].slice(0, limit));
}

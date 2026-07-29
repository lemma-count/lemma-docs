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
                "Lemma outbound help for Sender setup, Leads, Lists, Missions, Sequences, Outbox replies, problems, settings, and troubleshooting.",
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
    /\b(getting started|how (?:do|can) i start|beginner|new to lemma|commencer|d[eé]marrer|d[eé]butant)\b/i,
    "Lemma 101 beginner start first setup",
  ],
  [
    /\b(first|premi[eè]re?)\b.*\b(mission|campaign|outreach)\b|\b(mission|campaign|outreach)\b.*\b(first|premi[eè]re?)\b/i,
    "prepare first Mission quickstart",
  ],
  [/\b(error|errors|broken|failure|failed)\b/i, "troubleshooting problem recovery"],
  [/\b(csv|spreadsheet|xlsx)\b/i, "spreadsheet import leads file"],
  [
    /\b(sales navigator|recruiter|linkedin search|search url)\b/i,
    "LinkedIn import leads",
  ],
  [/\b(connect|connection)\b.*\b(linkedin|sender)\b/i, "Sender settings"],
  [/\b(pause|reconnect|replace)\b.*\bsender\b/i, "Sender settings"],
  [/\b(reply|replies|response)\b/i, "Outbox handle replies"],
  [/\b(status|statuses|state|states)\b/i, "Outbox sequence status"],
  [sequenceReviewPattern, "Outbox review Lemma-authored Sequence"],
  [/\b(time ?zone|Europe\/Paris|browser local|send date)\b/i, "time display Outbox Sender"],
  [/\b(rate limit|rate-limited|cooldown)\b/i, "LinkedIn import paused"],
];

const curatedDestinations: Array<[RegExp, string]> = [
  [
    /\b(getting started|how (?:do|can) i start|beginner|new to lemma|commencer|d[eé]marrer|d[eé]butant)\b/i,
    "/start/lemma-101",
  ],
  [
    /\b(first|premi[eè]re?)\b.*\b(mission|campaign|outreach)\b|\b(mission|campaign|outreach)\b.*\b(first|premi[eè]re?)\b/i,
    "/start/quickstart",
  ],
  [/\b(connect|connection)\b.*\b(linkedin|sender)\b/i, "/sender/connect-and-activate"],
  [/\b(pause|reconnect|replace)\b.*\bsender\b/i, "/sender/pause-reconnect-replace"],
  [/\b(error|errors|broken|failure|failed|troubleshoot)\b/i, "/reference/troubleshooting"],
  [/\b(csv|spreadsheet|xlsx)\b/i, "/leads/import-spreadsheet"],
  [
    /\b(sales navigator|recruiter|linkedin search|search url)\b/i,
    "/leads/import-from-linkedin",
  ],
  [/\b(reply|replies|response)\b/i, "/outbox/handle-replies"],
  [/\b(status|statuses|state|states)\b/i, "/outbox/understand-statuses"],
  [sequenceReviewPattern, "/outbox/review-sequences"],
  [/\b(time ?zone|Europe\/Paris|browser local|send date)\b/i, "/reference/timezones"],
  [/\b(rate limit|rate-limited|cooldown)\b/i, "/leads/import-from-linkedin"],
  [/\b(onboarding|first setup|five screens)\b/i, "/start/onboarding"],
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
        sender: "Sender",
        leads: "Leads",
        missions: "Missions",
        outbox: "Outbox",
        reference: "Reference",
      }[page.slugs[0] ?? ""] ?? "Lemma Help Center",
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

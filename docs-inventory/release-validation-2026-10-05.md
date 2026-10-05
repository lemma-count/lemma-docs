# Speiros Help Center implementation validation

Date: 2026-10-05. Documentation base: `1b74f59f6f74ad9a7b754cd82cf2650c4047cc9b`. Product evidence includes fresh web `origin/main` at `bd159965ea5b5560e9ca8f3f3a98e2ee304538bb`.

## Implemented

52 canonical pages in six collections, current Speiros identity and metadata, task shortcuts, search destinations, mobile navigation, and 42 centrally maintained permanent redirects. Old screenshot embeds were removed. The existing reading layout, typography, home illustration, breadcrumbs, table of contents, and contextual article progression were retained.

## Passed

- `npm run check`: TypeScript and documentation integrity (52 pages/routes, 42 redirects).
- `npm run build`: production compilation and static generation.
- Local production HTTP crawl: all 52 pages return 200; all 42 old URLs return 308 to the configured destination; sitemap, robots and Open Graph image return 200; unknown URL returns 404.
- Seven representative search queries return results. Browser search for creating a role returns its current guide.
- Home/article navigation and mobile menu checked in browser. No horizontal document overflow observed at 1440, 768, 390 or 320 pixels. Mobile menu focuses its close control and closes correctly.
- Cross-review of all article collections and integration by separate agents.

Desktop and mobile Help Center captures are under `screenshots/2026-10-05/`. These show documentation, not live recruiting-provider outcomes.

## Application access

Draft application PR [#2373](https://github.com/lemma-count/wilu-web/pull/2373) restores the account-menu label **Documentation** and destination `https://docs.heylemma.com`. All 13 existing navigation tests and `npm run gate:ui` pass. Its deployed preview opens Login, so the authenticated account-menu visual check remains unperformed on that origin.

## Release sequence and limits

Documentation PR [#7](https://github.com/lemma-count/lemma-docs/pull/7) must be released first, then the application link. Both changes are prepared for review; neither was merged during implementation.

Article sources record code verification and prior read-only observations. No new role, candidate import, cohort approval, provider connection, external message, or reply was executed in production for this rewrite. Fresh synthetic screenshots and full product journeys remain the separate runtime verification queue; do not claim these passed based on the documentation checks.

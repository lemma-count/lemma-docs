# Speiros Help Center

Task-oriented documentation for the current recruiting product. The Help Center keeps the existing search-first home, collection navigation, breadcrumbs, table of contents, and article progression.

## Structure

52 canonical pages across six collections:

- `/start` — understand Speiros and complete a first recruitment.
- `/recruiting` — prepare company context and create or manage roles.
- `/candidates` — search, import, review, and confirm candidates.
- `/work` — supervise preparation, approve sequences, follow sending and replies.
- `/settings` — connect accounts and configure the workspace.
- `/help` — understand states and resolve problems.

`legacy-redirects.json` owns the permanent redirects from previous documentation URLs. Preserve useful old links when moving a page.

## Run locally

```bash
npm ci
npm run dev
npm run check
npm run build
```

The site uses Next.js and Fumadocs. `NEXT_PUBLIC_SITE_URL` controls metadata, robots, and the sitemap; the production origin remains `https://docs.speiros.com`. Application links point to `https://app.speiros.com`.

## Product evidence

Start with `docs-inventory/README.md`. The October 2026 rewrite follows the current recruiting interface and records page-level source evidence. Code review verifies supported behavior; it does not prove successful live provider execution. Public articles distinguish candidate confirmation, message approval, channel authorization, scheduling, and confirmed sending.

Use exact visible labels where a user must find a control. Never present a planned integration, automatic outcome, private fixture, or historical screenshot as current behavior.

## Visual identity

The current Speiros mark comes from the application's approved brand assets. The Help Center retains its original reading layout and typography, with current Speiros identity, palette, metadata, search labels, and social card. Product screenshots require a fresh capture with synthetic data before inclusion.

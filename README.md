# Lemma Help Center

Business-facing product documentation for Lemma’s professional outbound workflow.

The site is built with Next.js and Fumadocs. Its information architecture follows the work an Operator needs to complete:

```txt
/

Start here
/start
/start/lemma-101
/start/onboarding
/start/quickstart
/start/review-first-sequence
/start/verify-first-outcome
/start/home
/start/what-is-lemma
/start/core-concepts

Sender
/sender
/sender/connect-and-activate
/sender/readiness-and-schedule
/sender/pause-reconnect-replace

Leads
/leads
/leads/import-from-linkedin
/leads/import-spreadsheet
/leads/create-manage-lists
/leads/organize-and-protect

Missions
/missions
/missions/create-lemma-led
/missions/build-manually
/missions/research-and-drafts
/missions/mission-controls
/missions/pause-hold-complete

Outbox
/outbox
/outbox/review-sequences
/outbox/understand-statuses
/outbox/resolve-problems
/outbox/handle-replies

Reference
/reference
/reference/execution-truth
/reference/safety-boundaries
/reference/timezones
/reference/audit-log
/reference/about-me
/reference/about-offer
/reference/roles-and-access
/reference/account-data-billing
/reference/troubleshooting
/reference/support
```

## Run locally

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin used for metadata, robots, and the sitemap. The production origin is `https://docs.heylemma.com`.

## Brand system

The interface follows the approved Lemma brand kit v2.1.0, **Sunrise Threshold**: a flat orthogonal doorway framing a Signal-orange half-sun on the horizon, with Paper and Ink fields, Inter Tight, Sometype Mono, and sharp control geometry. Superseded perspective marks, coastal imagery, and the serif layer are intentionally excluded.

## Product truth

The published guides describe the verified LinkedIn workflow:

- connect one Sender and verify that a healthy Connect or Replace becomes Ready;
- recover an exceptional Dry run Sender with Activate sending when that control appears;
- distinguish configured targets from the Sender’s automatic warm-up and effective capacity;
- add real Leads from LinkedIn or a spreadsheet;
- create a bounded Mission and Sequence;
- use the Lemma-led conversation or the operational Manual Mission view;
- review prepared work and provider evidence in Outbox;
- distinguish Draft, approved, scheduled, running, blocked, failed, and provider-confirmed states;
- store Operator and offer dossiers without promising downstream reuse that is not wired;
- handle replies and problems without implying an outcome guarantee.

Do not document the retired studies product, automatic Lead sourcing, detailed email execution, CRM writes, teammate administration, hidden integration fixtures, unsupported channels, or guaranteed results as current capabilities.

## Documentation evidence

The audit system in `docs-inventory/` records:

- the verified product map;
- page coverage and remaining gaps;
- screenshot provenance and recapture needs;
- the design-reference decisions behind the Help Center UX.

Update this evidence before adding broad product claims or new capability areas.

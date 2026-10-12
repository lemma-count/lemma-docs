# Screenshot manifest

Updated: 2026-10-12.

## Current publication

One static contextual-tour component example is embedded in `/start/onboarding`; see its provenance below. No historical product screenshot is embedded in the rewritten public guides. The July assets show obsolete labels and workflows and are not used as current evidence. Existing files under `public/product/` are retained as historical assets, not silently relabelled as Speiros captures.

The Help Center keeps its abstract architectural home image to preserve its presentation. It uses the current Speiros mark from `wilu-web origin/main:public/brand/speiros/v1/logo/speiros-mark.svg` and a current text-based Open Graph image. Neither is product execution evidence.

## Recapture queue

| State | Guides | Required source |
| --- | --- | --- |
| Role draft and Open recruiting | Recruiting/create-role | Current role UI with synthetic brief |
| Context proposal and Accept and publish | Recruiting/review-context | Synthetic context and source documents |
| Recruiting search and candidate review | Candidates/search, review-profile | Demo profiles and provider fixture or authorized demo account |
| Import mapping/conflict review | Candidates/import-spreadsheet | Synthetic sheet with deliberate conflicts |
| Proposed audience and Confirm audience | Candidates/confirm-selection | Synthetic draft Mission and exact list |
| Sequence editor and approval | Work/approve-sequence | Synthetic eligible sequence; no real recipient |
| Sending evidence, waiting, problems | Work/sending-plan, Help/sequence | Dedicated execution fixture with recorded provider receipts |
| Reply actions | Work/replies | Synthetic incoming conversation and queued reply |
| Sender/calendar | Settings | Demo account; redact identity/contact details |
| Beta systems/workspace invites | Settings | Authorized test systems and disposable invitation identities |

Record source commit, route, state, viewport, exact labels, crop, publication placement, and privacy check before embedding an asset. Never fabricate a state or use customer data. Capture-only tasks must not contact real people or change live billing, workspace access, or provider permissions.

## Contextual-tour illustrative crop — 12 October 2026

- Asset: `public/product/speiros-contextual-tour-example.png`.
- Source: actual contextual-tour component on application working branch
  `feat/onboarding-contextual-tour`, parent `1501cb32b850cd27896c38d648d41b89f4db147f`.
- Capture source: local browser fixture with synthetic pages; Roles, step 1 of 5.
  Not a production or provider execution screenshot.
- Source crop: `/private/tmp/speiros-onboarding-review/contextual-tour-card.png`,
  supplied after root verified the local component interaction.
- Published crop: 360 × 380 pixels; only the tour card, no historical application shell.
- Visible labels: Discover Speiros, Roles, Product designer, Role brief, Candidates,
  Role conversation, Pause, Next. Static example; no animation or recorded operation.
- Placement: `/start/onboarding#discover-the-product-and-resume-the-tour`.
- Caption: “Illustrative example of the product tour, captured with synthetic data”.
- Privacy: synthetic role example; no real identity, contact details or recruiting data.
- Release boundary: matching application PR #2465 is merged at
  `ecbb2c279b880849fc175a24f17d7083f19b6e19` and its production deployment is READY.
  Authenticated Roles → Candidates and Escape/reload resumption at 2/5 were verified
  by the coordinator. All five real desktop routes, focus, finish/replay, free navigation and collapsed
  sidebar continuation subsequently passed. Hosted mobile remains unverified
  because the viewport command did not resize authenticated Chrome; only the
  local responsive fixture passed. Exact scope is recorded in
  `onboarding-navigation-validation-2026-10-12.md`. This asset remains a synthetic
  component example, not a production screenshot.

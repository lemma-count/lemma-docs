# Screenshot Manifest

Updated: 2026-07-26

Use only demo or E2E fixture data. Keep enough product chrome to orient the reader, but exclude private email addresses, customer names, tokens, payment data, and internal-only routes.

## Published assets

All assets below were captured on 2026-07-26 from product commit `a6752092` in a local, hermetic workspace containing only synthetic people, companies, messages, and Sender identifiers. The capture viewport was 1440 × 1100 before intentional cropping.

| Asset | Product route and state | Published placement | Reader job | Final crop |
| --- | --- | --- | --- | --- |
| `lemma-sender-readiness.jpg` | `/settings/channels`, synthetic Connected + Ready Sender | `/sender/readiness-and-schedule` | Separate provider connection from execution readiness and locate recovery controls | 1080 × 270 |
| `lemma-sender-capacity.jpg` | `/settings/channels`, same Sender with targets above effective limits | `/sender/readiness-and-schedule` | Compare configured target, effective limit, confirmed, reserved, and remaining | 1080 × 480 |
| `lemma-linkedin-import.jpg` | `/leads?panel=import`, LinkedIn search with synthetic URL | `/leads/import-from-linkedin` | Recognize supported LinkedIn URL input and import path | 970 × 315 |
| `lemma-manual-mission-review.jpg` | `/missions/new/manual`, exact audience Review | `/missions/build-manually` | Understand what Launch binds and what it does not prove | 1360 × 610 |
| `lemma-manual-cockpit.jpg` | `/missions/:id`, active synthetic Manual Mission | `/missions/build-manually`, `/missions/cockpit-and-controls` | Distinguish Manual queue truth from Lemma-led conversation and approval | 1360 × 650 |
| `lemma-outbox-sequence.jpg` | `/outbox?...&item=...`, synthetic Manual Sequence drawer with evidence expanded | `/outbox/review-sequences` | Read next action, ordered touches, evidence, and available controls together | 800 × 1080 |

The older July 13 Outbox evidence remains excluded because it predates the current Sequence control plane and shows retired **Plan / Needs you / History** navigation.

## Deliberate omissions

- No Integrations, Organization, qualification, auto-grouping, interview, extension, or email-execution surface: those are unavailable, internal, legacy, or broken.
- No About me or About offer screenshot: current Mission and drafting code does not yet consume those dossiers.
- No Lemma-led Cockpit screenshot: the local seeded example contains legacy product content. Publish one only after a fully synthetic current Mission reaches a real approval state.
- No onboarding screenshot: the current fullscreen layout visibly overflows and crops choice cards at the verified desktop widths.

## Quality rules

- Capture the current `origin/main` product with seeded demo data.
- Use desktop for instructional detail and mobile only when the responsive behavior is the subject.
- Do not cosmetically fabricate a state.
- Do not obscure a mismatch between the screenshot and the written label.
- Re-capture when a navigation, state, or action label materially changes.
- Re-capture this set whenever the product commit materially changes the shown state, copy, or control contract.

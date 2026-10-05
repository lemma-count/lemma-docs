# Start section evidence

Date: 2026-10-05. Product authority `wilu-web origin/main` at `162f6b07b8bf1011e8f231d0c077a4db4ae82d03`.

| Page | Source evidence | Verification boundary |
| --- | --- | --- |
| Index/overview | `docs/product-boundaries.md`, `src/components/gtm/work-view-tabs.tsx` | Public labels inspected live; no outcome guarantee |
| Navigation | `src/components/gtm/gtm-sidebar-nav.tsx`, `src/components/gtm/sourcing/start-recruiting-button.tsx`, `src/lib/product-profile.ts` | Live navigation and Choose a role verified |
| Concepts | product boundaries, `agent/lib/root-tools/prepare_mission_cohort.ts`, `src/components/gtm/missions/mission-audience-proposal-card.tsx` | Draft Mission → selected cohort → approval are distinct; code verified |
| Onboarding | `src/lib/gtm/onboarding/fullscreen-contract.ts`, `src/components/gtm/onboarding/fullscreen/connect-sender-step.tsx`, `src/components/gtm/onboarding/fullscreen/workspace-context-step.tsx` | Three steps, deferrable; no claim of automatically creating a Mission |
| First recruitment | `src/components/gtm/sourcing/start-recruiting-button.tsx`, `src/components/gtm/missions/mission-audience-proposal-card.tsx`, `src/components/gtm/outbox-sequence/outbox-sequence.tsx`, other section ledgers | User journey source verified; synthetic end-to-end execution remains unperformed |

No screenshots, customer data or live mutations used. Independent review by the accounts audit agent passed. Role/context account/candidate/mission changes need synthetic reproduction for fresh product screenshots and runtime proof.

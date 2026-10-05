# Candidates writing evidence

Product authority: `wilu-web origin/main` at `162f6b07b8bf1011e8f231d0c077a4db4ae82d03` (fresh parent fetch, 5 October 2026). All file/line references below belong to that revision, never the local checkout. This ledger supplements the canonical product map and coverage matrix; it is not a capability registry.

Docs files: `content/docs/candidates/index.mdx`, `meta.json`, and the articles below. No obsolete screenshots used. No production mutations. Public copy stays in English.

## /candidates/search

- Evidence: `src/components/gtm/sourcing/start-recruiting-button.tsx:60–118; src/components/gtm/leads/sourcing-workspace.tsx:125–201; docs/gtm/unipile-v2-sourcing-agent-contract.md:35–56`.
- Verification: Role-choice dialogue live; session creation/search not run. No guaranteed results or autonomous contact claimed. Explore without role distinguished from mission precondition.

## /candidates/linkedin-products

- Evidence: `docs/gtm/unipile-v2-sourcing-agent-contract.md:29–79; src/components/gtm/search-import/search-import-shell.tsx:222–237; src/components/gtm/settings/settings-sender-status.tsx:56`.
- Verification: Capability section visible live, provider-specific search execution code-only. One active LinkedIn Sender boundary documented; Recruiter direct-import procedure intentionally not asserted.

## /candidates/review-profile

- Evidence: `src/components/gtm/leads/gtm-prospect-drawer.tsx:209–249,255–310,344–357; src/components/gtm/leads/candidate-view-controls.tsx:129–155; src/components/gtm/leads/leads-table.tsx:497–501`.
- Verification: Candidate navigation live; details/provenance/view saving code-only. Sorting intentionally omitted because table disables it. Voice interactions omitted from core journey.

## /candidates/import-linkedin

- Evidence: `src/components/gtm/leads-page-client.tsx:164–179; src/components/gtm/leads-import-drawer.tsx:109–135; src/components/gtm/search-import/search-import-shell.tsx:200–329,359–365,385–439; src/lib/gtm/leads/import-linkedin/linkedin-account-eligibility.ts:17–43`.
- Verification: Direct import not executed. Add candidates is actual entry label; Import candidates drawer label. Rate-limited continuation described via actual hint without fixed timing promises.

## /candidates/import-spreadsheet

- Evidence: `src/components/gtm/leads/import-wizard.tsx:52–58,105–169,487–490,543–619,644–727; src/components/gtm/leads-import-drawer.tsx:138–174`.
- Verification: Upload/map/merge/retry code-only. Preserve vs overwrite and immutable identity rules read from merge preview; not validated with synthetic import yet.

## /candidates/lists

- Evidence: `src/components/gtm/list-builder-drawer.tsx:43–67; src/components/gtm/list-builder-manual-tab.tsx:44–88; src/components/gtm/list-builder-describe-tab.tsx:78–131; src/app/(gtm)/leads/ai-lists/[proposalId]/review/page.tsx:33; src/components/gtm/leads/leads-bulk-actions-bar.tsx:81–116; src/components/gtm/gtm-list-delete-dialog.tsx:28–43; src/components/gtm/leads/leads-selection-hint.tsx:26`.
- Verification: Lists and AI review not run live. Static set, personal view distinction, selection-per-page and archive-first behavior verified in code.

## /candidates/confirm-selection

- Evidence: `agent/lib/server-functions/sourcing-mission-cohort.ts:122; src/components/gtm/missions/mission-audience-proposal-card.tsx:120–229,300–436,443–505; src/components/gtm/leads/sourcing-workspace.tsx:251–280; supabase/migrations/20260928170000_speiros_mission_role_binding.sql:181`.
- Verification: Code-only, no enrollment/move action. Exact legacy labels preserved: Proposed audience, Confirm audience, Choose Leads to move, Move selected Leads and confirm. Confirmation != outreach approval. Active conflict movement may leave already-authorized work in flight.

## Publication verification still needed

Run the described actions with synthetic company/role/candidate data in a demonstration workspace before adding screenshots or asserting end-to-end production execution. Recheck live labels for role transitions, import outcomes, AI list review, and cohort conflict handling. Connector availability must be established per source; a connected tool is not proof of a successful read. No public current multichannel sending claims were added.

# Recruiting writing evidence

Baseline product authority: `wilu-web origin/main` at `162f6b07b8bf1011e8f231d0c077a4db4ae82d03` (fresh parent fetch, 5 October 2026). Role-import delta subsequently reviewed against fresh `origin/main` at `bd159965ea5b5560e9ca8f3f3a98e2ee304538bb` (PR #2370). Baseline references remain historical evidence; the new revision is current authority for the delta. All file/line references below belong to that revision, never the local checkout. This ledger supplements the canonical product map and coverage matrix; it is not a capability registry.

Docs files: `content/docs/recruiting/index.mdx`, `meta.json`, and the articles below. No obsolete screenshots used. No production mutations. Public copy stays in English.

## /recruiting/company-context

- Evidence: `src/components/gtm/onboarding/fullscreen/workspace-context-step.tsx:53–114; src/components/gtm/home/home-dashboard.tsx:787; src/components/gtm/settings/knowledge-workspace.tsx:220–248`.
- Verification: Context navigation and conversation inspected live by coordinator; onboarding submit and publication not run.

## /recruiting/context-sources

- Evidence: `src/components/gtm/settings/knowledge-workspace.tsx:267–286,337–351; docs/gtm/agent-knowledge-source-adapters.md:19–38`.
- Verification: Sources and conversation visible live. Source reads, file attachments, connector access and ingestion are code-only. No invented source delete/edit/sync controls. Notion endpoint explicitly cannot import selected pages; no selected-page procedure promised.

## /recruiting/review-context

- Evidence: `src/components/gtm/settings/knowledge-workspace.tsx:379–477,554–579; src/app/actions/gtm/agent-knowledge.ts:134–212`.
- Verification: Review controls code-only; no publication in production. Acceptance publishes; retry is recovery for incomplete publication.

## /recruiting/create-role

- Evidence: `src/components/gtm/sourcing/start-recruiting-button.tsx:89–118; src/components/gtm/settings/knowledge-workspace.tsx:102–155,310–313; agent/lib/root-tools/create_speiros_role_draft.ts:8–12,38,73–79; src/components/gtm/roles/roles-workspace.tsx:104–126,142–182`.
- Verification: Choose a role and Create a role inspected live. Creation, editing and opening not run. Draft writer requires explicit operator opening; no job-post publication or outreach implied.

## /recruiting/manage-role

- Evidence: `src/components/gtm/roles/roles-workspace.tsx:75–99,134–200; src/app/(gtm)/roles/[id]/page.tsx:75–115; src/app/actions/gtm/speiros-roles.ts:37–93`.
- Verification: Sidebar Roles verified live; role transitions and detail views code-only. Manual editing documented only for Draft; provider-owned editing delegated to source. Closure blocked by active work.

## Publication verification still needed

Run the described actions with synthetic company/role/candidate data in a demonstration workspace before adding screenshots or asserting end-to-end production execution. Recheck live labels for role transitions, import outcomes, AI list review, and cohort conflict handling. Connector availability must be established per source; a connected tool is not proof of a successful read. No public current multichannel sending claims were added.

## Role-import delta — bd159965ea5b5560e9ca8f3f3a98e2ee304538bb

Only the changes from baseline affecting Roles and its shared refresh control were inspected; no provider action was executed.

- `/recruiting/create-role`: added alternate existing-job entry through **Import LinkedIn roles**, connected-account prerequisite, progress in **Updates**, verification of imported role/source status, and explicit distinction from publishing a LinkedIn posting.
- `/recruiting/manage-role`: named the current LinkedIn resynchronization control for source-status recovery; distinguished synchronization from a local reload and added recovery for dispatch failure versus page-refresh failure.
- Current UI evidence: `src/app/(gtm)/roles/page.tsx:79–81` exposes **Import LinkedIn roles**, tooltip states import jobs and refresh connected account; `src/components/gtm/roles/roles-workspace.tsx:56–65` rereads Roles after Sender projection updates.
- Current control feedback: `src/components/gtm/gtm-query-provider.tsx:59–69,94–101,156–177` reports synchronization started and progress in Updates, separately reports dispatch failure or page-refresh failure.
- Dispatch scope: `src/app/actions/gtm/resynchronize.ts:14–28` starts workspace synchronization including Sender discovery and existing work reconciliation. Documentation does not promise an isolated local refresh or import-only background action.
- Source ownership remains evidenced by `src/app/(gtm)/roles/page.tsx:73–74` and role draft edit boundaries in `roles-workspace.tsx:119–122,179–182`.
- Verification status: code-only delta review, no authenticated live inspection of the newly landed button, no import/provider write executed. Demonstration-workspace check remains required before screenshots or an end-to-end production claim.

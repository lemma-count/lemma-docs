# Onboarding and navigation documentation delta — 12 October 2026

## Authorities and limits

Documentation base: `lemma-docs origin/main b5fd2b8`.
Application authority for the initial coherence delta:
`wilu-web origin/main 1501cb32b850cd27896c38d648d41b89f4db147f`.
Navigation follow-up verified on fresh `origin/main 53f3bbcbd` (PR #2464):
`/home` now has the **Home** navigation label and appears first. The page title
**Work** and its **Needs you** view retain their own labels. Only navigation
references were corrected; the older local-fixture evidence below remains dated.

This is a code-backed coherence audit. It does not establish that calendar OAuth,
Slack authorization, invitations, billing or recruiting execution completed live.
Historical October 5 evidence remains preserved. The contextual tour was released
in application PR [#2465](https://github.com/lemma-count/wilu-web/pull/2465), merge
`ecbb2c279b880849fc175a24f17d7083f19b6e19`. The production deployment is READY
on `https://app.speiros.com`; this is deployment evidence, separate from the
browser observations below.

## Code-backed corrections

- `src/components/gtm/gtm-nav.ts`, `gtm-sidebar-nav.tsx`: Roles, Process, Knowledge,
  Home and Candidates; object/conversation panel and Getting started account action.
  Home label/order were rechecked at `53f3bbcbd`; Needs you remains a Work view.
- `src/components/gtm/sourcing/start-recruiting-button.tsx`: Find candidates,
  Choose a role, Search without a role and Create a role.
- `src/components/gtm/roles/create-role-button.tsx`, `post-workspace.tsx`:
  Role title / Create draft, dedicated role conversation, View role, Find candidates,
  job-description edits, Contact candidates and role process assignment.
- `src/lib/gtm/settings-nav.ts`: canonical profile/calendar/team/channels/history/billing
  destinations; legacy aliases are compatibility rather than current instructions.
- `src/components/gtm/onboarding/recruiting-setup-checklist.tsx`: existing Work checklist,
  first-recruitment vs optional interviews/resources, status refresh and optional orientation.
- `src/components/gtm/settings/knowledge-workspace.tsx`: Add resources with Knowledge,
  supported resource explanation and review before publication.
- `src/components/gtm/coordination/team-settings.tsx`, `team-calendar-invitations.tsx`,
  `team-slack-settings.tsx`: interviewer vs workspace membership; calendar read vs modify
  and organizer; explicit invitations; Slack app vs conversation connector.
- `src/components/gtm/audit-log/audit-log-shell.tsx`: History names and selectors,
  readable action labels and secondary technical references. The shared
  `src/lib/gtm/format-datetime.ts` formatter explicitly displays feed timestamps in UTC;
  date-input filter handling must not be confused with event timestamp formatting.

## Screenshot audit

No public article currently embeds `public/product/lemma-*.jpg`. Those retained July
assets remain historical and must not be relabelled. Current text corrections do not
require including production screenshots containing personal or recruiting data.
Fresh synthetic captures are still needed for role, Knowledge review, Process/team
and contextual tour states beyond the illustrative crop; record route, source commit, viewport and state
in `screenshot-manifest.md` before publication.

## Validation

`npm run check` passed: typecheck, integrity for 53 pages / 53 routes / 42 permanent
redirects, and 5 documentation API tests. `npm run build` passed and generated
60 static pages. `git diff --check` passed.
The public docs API tests and link checks verify content exposure and internal links,
not successful external provider execution. The production continuity checks below
are separate from these documentation checks.

## Contextual-tour component evidence

Root verified the actual new components in a local browser fixture with synthetic
pages: Roles → Candidates → Knowledge → Process → Needs you; Next/Back, navigation
and reload continuity; Escape/Pause; header Resume tour with step count; finishing
and replay; isolated user/workspace preferences and compact card layout. This is
local component evidence, not a hosted authenticated application or production check.
Production verification for the deployed release is recorded separately below.

`public/product/speiros-contextual-tour-example.png` is a static crop of the actual
Roles tour card captured in that fixture. It contains synthetic Product designer
data, without application shell, real profiles, or provider execution claims. The
public caption explicitly identifies it as an illustrative example.

## Home navigation follow-up

The public onboarding article opens Home to reach Work, and the tour’s final
concept names Home. The public navigation table lists Home first. References
to the Needs you view and decisions remain intact. The prior local fixture
sequence used the then-current Needs you navigation label; it does not prove
the final Home-labelled hosted application experience.

## Production desktop continuity acceptance

The coordinator verified the authenticated application at `app.speiros.com` on
October 12 after production release `ecbb2c279b880849fc175a24f17d7083f19b6e19`.
Roles → Candidates retained the compact card at step 2/5. Escape paused the visit;
a reload preserved the header Resume control at 2/5. These observations establish
the reported cross-page interruption and resumption fix on the real product.

The coordinator subsequently verified all five actual desktop routes:
Roles → Candidates → Knowledge → Process → Home. Focus remained on the tour;
Finish exposed Replay and did not change the real setup count (5/7). Replay
returned to 1/5. Explore roles retained the card on Roles; navigating freely to
Home during Candidates 2/5 and choosing Explore candidates returned to that step.
The highlight remained visible with the sidebar collapsed. Escape/reload
resumption was verified as above.

Hosted mobile acceptance remains unverified: the authenticated Chrome viewport
command did not resize the browser; screenshots remained 1470 × 742 instead of
the requested 390-pixel width. The earlier 390 × 844 local responsive fixture
passed, but it is not hosted whole-shell mobile evidence. No calendar/Slack
connection, role creation, candidate mutation, publication or provider send was
exercised by these tour checks.

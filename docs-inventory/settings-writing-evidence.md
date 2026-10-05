# Settings writing evidence

Written 2026-10-05. Product authority: `wilu-web` fresh `origin/main` at `162f6b07b8bf1011e8f231d0c077a4db4ae82d03`. Files inspected through explicit `git show origin/main:<path>` / `git grep origin/main`, never inferred from the primary checkout. The writing follows `speiros-restructure-2026-10-05.md` and `speiros-audit-evidence-2026-10-05.md`.

## Verification boundary

Live read-only checks by the coordinator covered Sender settings, channel picker, schedule, capabilities, calendar/profile sections, Integrations cards and tool entry points. No connect, send, transfer, invite, checkout, import or configuration mutation was executed. Detailed actions below are code-verified procedures; they still need synthetic end-to-end reproduction before publication as fully tested procedures. No historical screenshots, real account data or secret values were added.

| Page | Code evidence at product commit | Live / remaining verification |
| --- | --- | --- |
| `/settings` | `src/components/gtm/gtm-sidebar-nav.tsx:973`; `src/lib/gtm/settings-auth.ts:14`; `src/app/(gtm)/settings/channels/page.tsx:68` | Settings/Sender entry confirmed live; access denial procedures remain code-only. |
| `/settings/connect-linkedin` | `src/components/gtm/settings/settings-sender-shell.tsx:66–73, 262–291`; `src/components/gtm/settings/settings-sender-status.tsx:105–144`; `src/components/gtm/onboarding/fullscreen/connect-sender-step.tsx:38–60, 139–161` | Connection versus execution UI confirmed live; successful auth/activation/expired-link recovery not executed. |
| `/settings/linkedin-access` | `src/components/gtm/settings/settings-sender-status.tsx:12–66, 124–135`; `src/components/gtm/settings/settings-sender-shell.tsx:172–180` | Product cards live; product expansion and refreshed entitlements remain code-only. |
| `/settings/schedule-capacity` | `src/components/gtm/settings/settings-sender-schedule-card.tsx:37–126`; `src/components/gtm/settings/settings-sender-shell.tsx:223–253`; `src/components/gtm/settings/settings-sender-status.tsx:134–141` | Schedule observed live; save/validation not executed. No obsolete editable daily-target UI claimed. |
| `/settings/recover-sender` | `src/components/gtm/settings/settings-sender-shell.tsx:153–200, 208–219, 260–291`; `src/components/gtm/settings/settings-sender-status.tsx:116–144` | No reconnect, replacement, pause/resume or transfer executed. Transfer consequences reproduced from exact dialog; blocked replacement not treated as reassignment. |
| `/settings/sender-profile` | `src/app/(gtm)/settings/channels/page.tsx:100–120`; `src/components/gtm/settings/seller-identity-editor.tsx:130–147, 157–195, 214–225, 242–256` | Profile section live; import/save/validate not executed. Draft and validated distinguished. |
| `/settings/calendar` | `src/components/gtm/settings/settings-calendar-shell.tsx:143–203, 209–372`; `src/app/(gtm)/settings/calendar/page.tsx:13` | Calendar section/provider options live; auth, saved availability and booking not executed. Calendar connection not called a booked interview. |
| `/settings/candidate-resources` | `src/app/(gtm)/settings/actions/page.tsx:72–84`; `src/components/gtm/settings/settings-actions-shell.tsx:36–45, 91–120, 161–225` | Code-only. Types Booking/Signup/Custom; Voice deliberately hidden. Disable affects future configuration; delete requires zero Mission references. Saved suggestion stays independent of subsequent profile changes. |
| `/settings/candidate-systems` | `src/components/gtm/settings/crm-integrations-beta.tsx:44–49, 77–98, 112, 165–176, 195, 233–253, 283–307, 326–364`; `src/app/(gtm)/settings/integrations/page.tsx:44–51` | Beta cards and providers live; provider connection/import/sync not executed. Provider capabilities explicitly differ; no assumed Zoho parity or generalized writeback promise. |
| `/settings/tools` | `src/lib/gtm/mcp/curated-catalog.ts:16–98`; `src/components/gtm/settings/public-mcp-servers.tsx:75–121`; `src/app/(gtm)/settings/developers/page.tsx:39–54` | Eve tools/Add custom connector live; discovery/OAuth/tool execution not executed. Tools used by Eve separated from agents acting in Speiros. |
| `/settings/workspace` | `src/components/workspace/workspace-switcher.tsx:57–89`; `src/app/(gtm)/settings/workspace/page.tsx:59–72`; `src/app/(sponsor)/sponsor/workspace/team-members-section.tsx:101–151`; `pending-invitations-section.tsx:59–105`; `access-requests-section.tsx:103–113`; `src/app/actions/workspace-invitations.ts:60–64, 93–104`; `src/lib/terminology/operator-persona.ts:23, 28–34`; `src/app/workspace/accept/[token]/accept-invitation-card.tsx:41–66, 84–117` | Code-only. Invitations grant operator access. Invite identity mismatch can still be accepted per actual UI; email-send failure may leave pending invitation. No admin/editor/viewer tiers invented. |
| `/settings/account` | `src/app/(gtm)/settings/account/page.tsx:133–139, 144–235`; `src/components/gtm/billing/gtm-billing-section.tsx:226–365`; `src/app/(sponsor)/sponsor/account/profile-section.tsx:57–85` | Menu/account entry observed; profile/billing actions code-only. Current entitlement and role capacity prioritized; no hardcoded price, role limit, grace period or old credit scheme. |

## Deliberate editorial boundaries

- Availability conflict remains unresolved: channel picker announces LinkedIn-only V0, product boundary and task-channel map cover five channels. Guides cover the LinkedIn setup and describe availability as connection/authorization dependent without global channel promises.
- Sender `Refresh` can open provider authentication. Page-level unavailable or stale readiness uses `Retry`; an unavailable execution badge uses its own reason/controls.
- Context/role/candidate/work/help cross-links follow the approved proposed routes. Coordinator must validate those destinations when assembling all sections.
- Support uses `/help/support` and the application's Support route; no email address invented.
- Calendar auth and Gmail/Outlook mailbox connectors are separate account purposes; connecting Google Workspace tools is not presented as connecting the meeting calendar.
- Candidate resources still expose a Signup type from the older surface. It is documented only as a visible link classification, never as automatic account creation. Voice link creation is excluded.
- ATS/candidate-system integrations are labeled Beta. Existing candidates and launch selection survive disconnection per exact product copy; broader synchronization/writeback claims are excluded.
- A saved setting, connector, booking link or tracked click is not claimed as successful outreach or interview confirmation.

## Files owned in this writing pass

Only `content/docs/settings/**` (index, metadata and eleven articles) plus this evidence file. No shared navigation/configuration, old sections or other writers' files edited; no commit created.

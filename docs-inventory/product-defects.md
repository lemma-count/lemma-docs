# Confirmed Product Defects and Documentation Blockers

Updated: 2026-07-26

Evidence baseline: `wilu-web` commit `a6752092`. Browser observations used the local hermetic E2E workspace only.

These are product defects, not public capabilities. Public documentation must not invent a working flow around them.

## P1 — broken or contradictory authority

### Sender activation copy contradicts the database contract

- `supabase/migrations/20260720214500_linkedin_sender_auto_activation.sql` atomically makes a healthy Hosted Auth Connect or Replace active.
- `src/components/gtm/settings/settings-sender-shell.tsx` still says the connection remains in Dry run until explicit activation.

**Docs mitigation:** describe the runtime contract: healthy Connect or Replace normally becomes Ready; Reconnect preserves execution status; **Activate sending** is recovery for an exceptional Dry run state.

### Onboarding cannot recover every existing Sender state

- The onboarding LinkedIn step submits a fresh Connect operation outside its resume case.
- An existing Sender can make that operation fail with `SENDER_ALREADY_CONNECTED`.
- A visible Reconnect action can also be rejected when the stored provider identity proof is incomplete.

**Docs mitigation:** do not present onboarding Connect as recovery for **Reconnect needed** or other non-ready states. Route the Operator to **Settings → Sender**, then Support if the existing identity cannot be verified.

### Manual Review cannot prove invitation-note support

- `src/lib/audience/senders/compliance.ts` allows a note only for paid-active, Sales Navigator, or Recruiter Sender classes.
- `src/app/actions/gtm/manual-mission-v2.ts` and `src/lib/gtm/manual-mission-v2-loader.ts` do not load the Sender class into Review.

**Impact:** Review can pass while the executor later rejects the note for an unsupported or unknown account class.

**Docs mitigation:** tell Operators to omit the note unless the class is confirmed; never claim that Review proves this condition.

### Bulk Archive can end live Missions

- `src/lib/gtm/motion/bulk-eligibility.ts` enables bulk Archive for non-terminal rows.
- `src/app/actions/gtm/missions.ts` completes eligible live Missions before archiving them.
- The bulk confirmation copy says live work must be closed first, while the individual sidebar Archive control is terminal-only.

**Docs mitigation:** document the terminal-only individual archive flow. Do not recommend bulk Archive until its eligibility and confirmation agree.

## P1 — dead navigation

### “Auto-group now” opens a 404

- `src/components/gtm/search-import/search-import-shell.tsx` links to `/leads/grouping`.
- `src/app/(gtm)/leads/grouping/page.tsx` always returns not found.

### Mission Settings is a no-op

- `src/app/(gtm)/missions/[id]/settings/page.tsx` redirects to `?panel=guardrails`.
- The Mission page does not consume that query or render a guardrails panel.

### Mission-to-Lead drilldowns can 404

- The Mission person drawer builds `/leads?motion=…&contact=…`.
- `src/app/(gtm)/leads/page.tsx` rejects the legacy `motion` and `stage` parameters.

### Mission pipeline drilldowns do not resolve

- Pipeline cells create `?tab=` or `?stage=` Mission URLs that the Mission page ignores.
- Fallback links using `/leads?stage=…` are rejected by the Leads page.

**Docs mitigation:** link only to supported Mission, Lead `contact`, and Outbox routes. Do not document these drilldowns.

## P2 — misleading or exposed transitional surfaces

### Integrations is a reachable sandbox

The direct route is reachable but omitted from canonical Settings, creates sandbox connections, and exposes fixture actions and demo outcomes.

**Docs mitigation:** exclude Integrations until it is gated or converted into a production contract.

### About me validation and downstream use are incomplete

The identity action can validate an effectively empty dossier. Neither About me nor About offer currently has a Mission or drafting reader.

**Docs mitigation:** describe both as stored workspace dossiers. Do not promise automatic targeting, briefing, drafting, or personalization reuse.

### User-facing terminology still leaks “Motion”

Bulk actions, rename copy, and completion labels still expose the retired implementation noun.

**Docs mitigation:** use Mission consistently and treat the product strings as defects.

### Some Select controls expose raw UUID values

Observed in the local Manual builder and LinkedIn import flow at commit `a6752092`: the closed control can show a raw identifier even when its option label is human-readable.

**Docs mitigation:** crop the affected control from screenshots. Product should render the selected label.

### Fullscreen onboarding overflows horizontally

Observed at 1280 and 1440 desktop widths: choice cards extend beyond the visible onboarding frame.

**Docs mitigation:** no onboarding screenshot is approved until the layout is repaired and reverified.

### Manual Cockpit emits a native-button accessibility warning

The local browser console reports that a Base UI action in `ManualNativeCockpit` is configured as a native button but renders a non-`button` element. This can remove expected button and form semantics.

**Docs mitigation:** no documentation workaround is needed. Product should render a native `button` or explicitly opt out of native-button behavior, then verify keyboard and screen-reader semantics.

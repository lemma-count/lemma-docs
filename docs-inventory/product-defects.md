# Product discrepancies and documentation verification

Updated: 2026-10-05. Product authority: `wilu-web origin/main` at `162f6b07b8bf1011e8f231d0c077a4db4ae82d03`. Historical July findings are available in Git history and must not be treated as current facts without rechecking.

## Channel availability differs across sources

`docs/product-boundaries.md` lists LinkedIn, WhatsApp, Instagram, Telegram and personal email execution. The live Sender picker and `settings-sender-channel-picker.tsx` still say LinkedIn is the only active V0 sending channel; WhatsApp/Email are configurable ahead of rollout. The runtime guide also retains obsolete mixed-channel restrictions.

Documentation mitigation: provide the verified LinkedIn connection/search guide, describe mission authorizations without guaranteeing transport availability, and do not publish other channel-specific sending tutorials until verified. Do not settle the contradiction from a task enum or selector alone.

## Navigation and terminology remain mixed

Speiros navigation says Work, Roles, Candidates and Recruiting context; some detailed controls say Lead, audience, Outbox, Knowledge or Eve, and reply actions are in French. Guides reproduce important exact labels with their meaning rather than inventing controls.

The old manual creation URL now redirects to Start recruiting. The existing manual cockpit can still be maintained. No guide teaches the retired wizard as a current creation path.

## Contact and documentation domains

The existing Help Center is hosted on `docs.heylemma.com`. Product access now uses `app.speiros.com`; marketing uses `speiros.com`. This delivery keeps the verified documentation host and does not invent a new DNS deployment. Help points to the supported in-app conversation panel rather than an unverified support email.

## Operational evidence

Code consistency and browser inspection of navigation/settings are not tests of role publication, search/import, cohort moves, approval, actual provider delivery, replies, calendar OAuth, Beta provider writes, invitations or checkout. The writing ledgers retain required synthetic reproduction. No new claim of successful execution was inferred from this documentation work.

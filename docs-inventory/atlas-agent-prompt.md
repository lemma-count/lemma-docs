# Browser Capture Prompt: Lemma Outbound Docs

Use this prompt for a read-only capture pass against a seeded Lemma workspace.

```text
Goal:
Capture current, sanitized product evidence for the public Lemma Help Center.

Scope:
- LinkedIn Sender connection, activation, readiness, schedule, pause, reconnect, and restriction.
- Lead import from LinkedIn and spreadsheet, Lists, duplicates, eligibility, and Do not contact.
- New Mission: Lemma-led and Build manually.
- Cockpit phases and controls.
- Outbox Open, Needs you, Finished, Sequence detail, execution problems, provider evidence, and replies.

Rules:
- Use seeded E2E or approved demo data only.
- Do not publish, bill, invite teammates, change production settings, or contact a real person.
- Keep every external action in dry-run or a dedicated E2E provider fixture.
- Do not capture private emails, customer names, tokens, payment data, or internal URLs.
- Record the exact route, viewport, visible labels, data state, and source commit.
- If a state is unavailable, mark it missing or blocked. Do not fabricate it.
- Separate current shipped behavior from Product KB expectations.

For every capture return:
- screenshot_id
- route
- viewport
- user_job
- exact_visible_labels
- data_state
- docs_page
- safe_for_publication: yes / no
- notes
```

Update `screenshot-manifest.md` and `coverage-matrix.md` before replacing a published screenshot.

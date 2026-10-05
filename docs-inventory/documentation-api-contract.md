# Canonical documentation API v1

The public Help Center and agents read the same compiled MDX `source` loader. There is no exported or persisted second corpus. `includeProcessedMarkdown` makes processed article Markdown available to the shared documentation module.

- `GET /api/docs?action=search&query=...&limit=5`: returns `version`, corpus `revision`, normalized `query`, and `results` with `path`, absolute canonical `url`, `title`, `description`, `excerpt`.
- `GET /api/docs?action=read&path=/recruiting/create-role`: returns `version`, article `revision`, `path`, absolute canonical `url`, `title`, `description`, processed `markdown`, and `truncated`.
- `version` is `v1`. Revisions are SHA256 content hashes. A read hash covers the entire article even when its returned Markdown is truncated.
- Queries: 1–300 characters. Results: default 5, maximum 10. Excerpts: maximum 500 characters. Read Markdown: maximum 32,000 characters. Paths: slash followed by lowercase alphanumeric/hyphen segments, maximum 256 characters. Known retired paths resolve through the existing legacy redirects map.
- Errors: HTTP 400 `invalid_request`, 404 `not_found`, 503 `unavailable`; body `{version:"v1",error:{code,message}}`.
- `/api/search` uses the same relevance service and preserves its existing public-search result format. Generic English/French token expansion and evidence coverage ranking replace the old hardcoded destination router.

Canonical URLs come from `NEXT_PUBLIC_SITE_URL`; the server-side consuming client uses `HELPCENTER_ORIGIN`. These origins must agree, including for a preview configured to use itself as its canonical host. The default remains `https://docs.heylemma.com`.

Validation: `npm run check` includes meaningful ranking/read/input/hash/truncation regressions against current articles; `npm run build` passes. Local production HTTP smoke confirms search, compiled processed Markdown, UI search parity, and unsafe-path rejection. Provider imports/messages are outside this validation.

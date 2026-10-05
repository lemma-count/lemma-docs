import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { createDocumentationService, DocumentationError, validDocumentationPath } from '../src/lib/documentation-core.ts';

async function pages(directory = new URL('../content/docs/', import.meta.url), prefix = '') {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = prefix + entry.name;
    if (entry.isDirectory()) result.push(...await pages(new URL(entry.name + '/', directory), name + '/'));
    else if (entry.name.endsWith('.mdx')) {
      const raw = await readFile(new URL(entry.name, directory), 'utf8');
      const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
      const slug = name.replace(/\.mdx$/, '').replace(/(^|\/)index$/, '');
      result.push({ path: '/' + slug, title: frontmatter.match(/^title:\s*(.+)$/m)?.[1] ?? '', description: frontmatter.match(/^description:\s*(.+)$/m)?.[1], markdown: raw.replace(/^---\n[\s\S]*?\n---\n?/, '') });
    }
  }
  return result;
}
const corpus = await pages();
const redirects = JSON.parse(await readFile(new URL('../legacy-redirects.json', import.meta.url), 'utf8'));
const service = createDocumentationService(corpus, 'https://docs.heylemma.com', redirects);

test('ranks actual guides by question evidence rather than forcing a keyword destination', () => {
  const cases = [
    ['linkedin not connected', '/settings/connect-linkedin'],
    ['linkedin pas connecté', '/settings/connect-linkedin'],
    ['import candidates', '/candidates/import-linkedin'],
    ['close a role', '/recruiting/manage-role'],
    ['fermer un rôle', '/recruiting/manage-role'],
    ['import LinkedIn jobs', '/recruiting/create-role'],
    ['import spreadsheet candidates', '/candidates/import-spreadsheet'],
    ['importer un tableur', '/candidates/import-spreadsheet'],
    ['reply to a candidate', '/work/replies'],
  ];
  for (const [query, expected] of cases) {
    assert.equal(service.search(query, 1).results[0]?.path, expected, query);
  }
});
test('returns bounded, deduplicated canonical citations and no retired pages', () => {
  const result = service.search('candidates', 5);
  assert.equal(result.version, 'v1');
  assert.match(result.revision, /^[a-f0-9]{64}$/);
  assert.ok(result.results.length <= 5);
  assert.equal(new Set(result.results.map((page) => page.path)).size, result.results.length);
  for (const page of result.results) {
    assert.equal(page.url, new URL(page.path, 'https://docs.heylemma.com').href);
    assert.ok(page.excerpt.length <= 500);
    assert.ok(!redirects[page.path]);
  }
  assert.equal(service.search('xyzzynonexistentword').results.length, 0);
});
test('reads from the canonical corpus, resolves known aliases and exposes stable content revisions', () => {
  const original = corpus.find((page) => page.path === '/recruiting/manage-role');
  const page = service.read(original.path);
  assert.equal(page.markdown, original.markdown);
  assert.equal(page.truncated, false);
  assert.equal(service.read('/leads/import-spreadsheet').path, '/candidates/import-spreadsheet');
  assert.equal(service.read(original.path).revision, page.revision);
  const changed = createDocumentationService([{ ...original, markdown: original.markdown + '\nUpdated' }], 'https://docs.heylemma.com');
  assert.notEqual(changed.read(original.path).revision, page.revision);
});
test('rejects traversal, URLs, fragments and invalid inputs rather than reading arbitrary files', () => {
  for (const value of ['/../secret', '//attacker.test', 'https://attacker.test/x', '/help?x=1', '/help#x', '/%2e%2e/secret', '/help\\secret', '/HELP', '']) {
    assert.equal(validDocumentationPath(value), false, value);
    assert.throws(() => service.read(value), (error) => error instanceof DocumentationError && error.status === 400);
  }
  assert.throws(() => service.read('/missing'), (error) => error.status === 404);
  assert.throws(() => service.search('a'.repeat(301)), (error) => error.status === 400);
  assert.throws(() => service.search('role', 11), (error) => error.status === 400);
  assert.throws(() => service.search('role', 0), (error) => error.status === 400);
  assert.throws(() => service.search('   '), (error) => error.status === 400);
});
test('bounds returned markdown while hashing the complete article', () => {
  const page = { path: '/large', title: 'Large', markdown: 'x'.repeat(32_001) };
  const large = createDocumentationService([page], 'https://docs.heylemma.com');
  assert.equal(large.read('/large').markdown.length, 32_000);
  assert.equal(large.read('/large').truncated, true);
  assert.notEqual(large.read('/large').revision, createDocumentationService([{ ...page, markdown: page.markdown.slice(0, 32_000) }], 'https://docs.heylemma.com').read('/large').revision);
});

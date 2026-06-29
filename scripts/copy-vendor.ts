#!/usr/bin/env node
/**
 * Copies Bootstrap CSS and Font Awesome CSS + webfonts from node_modules into
 * public/vendor/ so they can be served as static files without going through
 * Vite's CSS pipeline (which corrupts component-scoped style modules in dev
 * when processing packages that have many @font-face url() references).
 *
 * Run automatically via the `postinstall` npm lifecycle hook.
 * public/vendor/ is gitignored — npm is the single source of truth for versions.
 */
import { cpSync, mkdirSync } from 'node:fs';
import type { CopySyncOptions } from 'node:fs';
import { resolve, dirname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const nm = (...p: string[]) => resolve(root, 'node_modules', ...p);
const out = (...p: string[]) => resolve(root, 'public', 'vendor', ...p);

const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const ok = (msg: string) => console.log(green(`    OK  ${msg}`));

function copy(src: string, dest: string, opts: CopySyncOptions = {}): void {
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, opts);
}

console.log('\nCopying vendor assets to public/vendor/ …');

copy(nm('bootstrap', 'dist', 'css', 'bootstrap.min.css'), out('bootstrap.min.css'));
copy(nm('bootstrap', 'dist', 'css', 'bootstrap.min.css.map'), out('bootstrap.min.css.map'));
ok('bootstrap.min.css + .map');

copy(
  nm('@fortawesome', 'fontawesome-free', 'css', 'all.min.css'),
  out('fontawesome', 'css', 'all.min.css'),
);
ok('fontawesome/css/all.min.css');

copy(nm('@fortawesome', 'fontawesome-free', 'webfonts'), out('fontawesome', 'webfonts'), {
  recursive: true,
});
ok('fontawesome/webfonts/ (4 woff2 files)');

console.log(green('\nVendor assets ready.\n'));

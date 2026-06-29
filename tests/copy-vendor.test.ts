import { describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const vendor = (...p: string[]) => resolve(root, 'public', 'vendor', ...p);

function run() {
  return spawnSync('node', ['scripts/copy-vendor.ts'], {
    cwd: root,
    stdio: 'pipe',
    encoding: 'utf-8',
  });
}

const EXPECTED = [
  vendor('bootstrap.min.css'),
  vendor('bootstrap.min.css.map'),
  vendor('fontawesome', 'css', 'all.min.css'),
  vendor('fontawesome', 'webfonts'),
];

function assertExpectedFiles() {
  for (const path of EXPECTED) {
    expect(existsSync(path), `missing: ${path}`).toBe(true);
  }
}

describe('copy-vendor script — clean run', () => {
  it('exits 0 and copies all expected files when vendor/ does not exist', () => {
    rmSync(vendor(), { recursive: true, force: true });

    const result = run();

    expect(result.status, result.stderr).toBe(0);
    assertExpectedFiles();
  });
});

describe('copy-vendor script — vendor/ already exists', () => {
  it('is idempotent: running twice produces the same set of files', () => {
    run(); // first run ensures vendor/ is populated
    const result = run(); // second run on top of existing vendor/

    expect(result.status, result.stderr).toBe(0);
    assertExpectedFiles();
  });

  it('overwrites a corrupted file with the correct content', () => {
    run(); // ensure vendor/ exists
    writeFileSync(vendor('bootstrap.min.css'), 'corrupted content');

    run();

    const content = readFileSync(vendor('bootstrap.min.css'), 'utf-8');
    expect(content).not.toBe('corrupted content');
    expect(content.length).toBeGreaterThan(100);
  });

  it('does not delete unrelated files already in vendor/', () => {
    run();
    const extra = vendor('my-extra-file.txt');
    writeFileSync(extra, 'extra');

    run();

    expect(existsSync(extra)).toBe(true);
  });
});

describe('copy-vendor script — partial vendor/ structure', () => {
  it('recovers and fills in missing files when vendor/ is partially populated', () => {
    rmSync(vendor(), { recursive: true, force: true });
    mkdirSync(vendor(), { recursive: true }); // empty dir, no files

    const result = run();

    expect(result.status, result.stderr).toBe(0);
    assertExpectedFiles();
  });

  it('fills in a missing sub-directory', () => {
    run();
    rmSync(vendor('fontawesome'), { recursive: true, force: true }); // remove fontawesome subtree

    const result = run();

    expect(result.status, result.stderr).toBe(0);
    expect(existsSync(vendor('fontawesome', 'css', 'all.min.css'))).toBe(true);
    expect(existsSync(vendor('fontawesome', 'webfonts'))).toBe(true);
  });
});

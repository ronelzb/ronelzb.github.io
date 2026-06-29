import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { which, ver } from '../scripts/setup';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const script = resolve(root, 'scripts/setup.ts');

function runSetup(cwd: string) {
  return spawnSync('node', [script], { cwd, stdio: 'pipe', encoding: 'utf-8' });
}

// ---------------------------------------------------------------------------
// Unit tests for exported helpers
// ---------------------------------------------------------------------------

describe('which()', () => {
  it('returns true for node', () => {
    expect(which('node')).toBe(true);
  });

  it('returns true for npm', () => {
    expect(which('npm')).toBe(true);
  });

  it('returns false for a non-existent command', () => {
    expect(which('__not_a_real_command_xyz__')).toBe(false);
  });
});

describe('ver()', () => {
  it('returns a semver string for node', () => {
    expect(ver('node')).toMatch(/^v?\d+\.\d+/);
  });

  it('returns a semver string for npm', () => {
    expect(ver('npm')).toMatch(/^\d+\.\d+/);
  });

  it('returns null for a non-existent command', () => {
    expect(ver('__not_a_real_command_xyz__')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Integration tests: .env handling (run inside a temp dir; npm install always
// fails there since there is no package.json, but .env logic runs first)
// ---------------------------------------------------------------------------

describe('setup script — .env handling', () => {
  let tmp: string;

  beforeEach(() => {
    tmp = resolve(tmpdir(), `setup-test-${Date.now()}`);
    mkdirSync(tmp, { recursive: true });
  });

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true });
  });

  it('exits 1 with a clear error when .env.example is missing and .env.local does not exist', () => {
    const result = runSetup(tmp);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('.env.example');
  });

  it('creates .env.local from .env.example when .env.local does not exist', () => {
    writeFileSync(resolve(tmp, '.env.example'), 'API_KEY=changeme\n');

    runSetup(tmp); // will fail at npm install — that is expected

    expect(existsSync(resolve(tmp, '.env.local'))).toBe(true);
    expect(readFileSync(resolve(tmp, '.env.local'), 'utf-8')).toBe('API_KEY=changeme\n');
  });

  it('leaves an existing .env.local untouched', () => {
    writeFileSync(resolve(tmp, '.env.example'), 'API_KEY=changeme\n');
    writeFileSync(resolve(tmp, '.env.local'), 'API_KEY=mylocalsecret\n');

    runSetup(tmp);

    expect(readFileSync(resolve(tmp, '.env.local'), 'utf-8')).toBe('API_KEY=mylocalsecret\n');
  });
});

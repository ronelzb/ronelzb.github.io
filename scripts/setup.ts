#!/usr/bin/env node
import { spawnSync, execSync } from 'node:child_process';
import { existsSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { platform, arch } from 'node:os';
import { fileURLToPath } from 'node:url';

const os = platform();

const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const warn = (s: string) => `\x1b[33m${s}\x1b[0m`;

function step(msg: string): void {
  console.log(`\n${cyan(`==> ${msg}`)}`);
}
function ok(msg: string): void {
  console.log(green(`    OK  ${msg}`));
}
function fail(msg: string): never {
  console.error(red(`    ERR ${msg}`));
  process.exit(1);
}

function run(cmd: string): void {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch {
    process.exit(1);
  }
}

export function which(cmd: string): boolean {
  const result = spawnSync(os === 'win32' ? 'where' : 'which', [cmd], { stdio: 'pipe' });
  return result.status === 0;
}

export function ver(cmd: string): string | null {
  try {
    return execSync(`${cmd} --version`, { stdio: 'pipe' }).toString().trim();
  } catch {
    return null;
  }
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  console.log(`\nronelzb.github.io — first-time setup  [${os}/${arch()}]`);

  // --- Prerequisites ---

  step('Checking prerequisites');

  if (!which('node')) fail('Node.js not found. Install from https://nodejs.org/ and re-run.');
  ok(`Node:  ${ver('node')}`);

  if (!which('npm')) fail('npm not found. Reinstall Node.js and re-run.');
  ok(`npm:   ${ver('npm')}`);

  // --- Local env ---

  step('Setting up local environment');

  const root = process.cwd();
  const envExample = join(root, '.env.example');
  const envLocal = join(root, '.env.local');

  if (!existsSync(envLocal)) {
    if (!existsSync(envExample)) fail('.env.example not found — cannot create .env.local.');
    copyFileSync(envExample, envLocal);
    ok('.env.local created from .env.example');
  } else {
    console.log(warn(`    --  .env.local already exists, skipping`));
  }

  // --- Node packages ---

  step('Installing Node packages  (npm install)');
  run('npm install');
  ok('Node packages installed');

  // --- Lint ---

  step('Running lint to verify everything is wired up');
  run('npm run lint');
  ok('Lint passed');

  // --- Done ---

  console.log(
    `\nSetup complete. Run \x1b[33mnpm run dev\x1b[0m to launch the site at http://localhost:4321/\n`,
  );
}

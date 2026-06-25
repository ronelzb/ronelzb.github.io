#!/usr/bin/env node
import { spawnSync, execSync } from 'child_process';
import { platform, arch } from 'os';

const os = platform();
const isWindows = os === 'win32';

const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;

function step(msg) { console.log(`\n${cyan(`==> ${msg}`)}`); }
function ok(msg)   { console.log(green(`    OK  ${msg}`)); }
function fail(msg) { console.error(red(`    ERR ${msg}`)); process.exit(1); }

function run(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch {
    process.exit(1);
  }
}

function which(cmd) {
  const result = spawnSync(isWindows ? 'where' : 'which', [cmd], { stdio: 'pipe' });
  return result.status === 0;
}

function ver(cmd) {
  try {
    return execSync(`${cmd} --version`, { stdio: 'pipe' }).toString().trim();
  } catch {
    return null;
  }
}

const RUBY_HINTS = {
  win32:  'Install from https://rubyinstaller.org/ (include the DevKit).',
  darwin: 'Install via Homebrew: brew install rbenv && rbenv install <version>',
  linux:  'Install via rbenv, asdf, or: sudo apt install ruby-full  (Debian/Ubuntu)',
};

console.log(`\nronelzb.github.io — first-time setup  [${os}/${arch()}]`);

// --- Prerequisites ---

step('Checking prerequisites');

if (!which('ruby')) fail(`Ruby not found. ${RUBY_HINTS[os] ?? RUBY_HINTS.linux}`);
ok(`Ruby:    ${ver('ruby')}`);

if (!which('bundle')) fail('Bundler not found. Run: gem install bundler');
try {
  ok(`Bundler: ${execSync('bundle -v', { stdio: 'pipe' }).toString().trim()}`);
} catch { fail('Could not determine Bundler version.'); }

if (!which('node')) fail('Node.js not found. Install from https://nodejs.org/ and re-run.');
ok(`Node:    ${ver('node')}`);

if (!which('npm')) fail('npm not found. Reinstall Node.js and re-run.');
ok(`npm:     ${ver('npm')}`);

// --- Ruby gems ---

step('Installing Ruby gems  (bundle install)');
run('bundle install');
ok('Gems installed');

// --- Node packages ---

step('Installing Node packages  (npm install)');
run('npm install');
ok('Node packages installed');

// --- Lint ---

step('Running lint to verify everything is wired up');
run('npm run lint');
ok('Lint passed');

// --- Done ---

console.log(`\nSetup complete. Run \x1b[33mnpm start\x1b[0m to launch the site at http://127.0.0.1:4000/\n`);

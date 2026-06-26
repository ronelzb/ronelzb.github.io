import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const postsCss = readFileSync(resolve(root, 'src/styles/posts.css'), 'utf-8');
const globalCss = readFileSync(resolve(root, 'src/styles/global.css'), 'utf-8');
const navAstro = readFileSync(resolve(root, 'src/components/Nav.astro'), 'utf-8');
const headAstro = readFileSync(resolve(root, 'src/components/Head.astro'), 'utf-8');
const toggleAstro = readFileSync(resolve(root, 'src/components/ThemeToggle.astro'), 'utf-8');
const astroCfg = readFileSync(resolve(root, 'astro.config.ts'), 'utf-8');

describe('Shiki dark-mode code block switching', () => {
  it('gives .astro-code a visible light-mode background (not white)', () => {
    expect(postsCss).toMatch(/\.astro-code\s*\{[^}]*background-color:\s*#f6f8fa/);
  });

  it('overrides to dark bg when [data-bs-theme=dark]', () => {
    expect(postsCss).toMatch(/data-bs-theme.*dark.*\.astro-code/);
    expect(postsCss).toContain('var(--shiki-dark-bg)');
  });

  it('switches token colours for spans in dark mode', () => {
    expect(postsCss).toMatch(/data-bs-theme.*dark.*\.astro-code span/);
    expect(postsCss).toContain('var(--shiki-dark)');
  });

  it('uses !important to beat Shiki inline styles', () => {
    const darkSection = postsCss.slice(postsCss.indexOf('data-bs-theme'));
    expect(darkSection).toContain('!important');
  });
});

describe('Inline code scoping', () => {
  it('styles only :not(pre) > code, never bare code selector', () => {
    expect(postsCss).toContain(':not(pre) > code');
    expect(postsCss).not.toMatch(/^code\s*\{/m);
  });
});

describe('Dark-mode media filters', () => {
  it('inverts codecogs images in dark mode', () => {
    expect(globalCss).toContain("img[src*='codecogs']");
    expect(globalCss).toContain('filter: invert(1)');
  });
});

describe('Above-fold image performance (audit)', () => {
  it('Nav logo is eager-loaded with fetchpriority=high', () => {
    expect(navAstro).toContain('loading="eager"');
    expect(navAstro).toContain('fetchpriority="high"');
  });

  it('rehypeEagerImages is wired into the markdown processor', () => {
    expect(astroCfg).toContain('rehypeEagerImages');
    expect(astroCfg).toContain('rehypePlugins');
    expect(astroCfg).toContain('processor:');
  });
});

describe('Theme initialisation (no FOUC)', () => {
  it('Head.astro init script sets data-bs-theme, data-theme and dark class', () => {
    expect(headAstro).toContain("setAttribute('data-bs-theme'");
    expect(headAstro).toContain("setAttribute('data-theme'");
    expect(headAstro).toContain("classList.toggle('dark'");
  });

  it('ThemeToggle updates all three theme signals on click', () => {
    expect(toggleAstro).toContain("setAttribute('data-bs-theme'");
    expect(toggleAstro).toContain("setAttribute('data-theme'");
    expect(toggleAstro).toContain("classList.toggle('dark'");
  });
});

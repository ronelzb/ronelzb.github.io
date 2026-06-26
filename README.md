# Ronel Zapata Blog

![version](https://img.shields.io/badge/Version-Prod-brightgreen)
![release](https://img.shields.io/badge/Release-2.0.0-blue)
![language](https://img.shields.io/badge/Language-TypeScript,Astro-brightgreen)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/ronelzb/ronelzb.github.io/blob/main/LICENSE)

Personal portfolio and blog built with [Astro 5](https://astro.build/) and TypeScript.
Originally adapted from
[Qiubaiying](https://github.com/qiubaiying/qiubaiying.github.io), with
inspiration from [ansegura7](https://github.com/ansegura7/ansegura7.github.io).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (24+) and npm

### First-time setup

```sh
npm run setup
```

Checks prerequisites, copies `.env.example` → `.env.local`, installs packages,
and runs a lint check.

### Development

```sh
npm run dev        # serve at http://localhost:4321 with live-reload
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run lint       # typecheck + JS + CSS + Markdown linters
npm run format     # auto-format with Prettier
```

To test from a mobile device on the same network, run:

```sh
npm run dev -- --host
```

Then find your local IP with `ipconfig` and browse to `http://<ip>:4321`.

## Configuration

Site metadata lives in `src/config.ts`. The `SITE_URL` environment variable must
be set at build time for canonical URLs, the sitemap, and the RSS feed to work:

```sh
SITE_URL=https://ronelzb.github.io npm run build
```

In CI this is provided automatically by the GitHub Pages `configure-pages` action.

## Tests

Tests run with [Vitest](https://vitest.dev/).

```sh
npm test              # run all tests once
npm run test:watch    # re-run on file changes
npm run test:coverage # coverage report
```

### What is tested

| Area              | Examples                                              |
| ----------------- | ----------------------------------------------------- |
| Content schema    | Frontmatter required fields, date coercion, tag types |
| Utility functions | Slug rewrite, excerpt truncation, tag deduplication   |
| Config            | `SITE` constant completeness, `NAV_PAGES` shape       |

Tests live in `tests/` at the repo root. New blog posts are validated
automatically against the content schema at build time by Astro's content
collections — no separate test needed for frontmatter correctness.

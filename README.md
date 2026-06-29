# Ronel Zapata — Personal Blog

[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/ronelzb/ronelzb.github.io/blob/main/LICENSE)

Personal portfolio and blog of a Senior Software Engineer with a background in
healthcare SaaS, oil & gas, and cloud-native systems. Built with
[Astro 5](https://astro.build/) and TypeScript.

## Setup

Requires [Node.js 24+](https://nodejs.org/) and npm.

```sh
npm run setup   # checks prerequisites, creates .env.local, installs packages
npm run dev     # http://localhost:4321
npm run test    # runs test suite
```

`SITE_URL` must be set at build time for canonical URLs, the sitemap, and RSS:

```sh
SITE_URL=https://ronelzb.github.io npm run build
```

In CI this is provided automatically by the GitHub Pages `configure-pages` action.

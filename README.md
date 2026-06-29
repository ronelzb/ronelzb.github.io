# Ronel Zapata — Personal Blog

[![Lint](https://github.com/ronelzb/ronelzb.github.io/actions/workflows/lint.yml/badge.svg)](https://github.com/ronelzb/ronelzb.github.io/actions/workflows/lint.yml)
[![Deploy](https://github.com/ronelzb/ronelzb.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/ronelzb/ronelzb.github.io/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro)](https://astro.build/)
[![Node.js](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs)](https://nodejs.org/)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/ronelzb/ronelzb.github.io/blob/main/LICENSE)

Personal portfolio and blog of a Senior Software Engineer with a background in
healthcare SaaS, oil & gas, and cloud-native systems.

## Setup

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

# Ronel Zapata Blog

![version](https://img.shields.io/badge/Version-Prod-brightgreen)
![release](https://img.shields.io/badge/Release-1.0.1-blue)
![language](https://img.shields.io/badge/Language-HTML,Ruby,JavaScript-brightgreen)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/ronelzb/ronelzb.github.io/blob/master/LICENSE)

This is my very first blog modified from
[Qiubaiying](https://github.com/qiubaiying/qiubaiying.github.io). A big
shoutout to my co-worker and friend Andres Segura which his blog template
helped building this one, you can check his
[ansegura7 blog](https://github.com/ansegura7/ansegura7.github.io). To Matt
Carmody for the great front-end ideas that led me to a very robust look-and-feel
and responsive oriented page. And last but not least, my wife Karla for being
my QA Tester.

## Getting Started

### Prerequisites

- [Ruby](https://rubyinstaller.org/) (4.0+ recommended) with the DevKit
- [Node.js](https://nodejs.org/) (20+) and npm

### First-time setup

Run the setup script — it checks prerequisites, installs all Ruby gems and Node
packages, and runs a lint check to confirm everything is wired up correctly:

```sh
npm run setup
```

### Development

```sh
npm start          # serve at http://127.0.0.1:4000 with live-reload
npm run lint       # run all linters (JS, CSS, Markdown)
npm run format     # auto-format with Prettier
bundle update      # update Ruby gems
```

To test from a mobile device on the same network:

```sh
bundle exec jekyll serve --host 0.0.0.0
```

Then `ipconfig`, find your local IP, and browse to `http://<ip>:4000` from your
device.

## Configuration

Customize the site by editing `_config.yml`:

```yaml
title: Ronel Zapata personal website
SEOTitle: Ronel Zapata personal website | RZ Blog
description: 'Page description'
github_username: ronelzb
paginate: 10
```

Full reference: [Jekyll configuration docs](https://jekyllrb.com/docs/configuration/).

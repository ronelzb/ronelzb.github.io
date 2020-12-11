
# Ronel Zapata Blog

<!-- ![Alt](https://raw.githubusercontent.com/ronelzb/ronelzb.github.io/master/img/readme-home.png "Ronel Zapata Blog") -->

[![Build Status](https://travis-ci.org/ronelzb/ronelzb.github.io.svg?branch=master)](https://travis-ci.org/ronelzb/ronelzb.github.io)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/home-assistant/home-assistant-iOS/blob/master/LICENSE)

This is my very first blog modified from [Qiubaiying](https://github.com/qiubaiying/qiubaiying.github.io).

## Getting Started

1. You will need [Ruby](https://www.ruby-lang.org/en/) and [Bundler](https://bundler.io/) to use [Jekyll](https://jekyllrb.com/). Following [Using Jekyll with Bundler](https://jekyllrb.com/tutorials/using-jekyll-with-bundler/) to fullfill the enviromental requirement.

2. Installed dependencies in the `Gemfile`:

    ```sh
    bundle install
    ```

3. Serve the website (`localhost:4000` by default):

    ```sh
    bundle exec jekyll serve  # alternatively, npm start
    ```

## Configuration

To start customizing your own blog simply start by modifying the file in general: `_config.yml`.

```md
### Site settings
title: Ronel Zapata personal website
SEOTitle: Ronel Zapata personal website | RZ Blog
description: "Page description"

### SNS settings
github_username: ronelzb

### Build settings
paginate: 10
```

You can also check the whole list of configuration attributes at: [Jekyll - Official Site](http://jekyllrb.com/).

## Implementation

If you have [jekyll](http://jekyllcn.com/) installed, you only need to enter it on the command line or you can enter a preview theme in your local browser, and changes to the theme can be shown in real time (you'll need to refresh your browser for each change made).`jekyll serve` `jekyll s` `http://127.0.0.1:4000/`.

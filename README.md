
# Ronel Zapata Blog

![version](https://img.shields.io/badge/Version-Test-yellow)
![release](https://img.shields.io/badge/Release-0.1.0-blue)
![language](https://img.shields.io/badge/Language-HTML,Ruby,JavaScript-brightgreen)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/ronelzb/ronelzb.github.io/blob/master/LICENSE)

This is my very first blog modified from [Qiubaiying](https://github.com/qiubaiying/qiubaiying.github.io). A big shoutout to my co-worker and friend Andres Segura which his blog template helped building this one, you can check his blog [here](https://github.com/ansegura7/ansegura7.github.io). And last but not least Matt Carmody for the great front-end ideas that led me to a very robust look-and-feel and responsive oriented page.

## Getting Started

1. You will need [Ruby](https://www.ruby-lang.org/en/) and [Bundler](https://bundler.io/) to use [Jekyll](https://jekyllrb.com/). Following [Using Jekyll with Bundler](https://jekyllrb.com/tutorials/using-jekyll-with-bundler/) to fullfill the enviromental requirement.

2. Install dependencies in the `Gemfile`:

    ```sh
    bundle install
    ```

3. Serve the website (`localhost:4000` by default):

    ```sh
    bundle exec jekyll serve  # alternatively, npm start
    ```

    Alternatively, you can serve the website to your whole private network using the following command (very useful if you want to test your site from a mobile browser, port is set to `4000` by default):

    ```sh
    bundle exec jekyll serve --host 0.0.0.0
    ```

    Then `ipconfig` from the computer your serving and browse from your mobile to  `http://ip address:port`, depending on your local network, e.g: `http://192.168.XXX.YYY:4000`.

4. Update your gems frequently:

    ```sh
    bundle update
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

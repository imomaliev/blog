---
title: "The strongest principle of the blog's growth lies in the human choice to deploy it"
date: 2022-08-27T15:46:36+07:00
draft: false
tags: ["hugo", "terraform", "github-actions", "github-pages"]
---

> _The strongest principle of growth lies in the human choice_[^1]

## Build Hugo With GitHub Action

It is time to put our blog on the internet. [Source code](https://github.com/imomaliev/blog) is stored on GitHub so hosting it on the [GitHub Pages](https://pages.github.com) seems like easiest way to achive that. Good starting point will be just using [official Hugo docs](https://gohugo.io/hosting-and-deployment/hosting-on-github).

My plan is to use my own domain name instead of provided one and also we will need to configure our workflow to properly build TailwindCSS which is used in this project.

### Workflow from example

Documentation provides example workflow file that uses [Hugo setup](https://github.com/marketplace/actions/hugo-setup) action in the "Build Hugo With GitHub Action" section. It is ok to use it, but I will use combination of 2 examples from [Hugo setup's README](https://github.com/peaceiris/actions-hugo#%EF%B8%8F-create-your-workflow) because it has [example for projects using PostCSS](https://github.com/peaceiris/actions-hugo#%EF%B8%8F-workflow-for-autoprefixer-and-postcss-cli).

```yaml
name: GitHub Pages

on:
    push:
        branches:
            - main # Set a branch to deploy
    pull_request:

jobs:
    deploy:
        runs-on: ubuntu-20.04
        concurrency:
            group: ${{ github.workflow }}-${{ github.ref }}
        steps:
            - uses: actions/checkout@v3
              with:
                  submodules: true # Fetch Hugo themes (true OR recursive)
                  fetch-depth: 0 # Fetch all history for .GitInfo and .Lastmod

            - name: Setup Hugo
              uses: peaceiris/actions-hugo@v2
              with:
                  hugo-version: "0.91.2"
                  # extended: true

            - name: Setup Node
              uses: actions/setup-node@v3
              with:
                  node-version: "14"

            - name: Cache dependencies
              uses: actions/cache@v2
              with:
                  path: ~/.npm
                  key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
                  restore-keys: |
                      ${{ runner.os }}-node-

            - run: npm ci

            - name: Build
              run: hugo --minify

            - name: Deploy
              uses: peaceiris/actions-gh-pages@v3
              if: ${{ github.ref == 'refs/heads/main' }}
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  publish_dir: ./public
```

### Configuring workflow for our project

https://github.com/peaceiris/actions-hugo/pull/602

## Links

-   https://github.com/imomaliev/blog
-   https://gohugo.io/hosting-and-deployment/hosting-on-github/
-   https://pages.github.com
-   https://github.com/marketplace/actions/hugo-setup
-   https://github.com/peaceiris/actions-hugo#%EF%B8%8F-create-your-workflow
-   https://github.com/peaceiris/actions-hugo#%EF%B8%8F-workflow-for-autoprefixer-and-postcss-cli

[^1]: [Quote by George Eliot](https://www.brainyquote.com/quotes/george_eliot_382778)

---
title: "The strongest principle of the blog's growth lies in the human choice to deploy it"
date: 2022-08-27T15:46:36+07:00
draft: false
tags: ["hugo", "terraform", "github-actions", "github-pages"]
---

> _The strongest principle of growth lies in the human choice_[^1]

## Build Hugo With GitHub Action

It is time to put our blog on the internet. [Source code](https://github.com/imomaliev/blog) is stored on GitHub, so hosting it on the [GitHub Pages](https://pages.github.com) seems like the easiest way to achieve that. A good starting point will be just using [official Hugo docs](https://gohugo.io/hosting-and-deployment/hosting-on-github).

We will need to configure our workflow to properly build TailwindCSS which is used in this project, and also I would like to use my own domain name instead of provided one.

### Workflow from example

Documentation provides an example workflow file that uses [GitHub Actions for Hugo](https://github.com/marketplace/actions/hugo-setup) action in the "Build Hugo With GitHub Action" section. It is ok to use it, but I will use combination of 2 examples ([1](https://github.com/peaceiris/actions-hugo#%EF%B8%8F-create-your-workflow), [2](https://github.com/peaceiris/actions-hugo#%EF%B8%8F-workflow-for-autoprefixer-and-postcss-cli)) from GitHub Actions for Hugo's README because it has one for projects using PostCSS.

<!-- https://github.com/prettier/prettier/issues/7666 -->
<!-- prettier-ignore -->
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
                  hugo-version: '0.91.2'
                  # extended: true

            - name: Setup Node
              uses: actions/setup-node@v3
              with:
                  node-version: '14'

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

We will save it as `.github/workflows/gh-pages.yaml`. **NOTE:** I prefer using `yaml` extension instead of `yml`[^2]

### Updating workflow to make it work in our project

The workflow file I copied from GitHub Actions for Hugo action wouldn't work for our project structure. Additionally, I would like to make some improvements. Mainly

-   Add comments for the parts that are new to me or may be confusing in the future
-   Add links to documentation for used actions
-   Update and freeze actions' and packages' versions. I decided to use the same versions that I am using locally.
-   Add `working-directory: ./blog` [option](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun) to jobs because actual blog source files not located in the root of the project, but in the `blog/` directory.
-   Remove unused parts of the workflow

but some changes may not be so obvious, so let's discuss them

#### Using setup-node action's cache option

In the copied example, npm caching is done via [`actions/cache@v2`](https://github.com/actions/cache) action. But we can simplify our workflow by dropping this step and using [built-in functionality for caching](https://github.com/actions/setup-node#caching-global-packages-data)

```diff
diff --git a/.github/workflows/gh-pages.yaml b/.github/workflows/gh-pages.yaml
index 401fd33..3ddf6dd 100644
--- a/.github/workflows/gh-pages.yaml
+++ b/.github/workflows/gh-pages.yaml
@@ -26,18 +26,17 @@ jobs:
                   hugo-version: '0.91.2'
                   # extended: true

+            # https://github.com/actions/setup-node
             - name: Setup Node
               uses: actions/setup-node@v3
               with:
-                  node-version: '14'
-
-            - name: Cache dependencies
-              uses: actions/cache@v2
-              with:
-                  path: ~/.npm
-                  key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
-                  restore-keys: |
-                      ${{ runner.os }}-node-
+                  node-version: '18.7.0'
+                  cache: npm
+                  # The action defaults to search for the dependency file (package-lock.json,
+                  # npm-shrinkwrap.json or yarn.lock) in the repository root, and uses its
+                  # hash as a part of the cache key.
+                  # https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md#caching-packages-data
+                  cache-dependency-path: ./blog/package-lock.json
```

I thought that this change will be useful for all "Setup Hugo" users, so I've created [PR with these changes](https://github.com/peaceiris/actions-hugo/pull/602) to update action's example. PR was accepted right away.

![setup hugo PR](./setup-hugo-pr.png)

so if you follow the same steps as I did, you will not have to do this manually 😎.

#### Building blog in node environment

For some reason, when the blog built normally via `hugo --minify` PostCSS does not pick up TailwindCSS's styles. I solve this by running `hugo server` and build from NPM's environment via custom `npm run build` script.

```diff
diff --git a/.github/workflows/gh-pages.yaml b/.github/workflows/gh-pages.yaml
index 401fd33..3ddf6dd 100644
--- a/.github/workflows/gh-pages.yaml
+++ b/.github/workflows/gh-pages.yaml
@@ -39,10 +39,13 @@ jobs:
                   restore-keys: |
                       ${{ runner.os }}-node-

-            - run: npm ci
+            - name: Install npm dependencies
+              working-directory: ./blog/
+              run: npm ci

             - name: Build
-              run: hugo --minify
+              working-directory: ./blog/
+              run: npm run build

             - name: Deploy
               uses: peaceiris/actions-gh-pages@v3
diff --git a/blog/package.json b/blog/package.json
index 4a4876d..49334d7 100644
--- a/blog/package.json
+++ b/blog/package.json
@@ -1,6 +1,7 @@
 {
   "scripts": {
-    "start": "hugo --source src server --baseURL http://localhost/"
+    "start": "hugo --source src server --baseURL http://localhost/",
+    "build": "hugo --source src --minify"
   },
   "devDependencies": {
     "@tailwindcss/typography": "^0.5.4",
```

#### Use Ubuntu 22.04

You also may have noticed that we are using Ubuntu 22.04. On August 9, 2022 this version become [generally available](https://github.blog/changelog/2022-08-09-github-actions-ubuntu-22-04-is-now-generally-available-on-github-hosted-runners/).

I started by using `runs-on: ubuntu-22.04` in this workflow to check if everything works ok. It run without any issues. After that I created PRs to add support for `ubuntu-22.04` and `ubuntu-latest` version to [GitHub Actions for Hugo](https://github.com/peaceiris/actions-hugo/pull/603) and [GitHub Pages Action](https://github.com/peaceiris/actions-gh-pages/pull/776)

#### Final diff of changes

```diff
diff --git a/.github/workflows/gh-pages.yaml b/.github/workflows/gh-pages.yaml
index 401fd33..3ddf6dd 100644
--- a/.github/workflows/gh-pages.yaml
+++ b/.github/workflows/gh-pages.yaml
@@ -11,42 +11,48 @@ on:

 jobs:
     deploy:
-        runs-on: ubuntu-20.04
+        runs-on: ubuntu-22.04
+        # Ensure that only a single job or workflow
+        # https://docs.github.com/en/actions/using-jobs/using-concurrency
         concurrency:
+            # workflow - The name of the workflow.
+            # ref - The branch or tag ref that triggered the workflow run.
             group: ${{ github.workflow }}-${{ github.ref }}
         steps:
             - uses: actions/checkout@v3
               with:
-                  submodules: true # Fetch Hugo themes (true OR recursive)
                   fetch-depth: 0 # Fetch all history for .GitInfo and .Lastmod

+            # https://github.com/peaceiris/actions-hugo
             - name: Setup Hugo
               uses: peaceiris/actions-hugo@v2
               with:
-                  hugo-version: '0.91.2'
-                  # extended: true
+                  hugo-version: '0.101.0'

+            # https://github.com/actions/setup-node
             - name: Setup Node
               uses: actions/setup-node@v3
               with:
-                  node-version: '14'
-
-            - name: Cache dependencies
-              uses: actions/cache@v2
-              with:
-                  path: ~/.npm
-                  key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
-                  restore-keys: |
-                      ${{ runner.os }}-node-
-
-            - run: npm ci
+                  node-version: '18.7.0'
+                  cache: npm
+                  # The action defaults to search for the dependency file (package-lock.json,
+                  # npm-shrinkwrap.json or yarn.lock) in the repository root, and uses its
+                  # hash as a part of the cache key.
+                  # https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md#caching-packages-data
+                  cache-dependency-path: ./blog/package-lock.json
+
+            - name: Install npm dependencies
+              working-directory: ./blog/
+              run: npm ci

             - name: Build
-              run: hugo --minify
+              working-directory: ./blog/
+              run: npm run build

+            # https://github.com/peaceiris/actions-gh-pages
             - name: Deploy
               uses: peaceiris/actions-gh-pages@v3
               if: ${{ github.ref == 'refs/heads/main' }}
               with:
                   github_token: ${{ secrets.GITHUB_TOKEN }}
-                  publish_dir: ./public
+                  publish_dir: ./blog/src/public
```

## Deploy to GitHub Pages

The workflow we added will create `gh-pages` branch in our repo automatically after the first run. All that left to do is to update repository configuration to use this branch for [GitHub Pages](https://pages.github.com). By default, Pages should pick up and deploy files from the `gh-pages` branch, but due to `GITHUB_TOKEN` limitation we need to set Pages's branch manually. Read more in the [GitHub Pages Action's docs](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-first-deployment-with-github_token).

I wanted to configure GitHub Pages using terraform because this project already uses it to configure this repository. But currently, due to how GitHub provider for terraform is written, configuring Pages [requires some fiddling](https://github.com/integrations/terraform-provider-github/issues/782) and will not work on the first run. During my research into how I could achieve declarative configuration for Pages, I found out that [GitHub recently added](https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/) actions that allow deploying to Pages without additional branch. I like this [new approach](https://github.com/actions/starter-workflows/blob/main/pages/hugo.yml) better and in the future I will switch to it, but for now I decided to configure Pages manually as suggested by GitHub Pages Action that we are using.

## Bugs

There are few bugs that I stumbled upon while applying these changes to my blog and writing about them

### YAML multistring rendering

> **Update** this was fixed in [v0.111.0](https://github.com/gohugoio/hugo/releases/tag/v0.111.0) release.

While I was re-reading this article to find issues in my spelling. I noticed something weird
![chroma-bug](./chroma-bug.png)
this is definitely a bug. I started looking into it. At first, I thought the issue is in Hugo itself, but after trying to [make minimal reproducible example](https://en.wikipedia.org/wiki/Minimal_reproducible_example) I was falling deeper and deeper in the rabbithole of dependencies. Turns out the issue was 4 layers deep.

[Hugo](https://github.com/gohugoio/hugo) -> [goldmark](https://github.com/yuin/goldmark) -> [goldmark-highlighting](https://github.com/yuin/goldmark-highlighting) -> [chroma](https://github.com/alecthomas/chroma)

And there is already a [bug report](https://github.com/alecthomas/chroma/issues/475).

```yaml
key: |
    value
```

I may have tried to fix it, but I think it may take way too much time because I do not have any experience with Go. So, I will leave this issue as is for now. Maybe in the future it will be a fun project to practice Go development.

### baseURL causing images with leading `/` render incorrectly

I noticed that after deployment images were broken after further research it became clear that this happens because we are using `baseURL` with path - https://imomaliev.github.io/blog/. This is [known behavior](https://github.com/gohugoio/hugo/issues/8078). It does look like a bug to me, but maintainers decided to close this issue as ["wontfix"](https://github.com/gohugoio/hugo/issues/8078#issuecomment-748561750) for now. In the future, I am planning to host this blog on my domain without additional path in `baseURL`, but for now I fixed it by using relative paths instead ones starting with leading `/`.

```diff
-![setup hugo PR](/building-the-blog-while-flying-it/07-the-strongest-principle-of-the-blogs-growth-lies-in-the-human-choice-to-deploy-it/setup-hugo-pr.png)
+![setup hugo PR](./setup-hugo-pr.png)
```

So, another future exercise for myself will be to bring this issue to proper resolution in Hugo itself.

## No custom domain for now

This article is already becoming pretty big, I think we will switch this blog to use custom domain in some other time. My plan is to do this via terraform as well, so stay tuned for this series.

## Links

-   https://github.com/imomaliev/blog
-   https://gohugo.io/hosting-and-deployment/hosting-on-github/
-   https://pages.github.com
-   https://github.com/marketplace/actions/hugo-setup
-   https://github.com/peaceiris/actions-hugo#%EF%B8%8F-create-your-workflow
-   https://github.com/peaceiris/actions-hugo#%EF%B8%8F-workflow-for-autoprefixer-and-postcss-cli
-   https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun
-   https://github.com/actions/cache
-   https://github.com/actions/setup-node#caching-global-packages-data
-   https://github.com/peaceiris/actions-hugo/pull/602
-   https://github.blog/changelog/2022-08-09-github-actions-ubuntu-22-04-is-now-generally-available-on-github-hosted-runners/
-   https://github.com/peaceiris/actions-hugo/pull/603
-   https://github.com/peaceiris/actions-gh-pages/pull/776
-   https://en.wikipedia.org/wiki/Minimal_reproducible_example
-   https://github.com/gohugoio/hugo
-   https://github.com/yuin/goldmark
-   https://github.com/yuin/goldmark-highlighting
-   https://github.com/alecthomas/chroma/issues/475
-   https://pages.github.com
-   https://github.com/integrations/terraform-provider-github/issues/782
-   https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/
-   https://github.com/actions/starter-workflows/blob/main/pages/hugo.yml
-   https://github.com/gohugoio/hugo/issues/8078
-   https://github.com/gohugoio/hugo/issues/8078#issuecomment-748561750

[^1]: [Quote by George Eliot](https://www.brainyquote.com/quotes/george_eliot_382778)
[^2]: [Please use ".yaml" when possible.](https://yaml.org/faq.html)

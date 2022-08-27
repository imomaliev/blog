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

We will save it as `.github/workflows/gh-pages.yaml`. **Note** I preffer using `yaml` extension instead of `yml`[^2]

### Updating workflow for our project

Example workflow file I copied from Hugo setup action wouldn't work for our project structure. Also I would like to add some improvements. Mainly

-   Add comments for the parts that I do not know or may be confusing in the future
-   Add links to used custom actions' documentation
-   Update and freeze actions and packages versions. I decided to use the same versions that I am using locally.
-   Add `working-directory: ./blog` [option](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun) to jobs because actual blog source files not located in the root of the project, but in the `blog/` directory.

but some changes may not be so obvious so let's discussus them

### Using setup-node action's cache option

In the copied example npm caching is done via [`actions/cache@v2`](https://github.com/actions/cache) action. But we can simplify our workflow by dropping this step and using [built-in functionality for caching](https://github.com/actions/setup-node#caching-global-packages-data)

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

Let's start updating workflow file to work with our project structure. Here is a diff of changes I did.

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

https://github.com/peaceiris/actions-hugo/pull/602

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

[^1]: [Quote by George Eliot](https://www.brainyquote.com/quotes/george_eliot_382778)
[^2]: [Please use ".yaml" when possible.](https://yaml.org/faq.html)

---
title: "Tailwind in Your Buns"
date: "2026-02-01T15:03:44Z"
tags: ["hugo", "tailwindcss", "bun", "github-actions"]
---

My background is mostly in backend development; frontend is not my forte, but when I tried [TailwindCSS](https://tailwindcss.com/) in one of my previous projects, I really liked it. I decided to use it in my blog as well.

Like before, I will start by going through the [official guide](https://gohugo.io/functions/css/tailwindcss/). 

## Installing TailwindCSS

The guide says to install TailwindCSS via npm but I am going to use [Bun](https://bun.sh/) instead.

```console
$ bun install --dev tailwindcss @tailwindcss/cli
```

## Update site's .gitignore

Because the site folder will also contain files for Bun, I need to ensure that `.gitignore` includes configuration for it as well. If you are creating a new project via `bun init`, you get [gitignore](https://github.com/oven-sh/bun/blob/main/src/cli/init/gitignore.default) added as your `.gitignore`. But in our case, because we are using `bun install` it won't be added. So I will be adding it manually.

```diff
diff --git a/site/.gitignore b/site/.gitignore
index a6e26ad..517d145 100644
--- a/site/.gitignore
+++ b/site/.gitignore
@@ -1,3 +1,4 @@
+# Hugo
 # Copied from: https://github.com/github/gitignore/blob/main/community/Golang/Hugo.gitignore
 # License: CC0 1.0 Universal
 
@@ -14,3 +15,42 @@ hugo.linux
 
 # Temporary lock file while building
 /.hugo_build.lock
+
+# Bun
+# Copied from: https://github.com/oven-sh/bun/blob/main/src/cli/init/gitignore.default
+# License: MIT
+
+# dependencies (bun install)
+node_modules
+
+# output
+out
+dist
+*.tgz
+
+# code coverage
+coverage
+*.lcov
+
+# logs
+logs
+_.log
+report.[0-9]_.[0-9]_.[0-9]_.[0-9]_.json
+
+# dotenv environment variable files
+.env
+.env.development.local
+.env.test.local
+.env.production.local
+.env.local
+
+# caches
+.eslintcache
+.cache
+*.tsbuildinfo
+
+# IntelliJ based IDEs
+.idea
+
+# Finder (MacOS) folder config
+.DS_Store
```

## Update site's configuration
 
Paste the code provided in Step 2.

```diff
diff --git a/site/hugo.toml b/site/hugo.toml
index 1087dd9..8e24de2 100644
--- a/site/hugo.toml
+++ b/site/hugo.toml
@@ -7,6 +7,23 @@ title = 'Blog'
 
   [[module.imports]]
     path = 'github.com/imomaliev/blog/theme'
+  [[module.mounts]]
+    source = 'assets'
+    target = 'assets'
+  [[module.mounts]]
+    disableWatch = true
+    source = 'hugo_stats.json'
+    target = 'assets/notwatching/hugo_stats.json'
+
+[build]
+  [build.buildStats]
+    enable = true
+  [[build.cachebusters]]
+    source = 'assets/notwatching/hugo_stats\.json'
+    target = 'css'
+  [[build.cachebusters]]
+    source = '(postcss|tailwind)\.config\.js'
+    target = 'css'
 
 [caches]
   [caches.images]
```

## Update CSS entry file

Step 3 asks to create a new CSS file, but my theme already has `main.css`. So I will be updating it instead.

```diff
diff --git a/theme/assets/css/main.css b/theme/assets/css/main.css
index 166ade9..cae7ba4 100644
--- a/theme/assets/css/main.css
+++ b/theme/assets/css/main.css
@@ -1,3 +1,6 @@
+@import "tailwindcss";
+@source "hugo_stats.json";
+
 body {
   color: #222;
   font-family: sans-serif;
```

## Process CSS with TailwindCSS CLI

Update `theme/layouts/_partials/head/css.html` with code from Step 4.

```diff
diff --git a/theme/layouts/_partials/head/css.html b/theme/layouts/_partials/head/css.html
index d76d23a..075e64e 100644
--- a/theme/layouts/_partials/head/css.html
+++ b/theme/layouts/_partials/head/css.html
@@ -1,9 +1,12 @@
 {{- with resources.Get "css/main.css" }}
-  {{- if hugo.IsDevelopment }}
-    <link rel="stylesheet" href="{{ .RelPermalink }}">
-  {{- else }}
-    {{- with . | minify | fingerprint }}
-      <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
+  {{- $opts := dict "minify" (not hugo.IsDevelopment) }}
+  {{- with . | css.TailwindCSS $opts }}
+    {{- if hugo.IsDevelopment }}
+      <link rel="stylesheet" href="{{ .RelPermalink }}">
+    {{- else }}
+      {{- with . | fingerprint }}
+        <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
+      {{- end }}
     {{- end }}
   {{- end }}
 {{- end }}
```

Update `theme/layouts/_partials/head.html` with code from Step 5.

```diff
diff --git a/theme/layouts/_partials/head.html b/theme/layouts/_partials/head.html
index 02c2240..13f1cd6 100644
--- a/theme/layouts/_partials/head.html
+++ b/theme/layouts/_partials/head.html
@@ -1,5 +1,7 @@
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width">
 <title>{{ if .IsHome }}{{ site.Title }}{{ else }}{{ printf "%s | %s" .Title site.Title }}{{ end }}</title>
-{{ partialCached "head/css.html" . }}
+{{ with (templates.Defer (dict "key" "global")) }}
+  {{ partial "head/css.html" . }}
+{{ end }}
 {{ partialCached "head/js.html" . }}
```

TailwindCSS is installed and configured.

## Install Typography plugin

One of the reasons I prefer using TailwindCSS is its [typography plugin](https://github.com/tailwindlabs/tailwindcss-typography).

```console
$ bun install --dev @tailwindcss/typography
```

And add plugin to `theme/assets/css/main.css`

```diff
diff --git a/theme/assets/css/main.css b/theme/assets/css/main.css
index cae7ba4..66b0f49 100644
--- a/theme/assets/css/main.css
+++ b/theme/assets/css/main.css
@@ -1,5 +1,6 @@
 @import "tailwindcss";
 @source "hugo_stats.json";
+@plugin "@tailwindcss/typography";

 body {
   color: #222;
```

## Update workflow to use Bun instead of Node

Bun provides an official GitHub Action and the [guide](https://bun.com/docs/guides/runtime/cicd) how to use it. I've gone through `.github/workflows/hugo.yaml` and updated it to use Bun instead of Node.js

```diff
diff --git a/.github/workflows/hugo.yaml b/.github/workflows/hugo.yaml
index d8cc26d..a240bb0 100644
--- a/.github/workflows/hugo.yaml
+++ b/.github/workflows/hugo.yaml
@@ -23,7 +23,7 @@ jobs:
     env:
       GO_VERSION: 1.25.5
       HUGO_VERSION: 0.154.4
-      NODE_VERSION: 24.12.0
+      BUN_VERSION: 1.3.7
       TZ: Europe/Oslo
     steps:
       - name: Checkout
@@ -36,10 +36,10 @@ jobs:
         with:
           go-version: ${{ env.GO_VERSION }}
           cache: false
-      - name: Setup Node.js
-        uses: actions/setup-node@v6
+      - name: Setup Bun
+        uses: oven-sh/setup-bun@v2
         with:
-          node-version: ${{ env.NODE_VERSION }}
+          bun-version: ${{ env.BUN_VERSION }}
       - name: Setup Pages
         id: pages
         uses: actions/configure-pages@v5
@@ -57,10 +57,11 @@ jobs:
         run: |
           echo "Go: $(go version)"
           echo "Hugo: $(hugo version)"
-          echo "Node.js: $(node --version)"
-      - name: Install Node.js dependencies
+          echo "Bun: $(bun --version)"
+      - name: Install Bun dependencies
         run: |
-          [[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true
+          cd site/
+          [[ -f bun.lock ]] && bun install --frozen-lockfile || true
       - name: Configure Git
         run: |
           git config core.quotepath false
```

The setup is complete; we are ready to style our site.

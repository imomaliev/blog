---
title: "Hugo No Theme"
date: 2022-07-17T20:23:58+07:00
draft: false
tags: ["hugo", "blog", "pre-commit", "editorconfig"]
---

# Using Hugo without theme

In [quick start](https://gohugo.io/getting-started/quick-start/) guide and many online tutorials, new projects are advised to use one of the existing themes or create a new one. But after reading official docs, I've decided not to use any theme in my [previous blog version](https://github.com/imomaliev/blog-v1). I am going to do the same for this new project. If in the future some of my functionality will look like it could be decoupled from the blog, I will create a theme but for now, I do not see any need for one.

# How to start Hugo project without a theme

It is actually pretty easy. First, you need to understand how hugo [project structure](https://gohugo.io/getting-started/directory-structure/) works. Basically, hugo will look for needed files in the root folder and if it can't find them, it will try to look them up in the theme folder. Most of the themes provide us with `archetypes`, `assets`, `layouts` and `static` folders. For example, If we create a new theme with `hugo new theme` we will get this directory structure.

```console
themes/theme
├── LICENSE
├── archetypes
│   └── default.md
├── layouts
│   ├── 404.html
│   ├── _default
│   │   ├── baseof.html
│   │   ├── list.html
│   │   └── single.html
│   ├── index.html
│   └── partials
│       ├── footer.html
│       ├── head.html
│       └── header.html
├── static
│   ├── css
│   └── js
└── theme.toml
```

As you can see it, most of the files created by cli are in `layouts` folder, so we just can copy it to our root. This will provide use with basic scaffold for our project.

# Configure pre-commit and editorconfig to format hugo templates

If you've read previous blog posts in this series, you may have noticed that I use `pre-commit` and `editorconfig` to ensure that all files in the project are validated and autoformated. To add support for `gohtml` file type, we are going to use [`prettier-plugin-go-template`](https://www.npmjs.com/package/prettier-plugin-go-template).

Configure `pre-commit`by adding this plugin to `additional_dependencies`.

```diff
diff --git a/.pre-commit-config.yaml b/.pre-commit-config.yaml
index ca47c31..3e5cfef 100644
--- a/.pre-commit-config.yaml
+++ b/.pre-commit-config.yaml
@@ -22,7 +22,10 @@ repos:
       rev: v2.7.1
       hooks:
           - id: prettier
-            types_or: [yaml, markdown, json]
+            types_or: [yaml, markdown, json, html]
+            additional_dependencies:
+                - "prettier@2.7.1"
+                - "prettier-plugin-go-template@0.0.13"
     - repo: https://github.com/antonbabenko/pre-commit-terraform
       rev: v1.74.1
       hooks:
```

note, we also need to add `prettier` itself too because usually JavaScript hooks use `additional_dependencies` to install libraries that hook uses, here is [example](https://github.com/pre-commit/mirrors-prettier/blob/main/.pre-commit-hooks.yaml)

And after that update `.prettierrc.yaml` following instructions from official README

```diff
diff --git a/.prettierrc.yaml b/.prettierrc.yaml
index f96ee19..22fe08f 100644
--- a/.prettierrc.yaml
+++ b/.prettierrc.yaml
@@ -11,3 +11,10 @@ overrides:
           - "*.md"
       options:
           tabWidth: 4
+    # https://github.com/NiklasPor/prettier-plugin-go-template
+    - files:
+          - "blog/src/layouts/**/*.html"
+      options:
+          parser: go-template
+          tabWidth: 4
+          printWidth: 88
```

Finally, we are going to add `html` to `.editorconfig`. And we are done.

# Extra

There is also another `gohtml` file type formatter, you can find it here [https://github.com/Riverside-Healthcare/djlint](https://github.com/Riverside-Healthcare/djlint).

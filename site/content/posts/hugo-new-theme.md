---
date: "2025-10-07T22:52:34+01:00"
draft: true
title: Hugo New Theme
---

## `hugo new theme`

https://gohugo.io/getting-started/directory-structure/#theme-skeleton

```console
$ pwd
~/Workspace/blog
$ tree
.
└── site
    ├── archetypes
    │   └── default.md
    ├── assets
    ├── content
    ├── data
    ├── hugo.toml
    ├── i18n
    ├── layouts
    ├── static
    └── themes

10 directories, 2 files
$
$ hugo new theme theme
$ mv themes/theme theme
$ rmdir themes
$ git add theme/
$ git commit -m 'hugo new theme'
```
## Enable theme

```console
$ cd site/themes/
$ ln -s ../../theme 
# NOTE: we need to create relative link inside the target directory, otherwise it will not work: Need TIL for that
$ git add site/themes/
$ echo "theme = 'theme'" >> site/hugo.toml
$ git commit -m 'set current theme'
$ tree
.
├── site
│   ├── archetypes
│   │   └── default.md
│   ├── assets
│   ├── content
│   ├── data
│   ├── hugo.toml
│   ├── i18n
│   ├── layouts
│   ├── static
│   └── themes
│       └── theme -> ../../theme
└── theme
    ├── archetypes
    │   └── default.md
    ├── assets
    │   ├── css
    │   │   └── main.css
    │   └── js
    │       └── main.js
    ├── content
    │   ├── _index.md
    │   └── posts
    │       ├── _index.md
    │       ├── post-1.md
    │       ├── post-2.md
    │       └── post-3
    │           ├── bryce-canyon.jpg
    │           └── index.md
    ├── data
    ├── hugo.toml
    ├── i18n
    ├── layouts
    │   ├── _partials
    │   │   ├── footer.html
    │   │   ├── head
    │   │   │   ├── css.html
    │   │   │   └── js.html
    │   │   ├── head.html
    │   │   ├── header.html
    │   │   ├── menu.html
    │   │   └── terms.html
    │   ├── baseof.html
    │   ├── home.html
    │   ├── page.html
    │   ├── section.html
    │   ├── taxonomy.html
    │   └── term.html
    └── static
        └── favicon.ico

24 directories, 27 files
```

+++
date = '2025-10-07T22:50:04+01:00'
draft = true
title = 'Hugo New Site'
+++

## `hugo new site`

```console
$ pwd
~/Workspace/blog
$ hugo new site site
$ git add site
$ git commit -m 'hugo new site'
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
```

## Setup .gitignore

https://github.com/github/gitignore/blob/main/community/Golang/Hugo.gitignore

```
$ echo '# https://github.com/github/gitignore/blob/main/community/Golang/Hugo.gitignore\n' > site/.gitignore
$ curl https://raw.githubusercontent.com/github/gitignore/refs/heads/main/community/Golang/Hugo.gitignore >> site/.gitignore
$ git add site/.gitignore
$ git commit -m 'add .gitignore for hugo'
```

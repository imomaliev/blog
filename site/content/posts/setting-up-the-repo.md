---
date: "2025-10-07T22:32:31+01:00"
draft: true
title: Setting Up the Repo
---

## I will follow tutorial but do it my way

1. Follow to the tee https://gohugo.io/getting-started/quick-start/, with one distinction create theme inside blog

## Create empty repo

```console
$ mkdir blog && cd blog
$ git init
```

## Create initial commit

```console
$ git commit --allow-empty -m 'empty initial commit'
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: no email was given and auto-detection is disabled
```

### `git commit --allow-empty -m "empty initial commit"`

https://www.garfieldtech.com/blog/git-empty-commit
https://stackoverflow.com/a/14630424/3627387
https://stackoverflow.com/a/23000315/3627387

Why?

1. It just better convention in case you want to rewrite history from the begging or you want to split initial commit into separate ones
1. Control your git repo by creating it yourself, instead of letting source code hosting do it for you

Yes in most cases you can do `git rebase -i --root`, but this won't work if you need to do 1.

```console
git commit --allow-empty -m "empty initial commit"
$ tree -aL 1
.
└── .git

2 directories, 0 files
```

## Create GitHub repo

https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository

```console
$ git remote add origin git@github.com:imomaliev/blog.git
$ git push -u origin main
```


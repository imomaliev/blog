---
title: "Git | Setup Workrtree"
date: 2021-07-28T14:39:31+07:00
tags: ["git"]
---

# Git | Setup worktree

## Question

What is the best way to setup git worktree?

## Answer

1. Create `bare` clone and put it to `project/.git`. This way git files will not be in a root of a project

    ```console
    $ git clone --bare git@github.com:user/project.git project/.git
    ```

1. Update `.git/config`. To make behave more normally and be fetchable.
    ```diff
     [core]
            repositoryformatversion = 0
            filemode = true
            bare = true
    +       logallrefupdates = true
            precomposeunicode = true
     [remote "origin"]
            url = git@github.com:imomaliev/til.git
    +       fetch = +refs/heads/*:refs/remotes/origin/*
    ```
1. `git fetch`

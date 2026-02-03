---
title: "Git | Diff Tab Width"
date: 2023-11-02T14:21:48+0000
tags: ["git"]
---

# Git | Diff Tab Width

## Context

- https://stackoverflow.com/questions/10581093/setting-tabwidth-to-4-in-git-show-git-diff

## Question

How to set  tabwidth to 4 in `git show` or `git diff`?

## Answer

```console
$ `git config --global core.pager 'less --tabs 4'`
```

## What I Learned

## Resources

- https://stackoverflow.com/a/75492196/3627387

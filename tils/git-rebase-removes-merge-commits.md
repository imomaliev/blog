---
title: "Git | Rebase Removes Merge Commits"
date: 2026-02-02T22:03:20Z
tags: [git]
---

# Git | Rebase Removes Merge Commits

## Context

I was trying to update commit that was part of merged branch so as usual I did

```console
$ git rebase -i {parent_hash}
```

But doing so removed merge commits

## Question

How to do rebase and keep merge commits?

## Answer

By default git rebase removes merge commits to avoid this us `--rebase-merges`.

> By default, a rebase will simply drop merge commits from the todo list, and put the rebased commits into a single, linear branch.

```console
$ git rebase --rebase-merges -i {parent_hash}
```

## What I Learned

## Resources

---
title: "GitHub Actions | Fix \"Error: Dependencies lock file is not found\""
date: 2022-02-13T22:43:54+07:00
tags: ["github-actions", "github", "ci"]
---

# GitHub Actions | Fix `Error: Dependencies lock file is not found`

## Question

How to fix this error:

```console
Error: Dependencies lock file is not found in /path/to/project. Supported file patterns: package-lock.json,yarn.lock
```

in [`actions/setup-node@v2`](https://github.com/actions/setup-node) GitHub Action?

## Answer

This error occurs because by default, this job searches for `package-lock.json` in the root of the repository for caching. We need to explicitly specify the location of our `package-lock.json`

```diff
             - name: Setup Node.js
               uses: actions/setup-node@v2
               with:
                   node-version: 16.14.0
                   cache: "npm"
+                  # The action defaults to search for the dependency file
+                  # (package-lock.json or yarn.lock) in the repository root, and uses
+                  # its hash as a part of the cache key.
+                  # https://github.com/actions/setup-node#caching-packages-dependencies
+                  cache-dependency-path: "./blog/package-lock.json"
```

## Resources

- https://github.com/actions/setup-node#caching-packages-dependencies

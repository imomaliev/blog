---
title: "TailwindCSS | Custom Transform Before Exctraction"
date: 2022-02-13T21:58:46+07:00
tags: ["tailwindcss", "tailwind", "hugo", "postcss"]
---

# TailwindCSS | Custom Transform Before Exctraction

## Context

I was trying to make [`Hugo`](https://gohugo.io/) work correctly with
[`TailwindCSS`](https://tailwindcss.com/) `3.x` which now uses `jit` by default and
this causes to changes in classes in template files by ignored by `Hugo`'s
[pipes](https://gohugo.io/hugo-pipes/introduction/). In previous versions, this was
possible by adding new
[`extractor`](https://gohugo.io/hugo-pipes/postprocess/#css-purging-with-postcss)
to `tailwind.config.js`. In the end, this solution was a dead end for my issue. But for
future reference, I thought I should create an example for myself.

## Question

How to add custom `content.trasnform` to `tailwind.config.js`

## Answer

From [docs](https://tailwindcss.com/docs/content-configuration#transforming-source-files):

> When using `content.transform`, you’ll need to provide your source paths using
> `content.files` instead of as a top-level array under content.

Following example from
[CSS purging with PostCSS](https://gohugo.io/hugo-pipes/postprocess/#css-purging-with-postcss)
we could do following

```diff
+    content: {
+        files: ["./src/layouts/**/*.{html,js}", "./src/hugo_stats.json"],
+        transform: {
+            json: (content) => {
+                let els = JSON.parse(content).htmlElements;
+                return `${els.classes.join(" ")}`;
+            },
+        },
+    },
```

## What I Learned

In the beginning I thought it would be possible to same trick with
[`content.extract`](https://tailwindcss.com/docs/content-configuration#customizing-extraction-logic)
but it turns out, `extract` process content line by line. This is why, for `TailwindCSS >= 3.x` we should use `content.transform` which runs on whole file.

## Resources

- https://gohugo.io/hugo-pipes/introduction/
- https://gohugo.io/hugo-pipes/postprocess/#css-purging-with-postcss
- https://tailwindcss.com/docs/content-configuration#transforming-source-files
- https://tailwindcss.com/docs/content-configuration#customizing-extraction-logic

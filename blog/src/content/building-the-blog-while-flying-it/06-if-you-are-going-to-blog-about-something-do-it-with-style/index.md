---
title: "If you're going to blog about something, do it with style"
date: 2022-07-20T23:14:11+07:00
draft: false
tags: ["hugo", "tailwindcss", "pre-commit", "prettier"]
---

> _If you're going to do something, do it with style!_[^1]

## Where are my styles?

We've just installed TailwindCSS to our project and ready to start adding styles to make it look better, but for some reason it now looks worse than before we installed it.
| Before | After |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| ![before](./before.png) | ![after](./after.png) |

The [Preflight configuration](https://tailwindcss.com/docs/preflight) is a culprit who "stole" our styles. I've dealt with it on one of my different series [Vite vue ts tailwind template](https://dev.to/imomaliev/vite-vue-ts-tailwind-template-convert-styles-to-tailwindcss-classes-and-configs-part-3-467c). I am going to quote docs here:

> Built on top of modern-normalize, Preflight is a set of base styles for Tailwind projects that are designed to smooth over cross-browser inconsistencies and make it easier for you to work within the constraints of your design system.

Basically to have consistent styles across all browsers some elements have extra styles, some have disabled styles and some like [headings for example](https://tailwindcss.com/docs/preflight#headings-are-unstyled) are unstyled completely.

With that out of the way, let's start styling our blog, and to help us speed things up we are going to use the official TailwindCSS [typography plugin](https://tailwindcss.com/docs/typography-plugin).

## Adding typography plugin

1. Install plugin

    ```console
    $ npm install --save-dev @tailwindcss/typography
    ```

1. Add `plugins` entry in `tailwind.config.js`

    ```diff
    diff --git a/blog/tailwind.config.js b/blog/tailwind.config.js
    index 9d0ca2f..586083d 100644
    --- a/blog/tailwind.config.js
    +++ b/blog/tailwind.config.js
    @@ -4,5 +4,5 @@ module.exports = {
       theme: {
         extend: {},
       },
    -  plugins: [],
    +  plugins: [require('@tailwindcss/typography')],
     }
    ```

1. Now we can add `prose` styles to our html.
    ```diff
    diff --git a/blog/src/layouts/_default/single.html b/blog/src/layouts/_default/single.html
    index 560541c..6cc083d 100644
    --- a/blog/src/layouts/_default/single.html
    +++ b/blog/src/layouts/_default/single.html
    @@ -1,5 +1,5 @@
     {{ define "main" }}
    -    <article>
    +    <article class="prose">
             <h1>{{ .Title }}</h1>
             {{ .Content }}
         </article>
    ```
    right away we see improvements
    ![typography-applied](./typography-applied.png)
1. We will take it one step further by centering content and adding breakpoint modifiers.
    ```diff
    diff --git a/blog/src/layouts/_default/single.html b/blog/src/layouts/_default/single.html
    index 560541c..6cc083d 100644
    --- a/blog/src/layouts/_default/single.html
    +++ b/blog/src/layouts/_default/single.html
    @@ -1,5 +1,5 @@
     {{ define "main" }}
    -    <article class="prose">
    +    <article class="prose prose-sm prose-table:table-fixed lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto">
             <h1>{{ .Title }}</h1>
             {{ .Content }}
         </article>
    ```
    ![typography-final](./typography-final.png)
    much better. You may have noted that I also added [`prose-table:table-fixed`](https://tailwindcss.com/docs/typography-plugin#element-modifiers) element modifier. This is to ensure that our tables in articles will be fixed size.

## Adding styles to headers

For now, we will just increase header sizes

```diff
diff --git a/blog/src/layouts/index.html b/blog/src/layouts/index.html
index 4fbcad1..9c1cdd3 100644
--- a/blog/src/layouts/index.html
+++ b/blog/src/layouts/index.html
@@ -1,8 +1,10 @@
 {{ define "main" }}
-    <h1>{{ .Site.Title }}</h1>
+    <h1 class="text-5xl font-bold">{{ .Site.Title }}</h1>
     {{ range .Pages }}
         <article>
-            <h2><a href="{{ .Permalink }}">{{ .Title }}</a></h2>
+            <h2 class="text-4xl underline">
+                <a href="{{ .Permalink }}">{{ .Title }}</a>
+            </h2>
         </article>
     {{ end }}
 {{ end }}
```

and do the same in `blog/src/layouts/_default/list.html`

## Automatic Class Sorting with Prettier

Having utility css classes in html can be very verbose and cumbersome. It is easy to make our code hard to follow. To help us with that, we can [automatically sort them](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier).

We are using prettier as pre-commit hook so instead of installing [`prettier-plugin-tailwindcss`](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) as npm dependency we will add it as `additional_dependency` for our `prettier` hook.

```diff
diff --git a/.pre-commit-config.yaml b/.pre-commit-config.yaml
index b8b2f7f..0b88113 100644
--- a/.pre-commit-config.yaml
+++ b/.pre-commit-config.yaml
@@ -26,6 +26,7 @@ repos:
             additional_dependencies:
                 - "prettier@2.7.1"
                 - "prettier-plugin-go-template@0.0.13"
+                - "prettier-plugin-tailwindcss@0.1.12"
```

### Typography plugin classes not sorted

For some reason, `@tailwindcss/typography`'s classes not sorted. I tried different options, but couldn't make it work. I have [started discussion](https://github.com/tailwindlabs/tailwindcss/discussions/8921), this looks like a bug to me, but maybe I am missing something.

## Links

-   https://tailwindcss.com/docs/preflight
-   https://dev.to/imomaliev/vite-vue-ts-tailwind-template-convert-styles-to-tailwindcss-classes-and-configs-part-3-467c
-   https://tailwindcss.com/docs/preflight#headings-are-unstyled
-   https://github.com/tailwindlabs/prettier-plugin-tailwindcss
-   https://tailwindcss.com/docs/typography-plugin
-   https://github.com/tailwindlabs/tailwindcss/discussions/8921

[^1]: [Quote by Jason Statham](https://www.brainyquote.com/quotes/jason_statham_760998)

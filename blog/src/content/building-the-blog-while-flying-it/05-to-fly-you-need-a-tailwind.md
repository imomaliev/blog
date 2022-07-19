---
title: "To fly you need a tailwind"
date: 2022-07-19T16:45:07+07:00
draft: true
tags: ["hugo", "tailwindcss", "postcss"]
---

## Why TailwindCSS

In one of my previous projects I fall in love with [TailwindCSS](https://tailwindcss.com). I know that this very controversial framework for some, but for me personally as backend developer of 11 years it was the first time I had a fun time adding styles to the frontend. I even created [vue-ts template](https://github.com/imomaliev/vue-ts-tailwind) with it, as a part of [another series](https://dev.to/imomaliev/series/13950).

## Asset management in Hugo

There are few ways to add css library to our blog, because Hugo itself supports multiple ways to do [asset management](https://gohugo.io/categories/asset-management). If you used TailwindCSS before you may know that to better integrate with other build tools, like webpack, Vite etc., TailwindCSS supports [PostCSS](https://postcss.org) out of the box. Luckily for us Hugo [supports it as well](https://gohugo.io/hugo-pipes/postcss/). So we are going install TailwindCSS as a PostCSS plugin and then use Hugo's `PostCSS` pipe to integrate it to our blog. With this plan in mind lets get started

## Install TailwindCSS

Let's start with following [official docs](https://tailwindcss.com/docs/installation/using-postcss) in a `blog/` folder.

1. Install TailwindCSS and PostCSS
    ```console
    $ npm install --save-dev tailwindcss postcss autoprefixer
    ```
1. Add `.gitignore` file for [Node.js projects](https://github.com/github/gitignore/blob/main/Node.gitignore)
1. Create configuration files.
    ```console
    $ npx tailwindcss init --postcss
    ```
    added `--postcss` option to initialize a `postcss.config.js` file as well.
1. Configure your template paths. Our only `content` files located in `blog/src/layouts` folder.
    ```diff
    diff --git a/blog/tailwind.config.js b/blog/tailwind.config.js
    index 32e3abd..7b5a700 100644
    --- a/blog/tailwind.config.js
    +++ b/blog/tailwind.config.js
    @@ -1,6 +1,6 @@
     /** @type {import('tailwindcss').Config} */
     module.exports = {
    -  content: [],
    +  content: ["./src/layouts/**/*.html"],
       theme: {
         extend: {},
       },
    ```
1. Add the Tailwind directives to your CSS
    ```console
    $ mkdir -p blog/src/assets
    $ touch !$/main.css
    ```
    and then update newly created `blog/src/assets/main.css`
    ```diff
    diff --git a/blog/src/assets/css/main.css b/blog/src/assets/css/main.css
    new file mode 100644
    index 0000000..b5c61c9
    --- /dev/null
    +++ b/blog/src/assets/css/main.css
    @@ -0,0 +1,3 @@
    +@tailwind base;
    +@tailwind components;
    +@tailwind utilities;
    ```
    also we are going to update `.editorconfig`, `.pre-commit-config.yaml` and `.prettierrc.yaml` to enable support for `css` filetype

https://tailwindcss.com/blog/automatic-class-sorting-with-prettier

add `scripts`

Install postcss-cli
https://gohugo.io/hugo-pipes/postcss/

add gitignore https://github.com/github/gitignore/blob/main/Node.gitignore

## Links

-   https://tailwindcss.com
-   https://github.com/imomaliev/vue-ts-tailwind
-   https://dev.to/imomaliev/series/13950
-   https://gohugo.io/categories/asset-management
-   https://postcss.org
-   https://gohugo.io/hugo-pipes/postcss/
-   https://tailwindcss.com/docs/installation/using-postcss
-   https://github.com/github/gitignore/blob/main/Node.gitignore

---
title: "To fly you need a tailwind"
date: 2022-07-19T16:45:07+07:00
draft: false
tags: ["hugo", "tailwindcss", "postcss", "npm"]
---

## Why TailwindCSS

In one of my previous projects, I fell in love with [TailwindCSS](https://tailwindcss.com). I know that this is a very controversial framework for some, but for me, personally, as a backend developer of 11 years, it was the first time I had a fun time adding styles to the frontend. I even created [vue-ts template](https://github.com/imomaliev/vue-ts-tailwind) with it, as a part of [another articles' series](https://dev.to/imomaliev/series/13950).

## Asset management in Hugo

There are few ways to add CSS library to our blog, because Hugo supports multiple ways to do [asset management](https://gohugo.io/categories/asset-management). If you used TailwindCSS before you may know that to better integrate with other build tools, like webpack, Vite etc., it supports [PostCSS](https://postcss.org) out of the box. Luckily for us, Hugo [supports it as well](https://gohugo.io/hugo-pipes/postcss/). We are going to install TailwindCSS as a PostCSS plugin and then use Hugo's `PostCSS` pipe to integrate it to our blog. With this plan in mind, let's get started.

## Install TailwindCSS

We start with following [official docs](https://tailwindcss.com/docs/installation/using-postcss) in a `blog/` folder.

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
    also, we are going to update `.editorconfig`, `.pre-commit-config.yaml` and `.prettierrc.yaml` to enable support for `css` file type.

## Configure Hugo to use PostCSS

Now we have installed TailwindCSS, we are ready to start configuring our blog to use it via `PostCSS` pipe.

From the docs

> Hugo Pipe’s PostCSS requires the postcss-cli JavaScript package to be installed in the environment (npm install -g postcss postcss-cli) along with any PostCSS plugin(s) used (e.g., npm install -g autoprefixer).

1. Install [`postcss-cli`](https://github.com/postcss/postcss-cli)
    ```console
    $ npm install --save-dev postcss-cli
    ```
1. Add `link` tag with our processed CSS to `blog/src/layouts/partials/head.html`
    ```diff
    diff --git a/blog/src/layouts/partials/head.html b/blog/src/layouts/partials/head.html
    index b9f74a6..556a0cf 100644
    --- a/blog/src/layouts/partials/head.html
    +++ b/blog/src/layouts/partials/head.html
    @@ -3,4 +3,6 @@
         <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>{{ .Site.Title }}</title>
    +    {{ $css := resources.Get "css/main.css" | resources.PostCSS }}
    +    <link rel="stylesheet" href="{{ $css.RelPermalink }}" />
    ```
1. Add [`scripts`](https://docs.npmjs.com/cli/v6/using-npm/scripts) command to `package.json` to run hugo in NPM environment. By default, Hugo will search for [`node_modules/`](https://gohugo.io/hugo-pipes/js#include-dependencies-in-packagejson--node_modules)

    > From Hugo 0.78.1 the start directory for resolving NPM packages (aka. packages that live inside a node_modules folder) is always the main project folder.

    but because of our project structure we need to run hugo as npm command. We will use [`start`](https://docs.npmjs.com/cli/v6/commands/npm-start) as command name because npm has shorthand for it.

    ```diff
    diff --git a/blog/package.json b/blog/package.json
    index 3f40e6d..5b5d864 100644
    --- a/blog/package.json
    +++ b/blog/package.json
    @@ -1,4 +1,7 @@
     {
    +    "scripts": {
    +        "start": "hugo --source src server --baseURL http://localhost/"
    +    },
         "devDependencies": {
             "autoprefixer": "^10.4.7",
             "postcss": "^8.4.14",
    ```

1. Profit!

We now have a blog that uses TailwindCSS.

## Links

### Asset management in Hugo

-   https://tailwindcss.com
-   https://github.com/imomaliev/vue-ts-tailwind
-   https://dev.to/imomaliev/series/13950
-   https://gohugo.io/categories/asset-management
-   https://postcss.org
-   https://gohugo.io/hugo-pipes/postcss/

### Install TailwindCSS

-   https://tailwindcss.com/docs/installation/using-postcss
-   https://github.com/github/gitignore/blob/main/Node.gitignore

### Configure Hugo to use PostCSS

-   https://github.com/postcss/postcss-cli
-   https://docs.npmjs.com/cli/v6/using-npm/scripts

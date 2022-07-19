---
title: "Basic content render"
date: 2022-07-17T21:53:08+07:00
draft: false
tags: ["hugo", "blog", "gohtml", "vue"]
---

## Sane defaults

Previously in this series, we created [a new Hugo site](/building-the-blog-while-flying-it/hugo-new-site/) and [copied scaffold of the default theme to our layout folder](/building-the-blog-while-flying-it/hugo-no-theme/). Now let's update our templates to have great HTML defaults. I would suggest reading the great article [Basic HTML5 Template: Use This HTML Boilerplate as a Starter for Any Web Dev Project](https://www.freecodecamp.org/news/basic-html5-template-boilerplate-code-example/) which dives a little deeper into this topic. But for our case, we will just base our default template on [Vite's boilerplate template for Vue](https://github.com/vitejs/vite/blob/main/packages/create-vite/template-vue/index.html).

First, we will add `lang="en"` attribute to `html` tag, specifying that content will be in English. I plan to make this blog support multiple languages, my main language is Russian, but my mother tong is Uzbek. And I hope in the future to write articles in these languages as well. As [Hugo's Lookup Order](https://gohugo.io/templates/lookup-order/) page states (to be honest not directly) all template lookups in Hugo start with `layouts/_default/baseof.html` template. This fact also could be deduced by finding a template with `html` tag in it in created `layouts` folder.

```diff
diff --git a/blog/src/layouts/_default/baseof.html b/blog/src/layouts/_default/baseof.html
index 7b0d566..94c5dfe 100644
--- a/blog/src/layouts/_default/baseof.html
+++ b/blog/src/layouts/_default/baseof.html
@@ -1,5 +1,5 @@
 <!DOCTYPE html>
-<html>
+<html lang="en">
     {{- partial "head.html" . -}}
     <body>
         {{- partial "header.html" . -}}
```

After that, we will update `head` tag in `layouts/_default/head.html` following existing structure.

```diff
diff --git a/blog/src/layouts/partials/head.html b/blog/src/layouts/partials/head.html
index e69de29..b9f74a6 100644
--- a/blog/src/layouts/partials/head.html
+++ b/blog/src/layouts/partials/head.html
@@ -0,0 +1,6 @@
+<head>
+    <meta charset="UTF-8" />
+    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
+    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+    <title>{{ .Site.Title }}</title>
+</head>
```

Here we've

-   added `meta` tag to specify default character encoding
-   added `link` to our future favicon
-   added another `meta` tag for `viewport` configuration to render the width of the page to the width of the device's screen
-   added `title` tag to set our pages title.

You could also check what Hugo's team suggest in their [docs](https://gohugo.io/templates/base/#define-the-base-template)

## GoHTML templates

Now we are ready to configure our default [`Kind`](https://gohugo.io/templates/lookup-order/#hugo-layouts-lookup-rules) templates to show content. Let start with our landing page - `layouts/index.html`. Default `baseof.html` contains usage of `block` construct, if you used any other templating language this should pretty familiar. Basically, this allows us to have overridable parts of the base template. Here, for example, we have `{{- block "main" . }}{{- end }}`, meaning we could re`define` this portion. Read [the docs on Base Templates and Blocks](https://gohugo.io/templates/base/#override-the-base-template) for better understanding. I will just show the final result:

### `index.html`

```diff
diff --git a/blog/src/layouts/index.html b/blog/src/layouts/index.html
index e69de29..728b791 100644
--- a/blog/src/layouts/index.html
+++ b/blog/src/layouts/index.html
@@ -0,0 +1,8 @@
+{{ define "main" }}
+    <h1>{{ .Site.Title }}</h1>
+    {{ range .Pages }}
+        <article>
+            <h2><a href="{{ .Permalink }}">{{ .Title }}</a></h2>
+        </article>
+    {{ end }}
+{{ end }}
```

Our blog now renders its title, from the `config.toml` on the landing page and all pages for the current level (only "Building the blog while flying it" series link currently) with a link. "This is not my first rodeo", so personally I find the template above is pretty straight forward. But if you are new to templating I suggest digging into the official docs for [template functions](https://gohugo.io/categories/functions) and [template variables](https://gohugo.io/variables/).

### `_default/list.html`

Following the same logic, we will update our `list` `Kind` template. To show current page's `Title` and render all child pages.

```diff
--- a/blog/src/layouts/_default/list.html
+++ b/blog/src/layouts/_default/list.html
@@ -0,0 +1,8 @@
+{{ define "main" }}
+    <h1>{{ .Title }}</h1>
+    {{ range .Pages }}
+        <article>
+            <h2><a href="{{ .Permalink }}">{{ .Title }}</a></h2>
+        </article>
+    {{ end }}
+{{ end }}
```

### `_default/single.html`

And finally, we will render actual content of our articles in `_default/single.html`

```diff
--- a/blog/src/layouts/_default/single.html
+++ b/blog/src/layouts/_default/single.html
@@ -0,0 +1,6 @@
+{{ define "main" }}
+    <article>
+        <h1>{{ .Title }}</h1>
+        {{ .Content }}
+    </article>
+{{ end }}
```

## Update articles for accessibility

Previously I was using a single hashtag `#` in my articles for this blog to denote headings, but from now on I will use two `##`, meaning all articles' sections will be rendered with [heading level 2](https://www.markdownguide.org/basic-syntax/#headings). This is recommended by `dev.to`'s editor for improving accessibility and also this allows us to render our article content properly where the title of the articles will be rendered as `<h1>` and all heading of the sections as `<h2>`.

## Hooray!

We have an actual working blog that could be hosted somewhere and people would be able to read it. But we will do the actual hosting some other time, for now we will continue building the blog itself and posting about it in [my series on dev.to](https://dev.to/imomaliev/series/18921)

## Links

-   https://www.freecodecamp.org/news/basic-html5-template-boilerplate-code-example/
-   https://github.com/vitejs/vite/blob/main/packages/create-vite/template-vue/index.html
-   https://gohugo.io/templates/lookup-order/
-   https://gohugo.io/templates/base/#define-the-base-template
-   https://gohugo.io/templates/lookup-order/#hugo-layouts-lookup-rules
-   https://gohugo.io/templates/base/#override-the-base-template
-   https://gohugo.io/categories/functions
-   https://gohugo.io/variables/
-   https://www.markdownguide.org/basic-syntax/#headings

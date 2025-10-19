---
title: "Hugo | Rebuild Styles on Source Change when using TailwindCSS 3.x"
date: 2022-02-14T17:54:27+07:00
tags: ["hugo", "postcss", "tailwindcss"]
---

# Hugo | Rebuild Styles on Source Change when using TailwindCSS 3.x

## Context

After applying styles rebuild hack provided by [@Gioni06](https://github.com/Gioni06), [@nnooney](https://github.com/nnooney) and [@istr](https://github.com/istr) in [this issue](https://github.com/gohugoio/hugo/issues/8343) and looks like this

```diff
diff --git a/path/to/head.html b/path/to/head.html
--- a/path/to/head.html
+++ b/path/to/head.html
 {{ $styles := resources.Get "css/tw.css" }}
 {{ $styles = $styles | resources.PostCSS }}
 {{ if hugo.IsProduction }}
     {{ $styles = $styles | minify | fingerprint | resources.PostProcess }}
+{{ else if .Site.IsServer }}
+    {{ $styles = $styles | resources.ExecuteAsTemplate (printf "main.%v.css" now.UnixMilli) . }}
 {{ end }}
 <link href="{{ $styles.RelPermalink }}" rel="stylesheet" />
diff --git a/path/to/baseof.html b/path/to/baseof.html
--- a/path/to/baseof.html
+++ b/path/to/baseof.html
 <!DOCTYPE html>
  <html lang="en">
-    {{- partial "head.html" . -}}
+    {{- partialCached "head.html" . -}}
```

This hack uses a timestamp as part of the new name for css file and this tells `Hugo` to rebuild on each save, because the name of the css file each time will be different. Usage of [`partialCached`](https://gohugo.io/functions/partialcached/) instead of regular `partial` allows for faster build times and instead of rebuilding styles for each `partial "head.html"` import it will be cached and re-used.

I thought to myself, is there a way to rebuild styles only on actual change of sources instead.

## Question

How to rebuild styles only on source change for `Hugo` project using `TailwindCSS` configured as `PostCSS` plugin.

## Answer

`hugo_stats.json` works perfectly for this case, we just need to hash it apply as similar hack as above.

First, we need to enable [`writeStats`](https://gohugo.io/getting-started/configuration/#configurebuild) in our configuration.

```diff
diff --git a/path/to/config.toml b/path/to/config.toml
--- a/path/to/config.toml
+++ b/path/to/config.toml
 languageCode = "en-us"
 title = "Blog"

+[build]
+# Used for hashing styles in development to work with TailwindCSS's jit
+writeStats = true
+
```

After that, we need to update our `head.html` to read and hash `hugo_stats.json`

```diff
diff --git a/path/to/head.html b/path/to/head.html
--- a/path/to/head.html
+++ b/path/to/head.html
     {{- $css := resources.Get "css/main.css" | resources.PostCSS }}
     {{- if hugo.IsProduction }}
-        {{- $css = $css | resources.Minify | resources.Fingerprint | resources.PostProcess }}
-    {{- else if .Site.IsServer }}
-        {{- $css = $css | resources.ExecuteAsTemplate (printf "main.%v.css" now.UnixMilli) . }}
+        {{- $css = $css | minify | fingerprint | resources.PostProcess }}
+    {{- else if (and (.Site.IsServer) (fileExists "hugo_stats.json"))  }}
+        {{- $stats_hash := getJSON "hugo_stats.json" | printf "%v" | sha256 }}
+        {{- $css = $css | resources.ExecuteAsTemplate (printf "main.%v.css" $stats_hash) . }}
```

Here we're using [`getJSON`](https://gohugo.io/templates/data-templates/#get-remote-data) and converting its contents to string via `print` and hashing this value with [`sha256`](https://gohugo.io/functions/sha/)

## What I Learned

For some reason, reading `hugo_stats.json` with [`readFile`](https://gohugo.io/functions/readfile/) does not work properly for this use case.

## Resources

- https://github.com/gohugoio/hugo/issues/8343
- https://gohugo.io/functions/partialcached/
- https://gohugo.io/getting-started/configuration/#configure-build
- https://gohugo.io/functions/readfile/
- https://dev.to/jonas_duri/how-to-use-tailwindcss-30-without-external-npm-scripts-just-hugo-pipes-2lg9

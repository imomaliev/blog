---
title: "Almost Ready to Write"
date: "2026-01-24T21:14:48Z"
tags: ["hugo", "yaml"]
---

We have the site, we have the theme, and according to [the quickstart guide](https://gohugo.io/getting-started/quick-start/), we are ready to add content. But in actuality, not quite yet.

1. Start by deleting skeleton posts that were added with the theme.

    ```console
    $ git rm -r theme/content/posts
    $ git add -u
    $ git commit -m 'delete skeleton posts'
    ```

1. Default Hugo site and theme skeletons use TOML front matter, but I prefer using YAML, mainly because [GitHub does not support TOML and JSON rendering in front matter](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)[^1].

    Hugo has a handy tool to automatically convert between front matter styles.

    ```console
    $ cd site/
    $ hugo convert toYAML --unsafe
    $ cd ..
    ```

    We need to run with the `--unsafe` flag; otherwise, it gives an error:

    ```console
    ERROR command error: Unsafe operation not allowed, use --unsafe or set a different output path
    ```

1. Update archetypes to use YAML front matter in the site and theme; example below.

    ```diff
    diff --git a/theme/archetypes/default.md b/theme/archetypes/default.md
    index 25b6752..c84c25b 100644
    --- a/theme/archetypes/default.md
    +++ b/theme/archetypes/default.md
    @@ -1,5 +1,5 @@
    -+++
    -date = '{{ .Date }}'
    -draft = true
    -title = '{{ replace .File.ContentBaseName "-" " " | title }}'
    -+++
    +---
    +title: "{{ replace .File.ContentBaseName `-` ` ` | title }}"
    +date: "{{ .Date }}"
    +draft: true
    +---
    ```
1. Add our first [section](https://gohugo.io/content-management/sections/#article).

    I will call it `Devlog` and here I will write my blog's development journey.

    ```console
    $ mkdir theme/content/devlog
    $ touch theme/content/devlog/_index.md
    ```

    Add section's front matter to `theme/content/devlog/_index.md`.

    ```md
    ---
    title: "Devlog"
    ---
    ```

    And show it in menu.

    ```diff
    diff --git a/theme/hugo.toml b/theme/hugo.toml
    index 5c26950..dccaed7 100644
    --- a/theme/hugo.toml
    +++ b/theme/hugo.toml
    @@ -9,8 +9,8 @@ title = 'My New Hugo Site'
         weight = 10

       [[menus.main]]
    -    name = 'Posts'
    -    pageRef = '/posts'
    +    name = 'Devlog'
    +    pageRef = '/devlog'
         weight = 20

       [[menus.main]]

    ```

1. Final touch.

    Cleanup `site/content/_index.md` which contains content for the home page.

1. We are ready to write and ready to publish.

[^1]: [Comment in "consistency: hugo new site uses config.toml, but YAML for content" issue](https://github.com/gohugoio/hugo/issues/5241#issuecomment-423469803)

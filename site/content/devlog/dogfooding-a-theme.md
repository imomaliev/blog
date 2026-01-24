---
title: "Dogfooding a Theme"
date: "2026-01-24T20:53:11Z"
tags: ["hugo", "hugo-theme", "hugo-modules"]
---

We've already created the Hugo site and pushed it to GitHub. Now is the time to set up our theme.

[Quickstart](https://gohugo.io/getting-started/quick-start/) suggests using an existing theme, but I want to create a custom one. I will store it in the same git repo because I do not have current plans of sharing it but still want it to be in a separate folder from the site.

1. Create a [theme skeleton](https://gohugo.io/getting-started/directory-structure/#theme-skeleton) in the project root.

    ```console
    $ hugo new theme --themesDir . theme
    $ git add theme
    $ git commit -m 'hugo new theme --themesDir . theme'
    ```

1. Instead of setting the theme via `theme` config in `hugo.toml` I will be importing it as a Hugo module. But first we need to [initialize the theme as a Go module](https://gohugo.io/hugo-modules/use-modules/#initialize-a-new-module).

    ```console
    $ cd theme
    $ hugo mod init github.com/imomaliev/blog/theme
    $ cd ..
    $ git commit -m 'intitialize theme as a module'
    ```

1. Now we are ready to [initialize the site's module system](https://gohugo.io/hugo-modules/use-modules/#use-a-module-for-a-theme).

    ```console
    $ cd site
    $ hugo mod init github.com/imomaliev/blog
    $ cd ..
    $ git commit -m 'initialize the hugo module system'
    ```

1. Add module imports.

    ```diff
    diff --git a/site/hugo.toml b/site/hugo.toml
    index 7e568b8..f106f4e 100644
    --- a/site/hugo.toml
    +++ b/site/hugo.toml
    @@ -1,3 +1,7 @@
     baseURL = 'https://example.org/'
     languageCode = 'en-us'
     title = 'My New Hugo Site'
    +
    +[module]
    +  [[module.imports]]
    +    path = 'github.com/imomaliev/blog/theme'
    ```

1. Finally, because our theme is in the same repo, we can just use [`replacements`](https://gohugo.io/hugo-modules/use-modules/#make-and-test-changes-in-a-module).

    ```diff
    diff --git a/site/hugo.toml b/site/hugo.toml
    index f106f4e..4dba0ec 100644
    --- a/site/hugo.toml
    +++ b/site/hugo.toml
    @@ -3,5 +3,7 @@ languageCode = 'en-us'
     title = 'My New Hugo Site'

     [module]
    +  replacements = 'github.com/imomaliev/blog/theme -> ../../theme'
    +
       [[module.imports]]
            path = 'github.com/imomaliev/blog/theme'
    ```

    ```console
    $ git add -u
    $ git commit -m 'import local theme'
    ```

1. Now we can run the dev server.

    ```console
    $ hugo server -D
    ```

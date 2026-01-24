---
title: "Show Your Work"
date: "2026-01-24T21:37:56Z"
---

Our blog is a [few steps](https://gohugo.io/getting-started/quick-start/#configure-the-site) away from being ready to see the world[^1].

1. Configure the site

    ```diff
    diff --git a/site/hugo.toml b/site/hugo.toml
    index 4dba0ec..7d59855 100644
    --- a/site/hugo.toml
    +++ b/site/hugo.toml
    @@ -1,6 +1,6 @@
    -baseURL = 'https://example.org/'
    +baseURL = 'https://imomaliev.com/'
     languageCode = 'en-us'
    -title = 'My New Hugo Site'
    +title = 'Blog'

     [module]
       replacements = 'github.com/imomaliev/blog/theme -> ../../theme'
    ```

1. Follow all the steps in the [Host on GitHub Pages](https://gohugo.io/host-and-deploy/host-on-github-pages/) guide.

1. Update workflow to build in and publish from site directory.

    ```diff
    diff --git a/.github/workflows/hugo.yaml b/.github/workflows/hugo.yaml
    index 20e1d20..d8cc26d 100644
    --- a/.github/workflows/hugo.yaml
    +++ b/.github/workflows/hugo.yaml
    @@ -74,6 +74,7 @@ jobs:
                 hugo-
           - name: Build the site
             run: |
    +          cd site/
               hugo \
                 --gc \
                 --minify \
    @@ -88,7 +89,7 @@ jobs:
           - name: Upload artifact
             uses: actions/upload-pages-artifact@v4
             with:
    -          path: ./public
    +          path: ./site/public
       deploy:
         environment:
           name: github-pages
    ```
1. Configure a [custom domain apex domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).

    We are going to publish our site via GitHub Actions, so we can skip setting `CNAME` in step 4. And on step 5 we will set `AAAA` records.
1. [Verify the domain with GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).
1. And we are live!

[^1]: Title is inspired by the [book of the same name](https://www.amazon.com/Show-Your-Work-Austin-Kleon/dp/076117897X)

---
title: "Create a Site"
date: "2026-01-23T22:05:28Z"
tags: ["hugo", "github", "git"]
---

I will start at the very "beginning" and go through the [official quickstart guide](https://gohugo.io/getting-started/quick-start/). My goal is to achieve the same results as so I can start blogging ASAP but I will be doing it a bit differently than how it is outlined in the guide. I will explain my decisions along the way. So let's create the Hugo site.

The quickstart docs suggest creating a new site skeleton and initializing git in the created site's root.

```console
$ hugo new site quickstart
$ cd quickstart
$ git init
```

In my opinion, this is not as good as having a separate folder that will contain the site. Modern blogs have pretty complex folder structures and require additional folders that store CI configs, helper scripts, and other stuff that is part of the blog project but not part of the blog's site.

1. I start by creating an empty repo first.

    ```console
    $ git init blog
    $ cd blog
    ```

2. Then add an empty initial commit.

    ```console
    $ git commit --allow-empty -m 'empty initial commit'
    ```

    Why? It is just better convention in case you want to rewrite history from the beginning. [^1][^2][^3]

    Yes, in most cases you can do `git rebase -i --root`, but this won't work if you need to split the initial commit into separate ones.

3. Now we are ready to create a site skeleton.

    ```console
    $ hugo new site site
    $ hugo add site
    $ git commit -m 'hugo new site site'
    ```

4. Set up `.gitingore` for `site`

    If you didn't know, GitHub stores common `.gitignore` files at https://github.com/github/gitignore. It is a good practice to set it up right away to avoid accidentally adding junk to the repo.

    ```console
    $ curl -o site/.gitignore https://raw.githubusercontent.com/github/gitignore/refs/heads/main/community/Golang/Hugo.gitignore
    $ git add site/.gitignore
    ```

    I also add the link to the source and license at the top.

    ```diff
    diff --git a/site/.gitignore b/site/.gitignore
    index 86c95ef..b1f826c 100644
    --- a/site/.gitignore
    +++ b/site/.gitignore
    @@ -1,6 +1,3 @@
    +# Copied from: https://github.com/github/gitignore/blob/main/community/Golang/Hugo.gitignore
    +# License: CC0 1.0 Universal
    +
     # Generated files by hugo
     /public/
     /resources/_gen/
    ```

    ```console
    $ git add -u
    $ git commit -m 'add .gitignore for site'
    ```

5. [Create an empty GitHub repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)

    Call it `blog`

6. Push the code
    ```console
    $ git remote add origin git@github.com:imomaliev/blog.git
    $ git push -u origin HEAD
    ```

[^1]: https://www.garfieldtech.com/blog/git-empty-commit
[^2]: https://stackoverflow.com/a/14630424/3627387
[^3]: https://stackoverflow.com/a/23000315/3627387

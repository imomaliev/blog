---
title: "hugo new site"
date: 2022-07-17T12:12:14+07:00
draft: false
tags: ["hugo", "blog", "terraform", "pre-commit", "editorconfig"]
---

## `git init`

I started by dogfooding[^1] my [template repository](https://github.com/imomaliev/library-template). It allows me to use [`terraform`](http://terraform.io) to manage GitHub repository declaratively. If you're not familiar with "Infrastructure as Code" I highly recommend giving it a try, the declarative approach to configuration management and resource provisioning makes repetitive tasks so much easier. Also, it already has [`editorconfig`](https://editorconfig.org) and [`pre-commit`](https://pre-commit.com) configuration.

After I initialized my blog with terraform and configured git to use created repo as a `remote`. I am ready to create new Hugo site.

## `hugo new site`

1. Create empty Hugo site
    ```console
    $ hugo new site blog
    ```
1. Add [`.gitignore` for `Hugo`](https://github.com/github/gitignore/blob/main/community/Golang/Hugo.gitignore)
1. Configure `pre-commit` to validate and format `toml` and `json` files.
1. Configure `editorconfig` for `toml` and `json` files.

[^1]: https://en.wikipedia.org/wiki/Eating_your_own_dog_food

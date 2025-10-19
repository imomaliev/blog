---
title: "Git | Commit Short Sha Length"
date: 2021-02-27T20:53:56+07:00
tags: ["git"]
---

# Git | Commit short sha length

## Question

I was trying to match local build behavior to gitlab's one. In gitlab CI there is predifined variable called `CI_COMMIT_SHORT_SHA` which has a value of first 8 characters of current commit. To get "short" version of current commit you could run

```console
$ git rev-parse --short HEAD
e0c8af0
```

But this gives you only 7. First of all why it is 7 and how to get 8?

## Answer

1. You could pass `{n}` to `--short`.

    > --short[=length]
    > Same as --verify but shortens the object name to a unique prefix with at least length characters. The minimum length is 4, the default is the
    > effective value of the core.abbrev configuration variable (see git-config(1)).

    ```console
    $ git rev-parse --short=8 HEAD
    e0c8af03
    ```

1. There is `core.abbrev` setting for git config.

    > core.abbrev
    > Set the length object names are abbreviated to. If unspecified or set to "auto", an appropriate value is computed based on the approximate number
    > of packed objects in your repository, which hopefully is enough for abbreviated object names to stay unique for some time. The minimum length is 4.

    ```console
    $ git config core.abbrev 8
    ```

## What I Learned

1. 7 is somewhat default for many programms

    http://manpages.ubuntu.com/manpages/precise/en/man1/git-config.1.html

    > core.abbrev
    > Set the length object names are abbreviated to. If unspecified, many commands
    > abbreviate to 7 hexdigits, which may not be enough for abbreviated object names to
    > stay unique for sufficiently long time.

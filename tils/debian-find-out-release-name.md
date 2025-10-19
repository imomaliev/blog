---
title: "Debian | Find Out Release Name"
date: 2021-03-30T17:45:58+07:00
tags: ["debian"]
---

# Debian | How to find out release name

## Question

I was trying to dynamically get version name inside docker for debian based image, but there is no `lsb_release` pre-installed

## Answer

There is `/etc/os-release/` file with all required info, also it is in form of shell env, so we can just source it and use desired variable.

```console
$ . /etc/os-release
$ echo $VERSION_CODENAME
buster
```

## What I Learned

1. For ubuntu `. /etc/lsb-release`

## Resources

- https://serverfault.com/a/897460/508888

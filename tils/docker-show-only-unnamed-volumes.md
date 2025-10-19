---
title: "Docker | Show Only Unnamed Volumes"
date: 2021-09-30T22:12:13+07:00
tags: ["docker"]
---

# Docker | Show Only Unnamed Volumes

## Question

How to show only names of volumes?

## Answer

Use `--format`.

```console
$ docker volume ls --format '{{.Name}}'
```

## Resources

- https://docs.docker.com/config/formatting/

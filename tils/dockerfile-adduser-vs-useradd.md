---
title: "Dockerfile | Adduser Vs Useradd"
date: 2023-11-30T14:02:00+0000
tags: ["dockerfile", "docker"]
---

# Dockerfile | Adduser Vs Useradd

## Context

## Question

Which one is preferred?

## Answer

Use `useradd` which is lower level and more widely available
Also bitnami uses it https://github.com/bitnami/containers/blob/099a37bf6d4023ad41a3c7168811c74a6654d280/bitnami/postgrest/11/debian-11/Dockerfile#L43

## What I Learned

## Resources

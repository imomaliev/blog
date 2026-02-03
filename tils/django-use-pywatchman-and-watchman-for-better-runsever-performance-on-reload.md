---
title: "Django | Use Pywatchman And Watchman For Better Runsever Performance On Reload"
date: 2023-11-02T14:21:48+0000
tags: ["django"]
---

# Django | Use Pywatchman And Watchman For Better Runsever Performance On Reload

## Context

## Question

Better autoreaload for dev server

## Answer

> If you’re using Linux or MacOS and install both [pywatchman](https://pypi.org/project/pywatchman/) and the [Watchman](https://facebook.github.io/watchman/) service, kernel signals will be used to autoreload the server (rather than polling file modification timestamps each second). This offers better performance on large projects, reduced response time after code changes, more robust change detection, and a reduction in power usage. Django supports `pywatchman` 1.2.0 and higher.

## What I Learned

## Resources

- https://docs.djangoproject.com/en/4.1/ref/django-admin/#runserver

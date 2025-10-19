---
title: "Django | Detect If Run Under Django Dev Server"
date: 2023-11-02T14:21:48+0000
tags: ["django"]
---

# Django | Detect If Run Under Django Dev Server

## Context

## Question

How to detect if run under django dev server?

## Answer

```python
import sys
RUNNING_DEVSERVER = (len(sys.argv) > 1 and sys.argv[1] == 'runserver'
```

## What I Learned

## Resources

- https://stackoverflow.com/questions/1291755/how-can-i-tell-whether-my-django-application-is-running-on-development-server-or

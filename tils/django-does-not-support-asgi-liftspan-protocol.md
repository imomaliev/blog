---
title: "Django | Does Not Support Asgi's Liftspan Protocol"
date: 2023-11-02T14:21:48+0000
tags: ["django"]
---

# Django | Does Not Support Asgi's Liftspan Protocol

## Context
- https://asgi.readthedocs.io/en/latest/specs/lifespan.html#startup-complete-send-event
- https://code.djangoproject.com/ticket/32172
- https://github.com/django/django/pull/16547

## Question

Does django support asgi's liftspan protocol'

## Answer

### If using gunicorn with uvicorn worker

In `uvicorn_worker.py`
```python
from uvicorn.workers import UvicornWorker as BaseUvicornWorker

# Django does not support Lifespan Protocol
# https://asgi.readthedocs.io/en/latest/specs/lifespan.html
# https://github.com/django/django/pull/13636
# https://code.djangoproject.com/ticket/31508
# Using uvicorn.workers.UvicornWorker throws INFO warning:
#   "ASGI 'lifespan' protocol appears unsupported."
# To avoid that we need to disable 'lifespan' in the worker
class UvicornWorker(BaseUvicornWorker):
    CONFIG_KWARGS = {"lifespan": "off"}
```
In `gunicorn.conf.py`
```
# https://www.uvicorn.org/deployment/#gunicorn
# using custom one to disable Lifespan Protocol
# needs to be passed by string https://github.com/benoitc/gunicorn/issues/1539
worker_class = "uvicorn_worker.UvicornWorker"
```

## What I Learned

## Resources
- https://stackoverflow.com/questions/61300314/django-uvicorn

---
title: "Tornado | Fix \"tornado.util.TimeoutError: Operation timed out after 5 seconds\""
date: 2021-09-30T22:12:13+07:00
tags: ["tornado", "pytest"]
---

# Tornado | Fix `tornado.util.TimeoutError: Operation timed out after 5 seconds`

## Context

Whenever I debug my test for tornado code in the end I get this error

```python
...
> raise TimeoutError('Operation timed out after %s seconds' % timeout)
E tornado.util.TimeoutError: Operation timed out after 5 seconds

.venv/lib/python3.7/site-packages/tornado/ioloop.py:575: TimeoutError
```

## Question

How to fix `tornado.util.TimeoutError: Operation timed out after 5 seconds` on [`tornado`](https://github.com/tornadoweb/tornado) test debug?

## Answer

This is due `ASYNC_TEST_TIMEOUT` environment variable
[From docs](https://www.tornadoweb.org/en/stable/testing.html#tornado.testing.AsyncTestCase.wait)

> In the event of a timeout, an exception will be thrown. The default timeout is 5 seconds; it may be overridden with a timeout keyword argument or globally with the `ASYNC_TEST_TIMEOUT` environment variable.

And could be fixed by setting this variable to a bigger value in seconds

```console
$ # running tests with ASYNC_TEST_TIMEOUT set to 10 minutes
$ ASYNC_TEST_TIMEOUT=600 python -m unittest
```

or if you are using `pytest` with `pytest-tornado` plugin by passing `--async-test-timeout` argument to `pytest` command

```console
$ pytest --async-test-timeout=600
```

## Resources

- https://www.tornadoweb.org/en/stable/testing.html#tornado.testing.AsyncTestCase.wait
- https://stackoverflow.com/a/49149757/3627387

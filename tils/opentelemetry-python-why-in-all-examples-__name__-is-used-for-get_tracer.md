---
title: "OpenTelemetry Python | Why In All Examples __name__ Is Used For get_tracer"
date: 2023-11-02T14:21:48+0000
tags: ["opentelemetry", "python"]
---

# OpenTelemetry Python | Why In All Examples __name__ Is Used For get_tracer

## Context

## Question

Why in all examples `__name__` is used for get_tracer?

## Answer

https://opentelemetry-python.readthedocs.io/en/latest/api/trace.html#opentelemetry.trace.TracerProvider.get_tracer

> **instrumenting_module_name** ([`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.11)")) –
> 
> The uniquely identifiable name for instrumentation scope, such as instrumentation library, package, module or class name. `__name__` may not be used as this can result in different tracer names if the tracers are in different files. It is better to use a fixed string that can be imported where needed and used consistently as the name of the tracer.
> 
> This should _not_ be the name of the module that is instrumented but the name of the module doing the instrumentation. E.g., instead of `"requests"`, use `"opentelemetry.instrumentation.requests"`.

## What I Learned

## Resources

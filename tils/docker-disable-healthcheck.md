---
title: "Docker | Disable Healthcheck"
date: 2021-04-07T15:55:36+07:00
tags: ["docker"]
---

# Docker | Disable healthcheck

## Question

When running `pdb` with enabled `healthcheck` it gets really annoying because during your debug session you keep getting healthcheck requests

## Answer

### Docker

Use `--no-healthcheck` (https://docs.docker.com/engine/reference/run/#healthcheck)

> --no-healthcheck Disable any container-specified HEALTHCHECK

```console
$ docker run --no-healthcheck
```

### docker-compose

Use `disable: true` (https://github.com/compose-spec/compose-spec/blob/master/spec.md#healthcheck)

```yaml
healthcheck:
    disable: true
```

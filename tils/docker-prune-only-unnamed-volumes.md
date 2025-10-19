---
title: "Docker | Prune Only Unnamed Volumes"
date: 2021-09-30T22:12:13+07:00
tags: ["docker"]
---

# Docker | Prune Only Unnamed Volumes

## Context

I was trying to do some cleanup of space for docker and needed to prune my unnamed volumes names.

## Question

How to prune all unnamed docker volumes?

## Answer

Use `--filter` option. From docs:

> By default, all unused volumes are removed. You can limit the scope using
> the `--filter` flag. For instance, the following command only removes
> volumes which are not labelled with the `keep` label:
>
> ```console
> $ docker volume prune --filter "label!=keep"
> ```

But to create correct filter first we need to `inspect` volumes to find what labels and other parameters are present for them

```console
$ docker volume inspect project_volume
[
    {
        "CreatedAt": "2021-09-30T11:35:55Z",
        "Driver": "local",
        "Labels": {
            "com.docker.compose.project": "project",
            "com.docker.compose.version": "2.0.0",
            "com.docker.compose.volume": "project_volume"
        },
        "Mountpoint": "/var/lib/docker/volumes/project_project_data/_data",
        "Name": "project_project_data",
        "Options": null,
        "Scope": "local"
    }
]
```

So we could filter our volumes like this

```console
$ docker volume prune --filter 'label!=com.docker.compose.project'
```

**Note** `negative` filtering does not work for `docker volume ls` for some reason.

```console
$ docker volume ls --filter 'label!=com.docker.compose.project'
Error response from daemon: Invalid filter 'label!'
```

## Resources

- https://docs.docker.com/engine/reference/commandline/volume_inspect/
- https://docs.docker.com/config/pruning/#prune-volumes

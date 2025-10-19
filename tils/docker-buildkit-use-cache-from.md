---
title: "Docker | Buildkit Use Cache From"
date: 2021-05-29T12:12:34+07:00
tags: ["docker", "ci"]
---

# Docker | In CI buildkit images are not reusing cache from provided images

## Question

I've recently updated our CI to use buildkit for building docker images. But I noticed that docker build command with --cache-from buildkit image is not reusing cache.

## Answer

We need to provide `--build-arg BUILDKIT_INLINE_CACHE=1` for `docker build` command so that cache metadata will written into image

From docs

> In addition to local build cache, the builder can reuse the cache generated from previous builds with the --cache-from flag pointing to an image in the registry.
>
> To use an image as a cache source, cache metadata needs to be written into the image on creation. This can be done by setting --build-arg BUILDKIT_INLINE_CACHE=1 when building the image. After that, the built image can be used as a cache source for subsequent builds.

## Resources

- https://devops.stackexchange.com/questions/11175/build-docker-images-with-dind-and-buildkit
- https://docs.docker.com/engine/reference/commandline/build/#specifying-external-cache-sources
- https://testdriven.io/blog/faster-ci-builds-with-docker-cache/#buildkit

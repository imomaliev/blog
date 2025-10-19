---
title: "NPM | Build Behaves Differently Inside Docker"
date: 2021-03-29T12:56:05+07:00
tags: ["npm"]
---

# NPM | build behaves differently inside docker

## Question

I was pulling my hair out trying to understand why inside docker npm bulid is behaving differently.

## Answer

Issue was due to docker container was not seeing the same files as local `npm build`. I forgot to mount some files! We are using `postcss` for tailwind in one of our projects. There is a feature called `tree-shaking` which is during build deletes all unused styles from final bundle. So... Because I forgot to make some of our templates visiable to frontend container postcss thought that styles were not used and purged them.

## What I Learned

1. When reading configuration files do not rush and reread carefully. In our `tailwind.config.js` it is directly stated that this files are going to be used for purging.
1. May there should be some type of error handling for such cases. When `tailwind` expects some files for purging but they are not persent, throw a warning.

---
title: "TypeScript | Fix \"TS2307: Cannot find module 'src' or its corresponding type declarations.\""
date: 2021-09-20T22:33:27+07:00
tags: ["typescript", "npm", "vuejs"]
---

# TypeScript | Fix `TS2307: Cannot find module 'src' or its corresponding type declarations.`

## Context

After I updated my `package.json` and installed all dependencies, my `npm run build` started failing with

```console
$ npm run build

> vite-vue-typescript-starter@0.0.0 build
> vue-tsc --noEmit && vite build

node_modules/@vue/test-utils/dist/domWrapper.d.ts:5:28 - error TS2307: Cannot find module 'src' or its corresponding type declarations.

5 import { VueWrapper } from 'src';
                             ~~~~~


Found 1 error.
```

## Question

How to fix?

```console
error TS2307: Cannot find module 'src' or its corresponding type declarations.
```

## Answer

This was a tricky one because at a first glance it may seem that I have a typescript problem in project which is technically correct, but actually this is a [bug](https://github.com/vuejs/vue-test-utils-next/issues/936) in `@vue/test-utils-next` library which was introduced in `2.0.0-rc.14` version. Installing `2.0.0-rc.13` or setting `skipLibCheck: true` in `tsconfig.json` solves this. For my case, I've chosen the first approach.

## What I Learned

1. [`skipLibCheck: true`](https://www.typescriptlang.org/tsconfig#skipLibCheck)
    > Skip type checking of declaration files.

### Resources

- https://github.com/vuejs/vue-test-utils-next/issues/936
- https://www.typescriptlang.org/tsconfig#skipLibCheck

---
title: "ESLint | Fix \"'defineProps' is not defined.\""
date: 2021-10-04T22:03:46+07:00
tags: ["eslint", "vuejs"]
---

# ESLint | Fix `'defineProps' is not defined.`

## Context

In one of my `vue-ts` series' [article](https://dev.to/imomaliev/creating-vite-vue-ts-template-project-configs-improvements-3617), I was asked how to resolve [this](https://dev.to/algil/comment/1igom) issue

> How have you resolve this console warning (on npm run dev)?
>
> [@vue/compiler-sfc]definePropsis a compiler macro and no longer needs to be imported.
>
> But if I don't import defineProps in HelloWorld.vue file, the next line is underline in red:
>
> defineProps<{ msg: string }>()
>
> With this message:
>
> 'defineProps' is not defined.eslint(no-undef)
>
> Thanks!

## Question

How to fix ESLint error `defineProps' is not defined. eslint(no-undef)`?

## Answer

Add `'vue/setup-compiler-macros': true` to `env` in `eslint`. From [docs](https://eslint.vuejs.org/user-guide/#compiler-macros-such-as-defineprops-and-defineemits-generate-no-undef-warnings):

```diff
module.exports = {
+   env: {
+     'vue/setup-compiler-macros': true
+   }
}
```

Basically in newer vue versions with `script setup` syntax `defineProps` is no longer needs to be imported because it is a `compliler macro` as it states in quote above. So the solution was just to configure `eslint` to not warn about `defineProps`

## Resources

- https://dev.to/algil/comment/1igom
- https://dev.to/imomaliev/creating-vite-vue-ts-template-project-configs-improvements-3617
- https://eslint.vuejs.org/user-guide/#compiler-macros-such-as-defineprops-and-defineemits-are-warned-by-no-undef-rule
- https://dev.to/imomaliev/comment/1ihh5

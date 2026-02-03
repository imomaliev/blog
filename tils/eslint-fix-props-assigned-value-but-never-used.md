---
title: "ESLint | Fix \"'props' is assigned a value but never used @typescript-eslint/no-unused-vars\""
date: 2021-10-04T22:03:46+07:00
tags: ["eslint", "vuejs"]
---

# ESLint | Fix `'props' is assigned a value but never used @typescript-eslint/no-unused-vars`

## Context

This is a continuation of `script setup` syntax usage. `eslint` thinks that variables like `props`, `emits` etc. are not used, but actually they are.

## Question

How to fix ESLint error `'props' is assigned a value but never used @typescript-eslint/no-unused-vars`?

## Answer

Add `vue/script-setup-uses-vars` rule to eslint.

> ESLint no-unused-vars rule does not detect variables in `<script setup>` used in `<template>`. This rule will find variables in `<script setup>` used in `<template>` and mark them as used.

```diff
module.exports = {
  // Use the rule set.
  extends: ['plugin:vue/base'],
  rules: {
    // Enable vue/script-setup-uses-vars rule
+     'vue/script-setup-uses-vars': 'error',
  }
}
```

## Resources

- https://eslint.vuejs.org/rules/script-setup-uses-vars.html
- https://eslint.vuejs.org/user-guide/#the-variables-used-in-the-template-are-warned-by-no-unused-vars-rule

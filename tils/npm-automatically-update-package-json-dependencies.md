---
title: "NPM | Automatically Update package.json Dependencies"
date: 2021-09-20T22:33:27+07:00
tags: ["npm"]
---

# NPM | Automatically Update `package.json` Dependencies

## Context

During chore update of my [vue-ts template](https://github.com/imomaliev/vue-ts) dependencies (to learn more about it, read [here](https://dev.to/imomaliev/series/13845)) I was doing usual npm "upgrade" steps.

1. Run `npm update` to automatically update my packages to the latest versions
   From docs:
    > This command will update all the packages listed to the latest version (specified by the tag config), respecting the semver constraints of both your package and its dependencies (if they also require the same package).
1. Run `npm outdated` - to see what could be still updated.

`npm update` - only updates `package-lock.json` and does not change `package.json`. I started searching for a way to automatically update my dependencies in `package.json` file as well.

## Question

How to automatically update `package.json` dependencies' versions?

## Answer

Quick searching pointed me to [this stackoverflow post](https://stackoverflow.com/questions/16073603/how-to-update-each-dependency-in-package-json-to-the-latest-version), where one of the answers suggested using [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) tool.

1. `npm -g install npm-check-updates`
1. `ncu` to see outdated versions or `ncu --upgrade` to update the `package.json`.

## Resources

- https://github.com/imomaliev/vue-ts
- https://stackoverflow.com/questions/16073603/how-to-update-each-dependency-in-package-json-to-the-latest-version
- https://www.npmjs.com/package/npm-check-updates

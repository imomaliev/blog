---
title: "ADRs as Hugo Content"
number: "0008"
status: "accepted"
date: "2025-10-15T20:50:18+01:00"
---

# ADR 0008: ADRs as Hugo Content

<!-- These documents have names that are short noun phrases. -->

## Context

<!-- This section describes the forces at play, including technological, political, social, and project local. These forces are probably in tension, and should be called out as such. The language in this section is value-neutral. It is simply describing facts. -->

## Decision

Use `adrs/` as Hugo content via module mounts

Update `theme/hugo.toml` menu

Add `_index.md` to `theme/content/adrs/` because this is part of the theme

Configure modules

```diff
+[module]
+  [[module.mounts]]
+    includeFiles = ['[0-9][0-9][0-9][0-9]-*.md']
+    source = 'content/adrs'
+    target = 'content/adrs'
+
+  [[module.mounts]]
+    source = 'content'
+    target = 'content'
```

https://discourse.gohugo.io/t/solved-how-do-i-add-module-mounts-to-hugo-toml-config-in-a-theme/46489
https://gohugo.io/configuration/module/#default-mounts
> Adding a new mount to a target root will cause the existing default mount for that root to be ignored. If you still need the default mount, you must explicitly add it along with the new mount.

## Alternatives

<!-- This section describes **considered** alternatives to the _decision_. Each _alternative_ **MUST** have a **Verdict** specifying the reason it was not choosen. -->

Symlinks
https://github.com/gohugoio/hugo/issues/5927

## Consequences

<!-- This section describes the resulting context, after applying the _decision_. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future. -->

## Resources

<!-- This section lists references, sources, or further reading recommendations that were used to form the _decision_ or provide an additional context. -->

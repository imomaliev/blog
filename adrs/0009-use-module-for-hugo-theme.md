---
title: "Use Module for Hugo Theme"
number: "0009"
status: "accepted"
date: 2025-10-15T21:03:35+01:00
---

# ADR 0009: Use Module for Hugo Theme

<!-- These documents have names that are short noun phrases. -->

## Context

https://gohugo.io/hugo-modules/use-modules/#use-a-module-for-a-theme

<!-- This section describes the forces at play, including technological, political, social, and project local. These forces are probably in tension, and should be called out as such. The language in this section is value-neutral. It is simply describing facts. -->

## Decision

<!-- This section describes our response to these forces. It is stated in full sentences, with active voice. "We **MUST** …" -->

```
$ cd /theme/
$ hugo mod init github.com/imomaliev/blog
$ git add go.mod
$ git commit 
$ git push
$ cd ../site/
$ hugo mod init github.com/imomaliev/blog
$ hugo mod get github.com/imomaliev/blog/theme
$ hugo mod get -u
$ hugo mod tidy
```
NOTE: `hugo mod tidy` will remove `github.com/imomaliev/blog/theme` from `go.mod`, making `go.sum` useless.

We can just `rm go.sum`


Replacement for local development

```diff
[module]
+  replacements = 'github.com/imomaliev/blog/theme -> ../../theme'
+
+  [[module.imports]]
+    path = 'github.com/imomaliev/blog/theme'
```

```console
$ hugo mod get github.com/imomaliev/blog/theme
go: no module dependencies to download
go: github.com/imomaliev/blog/theme@upgrade: no matching versions for query "upgrade"
hugo: collected modules in 558 msError: failed to load modules: failed to get ["github.com/imomaliev/blog/theme@upgrade"]: failed to execute 'go [get github.com/imomaliev/blog/theme@upgrade]': failed to execute binary "go" with args [get github.com/imomaliev/blog/theme@upgrade]: go: github.com/imomaliev/blog/theme@upgrade: no matching versions for query "upgrade"

```
No go.mod in theme folder in github


## Alternatives

<!-- This section describes **considered** alternatives to the _decision_. Each _alternative_ **MUST** have a **Verdict** specifying the reason it was not choosen. -->

## Consequences

<!-- This section describes the resulting context, after applying the _decision_. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future. -->

## Resources

<!-- This section lists references, sources, or further reading recommendations that were used to form the _decision_ or provide an additional context. -->

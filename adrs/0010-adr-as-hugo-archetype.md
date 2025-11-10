---
number: "0010"
title: "ADR as Hugo Archetype"
date: 2025-10-15T21:33:27+01:00
status: "accepted"
---

# ADR 0010: ADR as Hugo Archetype

<!-- These documents have names that are short noun phrases. -->

## Context

<!-- This section describes the forces at play, including technological, political, social, and project local. These forces are probably in tension, and should be called out as such. The language in this section is value-neutral. It is simply describing facts. -->

## Decision

<!-- This section describes our response to these forces. It is stated in full sentences, with active voice. "We **MUST** …" -->

Mount `TEMPLATE.md` as an archetype

```toml
  [[module.mounts]]
    source = '../adrs/TEMPLATE.md'
    target = 'archetypes/adr.md'

  # manually added all default mounts because adding custom one in theme causes them to be
  # fully replaced for a theme, but for a site you only need to replace the updated mounted
  # https://github.com/gohugoio/hugoDocs/issues/3238
  # https://gohugo.io/configuration/module/#default-mounts
  [[module.mounts]]
    source = 'content'
    target = 'content'
  [[module.mounts]]
    source = 'data'
    target = 'data'
  [[module.mounts]]
    source = 'layouts'
    target = 'layouts'
  [[module.mounts]]
    source = 'i18n'
    target = 'i18n'
  [[module.mounts]]
    source = 'archetypes'
    target = 'archetypes'
  [[module.mounts]]
    source = 'assets'
    target = 'assets'
  [[module.mounts]]
    source = 'static'
    target = 'static'
```

Because we are using `replacements` the `source` should be relative to `theme` folder in the root, and not in `site/themes` folder

## Alternatives

<!-- This section describes **considered** alternatives to the _decision_. Each _alternative_ **MUST** have a **Verdict** specifying the reason it was not choosen. -->

Use symlinks. Not portable.

## Consequences

<!-- This section describes the resulting context, after applying the _decision_. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future. -->

Probably issues with symlink

```console
$ hugo new content --kind adr adrs/0008-test-title-adr.md
panic: [BUG] no Page found for "/Users/batiskaf/Workspace/personal/blog/site/content/adrs/adrs/0008-test-title-adr.md"

goroutine 1 [running]:
github.com/gohugoio/hugo/create.(*contentBuilder).applyArcheType(0x140009ac900, {0x14000e1a120, 0x55}, {0x107bbdb40, 0x1400071bc80})
        github.com/gohugoio/hugo/create/content.go:275 +0x280
github.com/gohugoio/hugo/create.(*contentBuilder).buildFile(0x140009ac900)
        github.com/gohugoio/hugo/create/content.go:244 +0x154
github.com/gohugoio/hugo/create.NewContent.func1()
        github.com/gohugoio/hugo/create/content.go:105 +0x1ac
github.com/gohugoio/hugo/create.NewContent(0x140008bfa20, {0x16b42eea8, 0x3}, {0x16b42eeac, 0x1b}, 0x0)
        github.com/gohugoio/hugo/create/content.go:108 +0x3fc
github.com/gohugoio/hugo/commands.newNewCommand.func1({0x0?, 0x0?}, 0x0?, 0x1400028ab00, {0x140009d5c80, 0x0?, 0x0?})
        github.com/gohugoio/hugo/commands/new.go:62 +0x18c
github.com/gohugoio/hugo/commands.(*simpleCommand).Run(0x0?, {0x107ba6af8?, 0x10997bd40?}, 0x0?, {0x140009d5c80?, 0xe5b21f2c0809fa8b?, 0x140002df9d0?})
        github.com/gohugoio/hugo/commands/commandeer.go:649 +0x48
github.com/bep/simplecobra.(*Commandeer).compile.func1(0x1400022f000?, {0x140009d5c80?, 0x4?, 0x106ad0575?})
        github.com/bep/simplecobra@v0.6.1/simplecobra.go:113 +0x50
github.com/spf13/cobra.(*Command).execute(0x14000a74308, {0x140009d5b90, 0x3, 0x3})
        github.com/spf13/cobra@v1.9.1/command.go:1015 +0x7d4
github.com/spf13/cobra.(*Command).ExecuteC(0x140008a1208)
        github.com/spf13/cobra@v1.9.1/command.go:1148 +0x350
github.com/spf13/cobra.(*Command).ExecuteContextC(...)
        github.com/spf13/cobra@v1.9.1/command.go:1080
github.com/bep/simplecobra.(*Exec).Execute(0x140000c0690, {0x107ba6af8?, 0x10997bd40?}, {0x14000180190?, 0x140000bc678?, 0x104a1c914?})
        github.com/bep/simplecobra@v0.6.1/simplecobra.go:155 +0xa8
github.com/gohugoio/hugo/commands.Execute({0x14000180190, 0x5, 0x5})
        github.com/gohugoio/hugo/commands/commandeer.go:68 +0x264
main.main()
        github.com/gohugoio/hugo/main.go:25 +0x68
```

Solved with mounts
1. Because of `includeFiles` throuws error if creation pattern is not matched
1. Had to map everything in theme to map archetype? (TODO research)
1. `hugo new --kind adr ../../adrs/NNNN-title.md`

```
  # manually added all default mounts because adding custom one in theme cuases them to be
  # fully replaced for a theme, but for a site you only need to replace the updated mounted
  # https://gohugo.io/configuration/module/#default-mounts
```

## Resources

<!-- This section lists references, sources, or further reading recommendations that were used to form the _decision_ or provide an additional context. -->

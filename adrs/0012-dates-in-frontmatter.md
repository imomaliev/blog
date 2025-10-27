---
title: "Dates in Frontmatter"
number: "0012"
status: "accepted"
date: 2025-10-27T20:45:21Z
---

# ADR 0012: Dates in Frontmatter

<!-- These documents have names that are short noun phrases. -->

## Context

<!-- This section describes the forces at play, including technological, political, social, and project local. These forces are probably in tension, and should be called out as such. The language in this section is value-neutral. It is simply describing facts. -->

By default hugo will use date format in yaml and toml as strings. This is required for easier parsability https://gohugo.io/functions/time/format/

## Decision

<!-- This section describes our response to these forces. It is stated in full sentences, with active voice. "We **MUST** …" -->

Use yaml timestamps in IS8601 format for dates in frontmatter

https://yaml.org/spec/1.2.2/#example-timestamps

## Alternatives

<!-- This section describes **considered** alternatives to the _decision_. Each _alternative_ **MUST** have a **Verdict** specifying the reason it was not choosen. -->

keep using strings

## Consequences

<!-- This section describes the resulting context, after applying the _decision_. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future. -->

## Resources

<!-- This section lists references, sources, or further reading recommendations that were used to form the _decision_ or provide an additional context. -->
- https://toml.io/en/v1.0.0#offset-date-time

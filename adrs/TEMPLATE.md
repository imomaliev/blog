{{- $pathParts := split .File.ContentBaseName "-" }}
{{- $number := index $pathParts 0 }}
{{- $titleParts := $pathParts | after 1 }}
{{- $title := delimit $titleParts " " | title -}}
---
# These documents have names that are short noun phrases.
title: "{{ $title }}"
# ADR's number
number: "{{ $number }}"
# A decision **MAY** be "proposed" if the project stakeholders haven't decided on it yet, "accepted" once it is agreed, or "rejected" if not. If a later ADR changes or reverses a decision, it may be marked as "deprecated" or "superseded" with a reference to its replacement.
status: "proposed"
# Decision created date
date: "{{ .Date }}"
---

# ADR {{ $number }}: {{ $title }}

<!-- These documents have names that are short noun phrases. -->

## Context

<!-- This section describes the forces at play, including technological, political, social, and project local. These forces are probably in tension, and should be called out as such. The language in this section is value-neutral. It is simply describing facts. -->

## Decision

<!-- This section describes our response to these forces. It is stated in full sentences, with active voice. "We **MUST** …" -->

## Alternatives

<!-- This section describes **considered** alternatives to the _decision_. Each _alternative_ **MUST** have a **Verdict** specifying the reason it was not choosen. -->

## Consequences

<!-- This section describes the resulting context, after applying the _decision_. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future. -->

## Resources

<!-- This section lists references, sources, or further reading recommendations that were used to form the _decision_ or provide an additional context. -->

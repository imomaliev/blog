# Style Guide

## Front matter

As per [ADR-0002](/adrs/0002-use-yaml-front-matter.md) all front-matter **MUST** be in [YAML](https://yaml.org/) format.

### Dates

Dates[^1] in front matter **MUST** be unquoted [yaml timestamp](https://yaml.org/spec/1.2.2/#example-timestamps) in [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html)

### Title

<!-- TODO: add ADR for this, maybe add to ADR-0001 -->

`title` **MUST** always be double quoted.

## Spelling

- "front matter"[^2]
- "Devlog"

## Commits

<!-- TODO: add ADR for this, maybe add to ADR-0001 -->

- Use `ADR NNNN: description` when adding/updating ADR
- Use `ADR-NNNN` when referencing ADR in commit message

[^1]: [ADR-0012](/adrs/0012-dates-in-front-matter)
[^2]: [ADR-0013](/adrs/0013-front-matter-spelling)

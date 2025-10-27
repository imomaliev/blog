---
title: "Use YAML Front Matter"
number: "0002"
status: "accepted"
date: 2025-10-11T21:55:12+01:00
---

# ADR 0002: Use YAML Front Matter

## Context

We are planning to use [Hugo](https://gohugo.io/) as SSG for this project and host it's source code on [GitHub](http://github.com).

We would like to make [ADR archetype](https://gohugo.io/content-management/archetypes/) to manage ADRs through `hugo new content adrs/NNNN-title.md`. Hugo provides these available formats for front matter:

- [YAML](https://yaml.org/)
- [TOML](https://toml.io/en/)
- [JSON](https://www.json.org/json-en.html)

We want to select a front matter format that would work well with both GitHub and Hugo.

> [!NOTE]
> [YAML frontmatter values](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter?versionId=free-pro-team%40latest&productId=contributing&restPage=writing-for-github-docs%2Cusing-yaml-frontmatter#yaml-frontmatter-values) are only for GitHub Docs, not for regular frontmatter rendering


## Decision

Use YAML metadata because [GitHub does not support TOML and JSON](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)

> The reason is GitHub's support for YAML front matter. If they would support TOML front matter, we would change. But they don't.[^1]

## Alternatives

### JSON

> JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.[^2]

**Verdict**: Not acceptable. JSON is too verbose for front matter usage, and GitHub does not support it for front matter usage.

### TOML

> TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics. TOML is designed to map unambiguously to a hash table. TOML should be easy to parse into data structures in a wide variety of languages.[^3]

**Verdict**: Not acceptable. TOML is too verbose when writing deep heirachical data, but this is should not be a big issue for front matter. The main one that GitHub does not support it for front matter usage.

## Consequences

**Pros**:

- We can ensure that formatting and rendering of front matter will be consistent across different tools and services.
- YAML is pretty ubiqutos format and there are a lot of additinal tooling for it.

**Cons**:

- Hugo uses TOML by default, which means we will have to ensure that YAML front matter is correctly enabled. AFAWK currently Hugo determines front matter autmatically:
    > Hugo determines the front matter format by examining the delimiters that separate the front matter from the page content.[^4]
- YAML is riddled with issues, that led to creation of tools like [StrictYAML](https://github.com/crdoconnor/strictyaml), which may lead to parsing or rendering issues down the line.

## Resources

- [Using YAML frontmatter](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)

[^1]: [Comment on "consistency: hugo new site uses config.toml, but YAML for content"](https://github.com/gohugoio/hugo/issues/5241#issuecomment-423469803), B. E. Pedersen (bep), 2018-09-21
[^2]: [JSON description](https://www.json.org/json-en.html#:~:text=JSON%20%28JavaScript%20Object%20Notation%29)
[^3]: [TOML description](https://toml.io/en/#:~:text=TOML%20aims%20to%20be%20a%20minimal)
[^4]: [How Hugo determines front matter](https://gohugo.io/content-management/front-matter/#:~:text=Hugo%20determines%20the%20front%20matter%20format)

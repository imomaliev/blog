---
title: "Documenting Styleguide Decisions as ADRs"
number: "0007"
status: "accepted"
date: 2025-10-12T13:32:04+01:00
---

# ADR 0007: Documenting Styleguide Decisions as ADRs

<!-- These documents have names that are short noun phrases. -->

## Context

Consistent style and formatting improve readability, give authors a clear framework for producing high‑quality work, and streamline collaboration. Numerous style guides exist for academic papers[^1][^2] and technical documents[^3][^4][^5] for these reasons.

My writing journey is just starting, and my writing style prefrences are changing constantly. It is important for me to document these decisions, as well the motivation and a context behind them.

## Decision

<!-- This section describes our response to these forces. It is stated in full sentences, with active voice. "We **MUST** …" -->
Use `STYLE_GUIDE.md`

## Alternatives

<!-- This section describes **considered** alternatives to the _decision_. Each _alternative_ **MUST** have a **Verdict** specifying the reason it was not choosen. -->

From https://sourcegraph.com/search?q=context:global+file:%5ESTYLE%5B_-%5D%3FGUIDE%5C.md%24+&patternType=keyword&sm=0
```
  26 STYLE-GUIDE.md
  94 STYLEGUIDE.md
 118 STYLE_GUIDE.md
   1 Style-Guide.md
  10 StyleGuide.md
   1 Style_Guide.md
   3 Styleguide.md
 146 style-guide.md
   1 styleGuide.md
   9 style_guide.md
  33 styleguide.md
```

- `CODING_STYLE.md`
- `CODE_STYLE.md`
- `WRITING_STYLE.md`
- `WRITING_GUIDE.md`

## Consequences

<!-- This section describes the resulting context, after applying the _decision_. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future. -->

## Resources

[^1]: https://apastyle.apa.org/
[^2]: https://style.mla.org/
[^3]: https://www.rfc-editor.org/rfc/rfc7322.html
[^4]: https://docs.google.com/document/d/1OalFYqVfxKKMelF79U3B93SjmIEiTnJC12wPJrKeSDM/edit?tab=t.0
[^5]: https://www.w3.org/guide/manual-of-style/
[^6]: https://en.wikipedia.org/wiki/Architectural_decision

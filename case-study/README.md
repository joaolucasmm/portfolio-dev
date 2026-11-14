# Performance measurements

Raw material for a case study on the portfolio's first load: the same measurements taken before
the work and after each pull request, against the published Development preview
(`joaolucasmm.github.io/portfolio-dev/`), on a simulated phone.

| Folder | What was live | PageSpeed Insights | LCP (PSI) |
|---|---|---|---|
| [before](before/README.md) | Development at 3ffef97, and production for context | 92, 92, 92 | 3.2 s |
| [after-56](after-56/README.md) | #56: prerendered first screen, backdrop off the main thread, fonts after first paint | 100, 100, 100 | 0.9 s |
| [after-57](after-57/README.md) | #57: fonts with the stylesheet (no switch while reading), name typed from empty | 97, 97, 100 | 0.9–1.2 s |

Method, the same each time: PageSpeed Insights three times (links in each README), and Lighthouse 12.8
five times from a notebook against the live site (`lighthouse-runs.csv`, one full HTML report).
Scores measured from localhost earlier in the PRs are not comparable to these; see the notes in `before/`.

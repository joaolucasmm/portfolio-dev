# Baseline before the performance work (measured 2026-11-14, ~19:00 BRT)

Mobile, Lighthouse performance only. Nothing deployed from PR #56/#57 yet.

| Site | What it serves |
|---|---|
| `joaolucasmm.github.io/portfolio-dev/` | Development at 3ffef97 (Vite + TypeScript, before #56): the real "before" of the performance work |
| `joaolucasmm.github.io/portfolio/` | Production, last deployed 2025-07-28: the old Create React App site, before the redesign |

## PageSpeed Insights (Google's servers, Moto G Power emulated, Lighthouse 13.6)

| Site | Run | Score | FCP | LCP | TBT | CLS | SI | Report |
|---|---|---|---|---|---|---|---|---|
| portfolio-dev | 1 | 92 | 1.5 s | 3.2 s | 10 ms | 0 | 2.0 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio-dev/64vigaqtmb?form_factor=mobile |
| portfolio-dev | 2 | 92 | 1.5 s | 3.2 s | 40 ms | 0 | 1.9 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio-dev/uojhqdqzu4?form_factor=mobile |
| portfolio-dev | 3 | 92 | 1.5 s | 3.2 s | 10 ms | 0 | 1.7 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio-dev/dmry1t73ic?form_factor=mobile |
| portfolio | 1 | 82 | 1.5 s | 4.8 s | 80 ms | 0.036 | 1.9 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio/htdxnk1zvt?form_factor=mobile |
| portfolio | 2 | 93 | 1.5 s | 3.2 s | 50 ms | 0.043 | 2.2 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio/1zheg0o9sc?form_factor=mobile |
| portfolio | 3 | 81 | 1.5 s | 4.7 s | 150 ms | 0.036 | 2.1 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio/ovykke2iy1?form_factor=mobile |

PSI keeps a report link for a limited time; the numbers above are the record.

## Lighthouse 12.8 locally against the live sites (this notebook, headless Chrome 157, simulated slow 4G)

Five runs each. `lighthouse-runs.csv` has every run; `lighthouse-<site>-1.report.html` is the full report of the first one, with its filmstrip. The raw JSON stays out of the repository (about 0.5 MB a run).

| Site | Score | FCP | LCP | TBT | CLS | FCP / LCP unthrottled |
|---|---|---|---|---|---|---|
| portfolio-dev | 0.82–0.84 | 3.2–3.4 s | 3.6–3.8 s | 0 ms | 0 | 0.66–1.06 s / 1.69–2.24 s |
| portfolio | 0.65–0.70 | 2.9–3.4 s | 4.9–5.4 s | 260–400 ms | 0.036 | 0.70–1.08 s / 0.88–1.31 s |

## Notes for the case study

- The same build scored 0.53–0.66 served from localhost and 0.82–0.84 from GitHub Pages. Same bundle, same long task (0.7–1.2 s of script on load); Lighthouse's simulated blocking time depends on network timings. Compare only like with like: the same tool against the same host, before and after.
- PSI already rates the Development preview 92, so on PSI the room for a better score is small. The gains that show regardless are the unthrottled first and largest paint and the long task on load.
- Production → after the deploy mixes two changes, the leaner content and the performance work.

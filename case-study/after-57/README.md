# After PR #57 (Development at a0268bb, measured 2026-11-14)

Same method as `../before/` and `../after-56/`. #57 loads the fonts with the stylesheet
(`font-display: optional`, the four first-screen faces preloaded) instead of after the first
paint, and the name starts empty and types itself. It also split the styles, which leaves the
compiled CSS byte-identical.

## PageSpeed Insights

| Run | Score | FCP | LCP | TBT | CLS | SI | Report |
|---|---|---|---|---|---|---|---|
| 1 | 97 | 1.2 s | 1.2 s | 20 ms | 0 | 4.3 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio-dev/90d11pu27a?form_factor=mobile |
| 2 | 97 | 1.2 s | 1.2 s | 20 ms | 0 | 4.3 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio-dev/3yf7wj95ux?form_factor=mobile |
| 3 | 100 | 0.9 s | 0.9 s | 0 ms | 0 | 1.4 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio-dev/p9ho8ndr4k?form_factor=mobile |

## Lighthouse 12.8 locally against the live site (five runs)

Every run in `lighthouse-runs.csv`; the full report of the first in `lighthouse-portfolio-dev-1.report.html`.

| | Score | FCP | LCP | TBT | CLS | FCP / LCP unthrottled | Longest task | Main-thread work |
|---|---|---|---|---|---|---|---|---|
| Before | 0.82–0.84 | 3.2–3.4 s | 3.6–3.8 s | 0 ms | 0 | 0.66–1.06 / 1.69–2.24 s | 423–732 ms | 2.9–4.1 s |
| After #56 | 0.99–1.00 | 1.4–1.5 s | 1.4–1.5 s | 10–50 ms | 0–0.013 | 0.43–0.77 / 0.43–0.77 s | 152–274 ms | 2.4–2.9 s |
| After #57 | 0.97–0.99 | 1.5–1.9 s | 2.0–2.3 s | 0–50 ms | 0 | 0.51–0.86 / 0.51–0.86 s | 175–370 ms | 1.9–2.7 s |

## The whole series, PageSpeed Insights

| | Score | FCP | LCP | CLS |
|---|---|---|---|---|
| Before | 92, 92, 92 | 1.5 s | 3.2 s | 0 |
| After #56 | 100, 100, 100 | 0.9 s | 0.9 s | 0.006 |
| After #57 | 97, 97, 100 | 0.9–1.2 s | 0.9–1.2 s | 0 |

- **The fonts cost about 3 points.** Requested before the first paint, the preloaded fonts sit on the simulated
  critical path: about 0.3 s more on FCP and LCP in two of three PSI runs. On localhost it looked like 0.91 → 0.80;
  served from GitHub Pages the cost is far smaller. In return, CLS goes back to 0 and the text never switches font.
- Speed Index went to 4.3 s in two PSI runs (1.2–2.9 s after #56). Speed Index tracks how soon the screen stops
  changing, so the name typing itself in is a likely part of it; not isolated.
- Against the baseline it is still a clear gain: LCP 3.2 s → about 1 s on PSI, unthrottled LCP about 2 s → under 0.9 s.

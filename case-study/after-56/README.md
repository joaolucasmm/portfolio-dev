# After PR #56 (Development at 3157da3, measured 2026-11-14)

Same method as `../before/`: mobile, Lighthouse performance only, against `joaolucasmm.github.io/portfolio-dev/`.
#56 prerenders the first screen, loads the fonts after first paint and keeps the WebGL backdrop off the main thread.

## PageSpeed Insights

| Run | Score | FCP | LCP | TBT | CLS | SI | Report |
|---|---|---|---|---|---|---|---|
| 1 | 100 | 0.9 s | 0.9 s | 0 ms | 0.006 | 1.5 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio-dev/8y4ud8uvqa?form_factor=mobile |
| 2 | 100 | 0.9 s | 0.9 s | 10 ms | 0.006 | 2.9 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio-dev/vq7altpzaj?form_factor=mobile |
| 3 | 100 | 0.9 s | 0.9 s | 20 ms | 0.006 | 1.2 s | https://pagespeed.web.dev/analysis/https-joaolucasmm-github-io-portfolio-dev/4q0l3n50y8?form_factor=mobile |

## Lighthouse 12.8 locally against the live site (five runs)

Every run in `lighthouse-runs.csv`; the full report of the first in `lighthouse-portfolio-dev-1.report.html`.

| | Score | FCP | LCP | TBT | CLS | FCP / LCP unthrottled | Longest task | Main-thread work |
|---|---|---|---|---|---|---|---|---|
| Before | 0.82–0.84 | 3.2–3.4 s | 3.6–3.8 s | 0 ms | 0 | 0.66–1.06 / 1.69–2.24 s | 423–732 ms | 2.9–4.1 s |
| After #56 | 0.99–1.00 | 1.4–1.5 s | 1.4–1.5 s | 10–50 ms | 0–0.013 | 0.43–0.77 / 0.43–0.77 s | 152–274 ms | 2.4–2.9 s |

## Against the baseline

- PSI: 92 → 100; LCP 3.2 s → 0.9 s; FCP 1.5 s → 0.9 s.
- Unthrottled LCP about 2 s → about 0.5 s: the first screen is now the first paint.
- Longest task on load roughly halved or better (up to 732 ms → under 275 ms).
- The small CLS (≤ 0.013) is the swap to the web fonts after the first paint, the switch #57 removes.

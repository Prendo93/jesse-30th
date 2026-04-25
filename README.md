# jesse-30th — "First Year at Hogwarts"

A short, single-player web game wrapping a 30th-birthday gift reveal: a *Harry Potter and the Cursed Child* ticket. Six absurd stages from Hogwarts letter to end-of-year ceremony, then the chest opens and the reveal lands.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (custom torchlit/HUD palette)
- Framer Motion (animations)
- Zustand (state machine store)
- Vitest + React Testing Library (unit/component tests)
- Playwright (e2e tests, Chromium desktop + Pixel 5 mobile)

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server at http://localhost:5173/jesse-30th/ |
| `npm test` | Vitest in watch mode |
| `npm run test:run` | Vitest, single run |
| `npm run test:e2e` | Playwright e2e (auto-spawns dev server) |
| `npm run test:e2e:ui` | Playwright UI debugger |
| `npm run test:all` | Vitest + Playwright (the green-gate for shipping) |
| `npm run build` | TypeScript check + Vite production build to `dist/` |
| `npm run deploy` | Publish `dist/` to the `gh-pages` branch |

## Useful URL params (dev only)

- `?stage=potions` — jump straight to a stage (any of `letter|sorting|potions|charms|flying|ceremony|gift`).
- `?reset=1` — clear the in-progress store and start over from the letter.

## Deploying to GitHub Pages

1. Push `master` to GitHub.
2. In the repo settings, enable Pages with source = "GitHub Actions" — the `.github/workflows/deploy.yml` workflow will publish on every push to `master` after tests pass.
3. Alternative one-shot: `npm run deploy` (uses `gh-pages` to push to a `gh-pages` branch).

The Vite `base` is hard-coded to `/jesse-30th/`. If the repo is renamed, update `base` in `vite.config.ts` and the `webServer.url` in `playwright.config.ts`.

## Reference assets (gitignored)

`docs/reference/` holds the original PS1/PS2/PC HP screenshots used as a mood-board for the early-2000s aesthetic. They are **not** shipped — see `.gitignore`.

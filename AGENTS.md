# AGENTS.md

## Cursor Cloud specific instructions

This is a Korean cosmetic surgery event management dashboard (바비톡 이벤트 관리). It is a frontend-only React SPA with no backend or database — all data is hardcoded mock data.

### Repository structure

The `main` branch contains only an empty README. Actual application code lives on feature branches:
- `cursor/-bc-2db8a469-...` — Event management screen (광고 + 소재 tabs)
- `cursor/-bc-a0043d3f-...` — Ad management screen (광고 관리)

These two branches conflict and cannot be merged together without resolution (overlapping files with different implementations).

### Tech stack

React 19, TypeScript 5.9, Vite 7, Tailwind CSS 3, ESLint 9. Uses `npm` (lockfile: `package-lock.json`).

### Commands

See `package.json` scripts:
- `npm run dev` — starts Vite dev server on port 5173
- `npm run build` — runs `tsc -b && vite build`
- `npm run lint` — runs ESLint
- `npm run preview` — serves production build

### Notes

- No environment variables or `.env` files needed.
- No external services, databases, or Docker required.
- The app is entirely client-side with mock data in `src/data/`.

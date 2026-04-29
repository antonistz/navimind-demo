# NaviMind - Route Intelligence Demo

AI-optimized maritime routing · React 19 + TypeScript · Vite 7

---

## Background

NaviMind was originally presented as a UI demo at the **GreenTech Challenge 2025 finals**. The Python route optimization engine is proprietary and is not included in this repository.

***This repo has since been rebuilt from the ground up as a fully typed, tested, production-track frontend + backend - evolving well beyond the original demo, and shaping into a PoC.***

---

## Current status

**Phase 1 complete** - interactive demo running against a mock API.

| Layer | Status |
|---|---|
| TypeScript migration (strict mode) | Done |
| Vitest smoke tests (33 passing) | Done |
| Multi-voyage selector (4 routes) | Done |
| Mock API with 800 ms simulated delay | Done |
| Interactive AI chat (keyword-matched responses) | Done |
| Wave danger zone overlays (toggleable) | Done |
| Recharts fuel trend (AreaChart) | Done |
| Shimmer skeleton loading states | Done |
| FastAPI backend + real optimization | Phase 2 |
| Claude API integration | Phase 2 |
| Auth, vessel profiles, live simulation | Phase 3 |

---

## Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite 7** + **Vitest** + React Testing Library
- **react-leaflet v5** for map rendering
- **Recharts** for fuel consumption charts
- **Tailwind CSS** + custom CSS

---

## Running locally

```bash
npm install
npm run dev
```

Tests:

```bash
npm test
```

Type check:

```bash
npx tsc --noEmit
```

---

## Known issues

- Route coordinates use straight great-circle waypoints and can cross land in some voyages — proper maritime waypoints are tracked in [issue #1](../../issues/1).

---

## Roadmap

- **Phase 2** — FastAPI backend, PostgreSQL/PostGIS, Redis, WebSocket optimization progress, real Claude API integration
- **Phase 3** — Auth (Clerk), vessel profiles, live AIS simulation, KML/PDF export, Vercel + Railway deployment

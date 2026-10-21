# Thapelo ❤️ Given — Countdown to 29 November 2026

A cinematic, single-page romantic countdown built with React 19 + Vite. It counts down to
**local midnight at the start of 29 November 2026** — the day Thapelo Boya and Given Maheshu
finally see each other again.

## Run it locally

```bash
cd /Users/thapelo/Desktop/countdown
npm install      # only needed once
npm run dev      # http://localhost:5173
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload on <http://localhost:5173> |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over the whole project |

> Node **22.12+** is recommended. The project is pinned to `vite@5.4.11`, which also runs fine
> on older Node 18/20/21 (used here) — Vite 8 needs Node 22.12+ because of rolldown.

## What's inside

- **Hero** — "THAPELO BOYA ♥ GIVEN MAHESHU" in a script face, with a rose illustration and a
  gentle heartbeat on the heart.
- **Live countdown** — days / hours / minutes / seconds on odometer-style rolling digits,
  re-aligned to the wall clock every second so nothing drifts or skips.
- **Love letter** — "Open my heart" opens a wax-sealed letter modal (portalled to `document.body`
  so it is never trapped by a transformed ancestor). Escape and the close button both dismiss it.
- **Heart surprise** — tap the floating heart for one of 14 handwritten messages.
- **Reunion celebration** — once the clock passes 29 Nov 2026 the timer is replaced by the
  reunion card and a burst of hearts.
- **Atmosphere** — aurora glow, grain, a city skyline, a lovers silhouette, drifting hearts,
  sparkles and stars.
- **Ambience** — an opt-in Web Audio pad + heartbeat. It never autoplays; the toggle is off
  until you click it, and the `AudioContext` is closed again when you switch it off.
- **Accessibility** — `prefers-reduced-motion` is honoured, the modal traps focus, restores it on
  close and locks background scroll, and all decorative layers are `aria-hidden` / `pointer-events: none`.

## Project layout

```
src/
  App.jsx              page composition, loader gate, reunion trigger
  App.css              all styling and keyframes
  index.css            reset, design tokens, base type
  components/          Hero, Rose, Countdown, RollingNumber, LoveLetter, HeartSurprise,
                       InfinityBond, ReunionCelebration, FloatingHearts, Atmosphere,
                       LoversSilhouette, Footer, LoadingScreen, SoundToggle
  hooks/
    useCountdown.js    target date + the live timer
    useReducedMotion.js
    useAmbientSound.js opt-in Web Audio ambience
  data/messages.js     hero copy, the letter, reunion message, 14 surprise messages
```

The target date lives in one place: `REUNION_DATE` in `src/hooks/useCountdown.js`. It is built
from local date parts, so every visitor counts down to midnight in **their own** timezone.

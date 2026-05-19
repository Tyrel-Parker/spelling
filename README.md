# Spelling

An arcade-style typing game built with vanilla TypeScript and Canvas 2D. Words zigzag down the screen centipede-style — type them and press Enter to fire the turret and destroy them before they reach the bottom.

## Gameplay

- Words move horizontally across the screen, stepping down each time they hit an edge
- Type a word and press **Enter** or **Space** to fire
- The turret auto-aims at the lowest word matching your current input (highlighted in white)
- Typing an exact match fires a hit shot; anything else is a visible misfire at a wrong angle
- Words are colored by tier — green (easy) through red (hard)
- Score = `word length × 10 × height bonus × speed multiplier × difficulty multiplier`; destroying words higher up pays more
- **3 lives** to start; earn an extra life every 5,000 points (max 5)
- Top 10 high scores stored in `localStorage`

## Difficulty progression

Two multipliers tick up automatically over time:

| Multiplier | Rate | Effect |
|---|---|---|
| Speed | +0.1 per 20s | Words move faster |
| Difficulty | +0.1 per 25s | Higher word tiers, faster spawn rate, more simultaneous words |

## Word tiers

| Tier | Color | Description | Examples |
|---|---|---|---|
| 0 | Green | Short, phonetic | cat, fly, bug |
| 1 | Cyan | Common, 4–6 letters | apple, heart, river |
| 2 | Yellow | Tricky spelling | rhythm, caught, through |
| 3 | Orange | Longer, irregular | beautiful, necessary, separate |
| 4 | Red | Complex, easy to mistype | accommodate, conscientious, reconnaissance |

## Stack

- **Frontend:** Vite + TypeScript, Canvas 2D API
- **Audio:** Web Audio API (synthesized — no audio files)
- **Scores:** `localStorage` (no backend)
- **Hosting:** GitHub Pages with custom domain

## Local development

```bash
npm install
npm run dev
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow which builds and deploys to GitHub Pages automatically.

To set up the custom domain:
1. Enable GitHub Pages in repo Settings → Pages → Source: GitHub Actions
2. Add a CNAME record pointing `spelling.tyrelparker.dev` → `tyrelparker.github.io`

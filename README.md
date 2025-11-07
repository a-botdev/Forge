# Forge v1.0 – Solana Meme-Coin Launch System

Forge is an autonomous command suite that prints every asset you need to launch a Solana meme-coin in minutes. It orchestrates image generation, a V0-compatible landing page, a Chrome hype extension, and a full X (Twitter) launch kit — all from a single `/forge` slash command.

## What’s Included
- `/forge` orchestrator with four parallel agents (Images, Website, Extension, Twitter).
- Opinionated `.cursor` rules, hooks, and command files for coordinated runs.
- Reusable templates for V0 landing pages and Chrome extensions.
- Node scripts for Ideogram API calls, Sharp-based resizing, and Twitter API automation.
- Structured output folders under `outputs/` with a shared `run-log.md`.

## Requirements
- Node.js ≥ 18.18
- npm, pnpm, or yarn (scripts use plain `node`)
- API credentials  
  - `IDEOGRAM_API_KEY`  
  - `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`

Store secrets in your preferred manager (Cursor secrets, `.env`, etc.).

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure secrets in your environment.
3. Open Cursor and run `/forge`. Answer the intake questions:
   - Project name
   - Ticker (2–5 chars)
   - Description / lore
   - Base image prompt
4. Wait for the Images, Website, Extension, and Twitter agents to finish.

Generated artefacts land inside `outputs/`:
- `outputs/images/` – raw Ideogram PNGs and Sharp-resized variants.
- `outputs/website/` – V0 landing spec + implementation notes.
- `outputs/extension/` – Chrome Manifest V3 bundle and instructions.
- `outputs/social/` – Thread drafts, one-liners, and scheduling plan.
- `outputs/run-log.md` – Central log of prompts, API responses, and action items.

## Scripts
- `npm run images` → call Ideogram API (`scripts/ideogram-api.js`)
- `npm run resize` → generate PNG & WebP size variants (`scripts/resize-sharp.js`)
- `npm run twitter:preview` → validate thread copy (`scripts/twitter-api.js --preview`)
- `npm run twitter:publish` → publish thread with the X API (free tier)

## Repository Layout
```
.cursor/
  commands/        Slash command orchestrators
  hooks/           Prompt pre/post processors
  rules.md         Execution guardrails
scripts/            API clients & utilities
templates/          Website + Chrome extension blueprints
outputs/            Generated artefacts (git-kept)
```

## Safety & Disclaimers
- No financial advice — always DYOR and comply with regional regulations.
- Keep API keys out of version control.
- Review generated copy before publishing; the operator makes the final call.

Forge is built for degens who prefer shipping over waiting. Mint fast, ship louder. 🔥


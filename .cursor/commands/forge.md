# /forge — Forge v1.0 Meme-Coin Launch System

## Purpose
Run this command to spin up every asset required to launch a Solana meme-coin in one pass. The command gathers a creative brief from the operator, aligns all downstream agents, and triggers four specialized workflows that execute in parallel.

## Intake
Prompt the operator for the following inputs (all are required):

- **Project Name** – The branded name of the meme-coin project.
- **Ticker** – 2–5 character symbol (e.g. `$FORGE`).
- **Description** – Voice, lore, tone, utility hooks, and target audience.
- **Base Image Prompt** – A rich text description to seed the hero artwork.

Persist the responses as shared context keys (`projectName`, `ticker`, `description`, `basePrompt`) so every agent can access them.

## Parallel Agents
Once intake is complete, dispatch the following four agents concurrently. Share the same context bundle with each agent and wait for all of them to finish before summarising results.

1. **Images** → `@Images` (see `.cursor/commands/images.md`)
2. **Website** → `@Website` (see `.cursor/commands/website.md`)
3. **Chrome Extension** → `@Extension` (see `.cursor/commands/extension.md`)
4. **Twitter** → `@Twitter` (see `.cursor/commands/twitter.md`)

Each agent is responsible for producing assets and saving artefacts under `outputs/`. If any agent reports a blocking error, surface it immediately and offer to retry that pathway while keeping successful artefacts intact.

## Deliverable Checklist
- ✅ Image bundle (`outputs/images/`) with an Ideogram-generated hero artwork and pre-sized variants (PNG + WebP).
- ✅ Landing page specification compatible with V0 (`outputs/website/`).
- ✅ Chrome extension starter kit (`outputs/extension/`) ready for packaging and upload to Chrome Web Store.
- ✅ Twitter launch kit (`outputs/social/`) containing thread copy, hashtags, and media references.
- ✅ A run log capturing API responses, filenames, and follow-up suggestions (`outputs/run-log.md`).

## Post-Run Summary
After all agents finish, generate a final operator summary that includes:

- Launch checklist with quick status for each agent.
- Direct links (relative paths) to generated artefacts.
- Suggested next manual steps (e.g. mint token on Solana, publish landing page, schedule tweets).

Keep the tone energetic, meme-friendly, and actionable while remaining precise about what was delivered.


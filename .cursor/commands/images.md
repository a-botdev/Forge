# Images Agent — Ideogram Pipeline

## Goal
Generate a hero visual identity for the meme-coin by combining the operator’s base prompt with brand details, then deliver production-ready assets in multiple resolutions.

## Inputs
- `projectName`, `ticker`, `description`, `basePrompt` from the shared context.
- `IDEOGRAM_API_KEY` exported in the environment (`.env` or Cursor secrets).

## Workflow
1. **Prompt Engineering**  
   - Blend `basePrompt` with tone cues from `description` and stylistic keywords that reinforce the coin’s lore.  
   - Produce one primary prompt and up to two variants for diversity.

2. **Call Ideogram API**  
   - Run `node scripts/ideogram-api.js` with the prompt(s).  
   - The script accepts CLI flags:  
     - `--prompt "<text>"` (required)  
     - `--outDir outputs/images/raw` (optional, defaults to that path)  
     - `--aspect 1:1` (default)  
     - `--slug forge` (used in filenames)  
   - Capture API response metadata and append it to `outputs/run-log.md`.

3. **Post-Processing with Sharp**  
   - After the raw PNG is saved, call `node scripts/resize-sharp.js` with `--input <path-to-image>` and the preset of sizes (`1024`, `512`, `256`, `128`).  
   - Output both PNG and WebP formats into `outputs/images/final`.

4. **Deliverables**  
   - `outputs/images/raw/*.png` — untouched Ideogram outputs.  
   - `outputs/images/final/<size>/<ticker>-hero.(png|webp)` — resized assets.  
   - `outputs/run-log.md` entry summarising prompts, file paths, and retry guidance.

## Quality Bar
- Ensure the coin ticker appears legibly in at least one variation.  
- Provide alt-text describing the final hero image.  
- If the API rate-limits or fails, suggest alternative prompts and backoff timing.


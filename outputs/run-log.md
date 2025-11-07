# Forge Run Log — KOL Wallet Tracker

## Intake Overview
- **Project Name:** KOL Wallet Tracker
- **Ticker:** $KWT
- **Description:** Real-time Solana KOL wallet tracking with meme alerts
- **Base Image Prompt:** cyberpunk fox wearing sunglasses holding Solana logo, neon purple, viral meme style, ultra detailed

---

## Images Agent
- **Status:** ⚠️ API key required
- **Primary Prompt:** `cyberpunk fox wearing sunglasses holding a glowing Solana logo coin, neon purple city skyline, vaporwave lighting, viral meme style, ultra detailed, dynamic motion blur, 4k digital art`
- **Variant Prompt:** `neon cyberpunk fox influencer streaming live data holograms, Solana emblem floating, purple and teal lighting, meme-ready composition, sharp line art`
- **Action Items:**  
  1. Export `IDEOGRAM_API_KEY` or configure it via Cursor secrets.  
  2. Run `node scripts/ideogram-api.js --prompt "<primary prompt>" --slug kwt` to fetch the hero artwork.  
  3. Execute `node scripts/resize-sharp.js --input outputs/images/raw/<filename>.png --sizes 1024,512,256,128 --slug kwt-hero` to produce PNG + WebP variants.
- **Alt Text Plan:** The final hero should depict a stylish cyberpunk fox influencer clutching a luminous Solana logo, framed by neon-purple city lights and holographic wallet data streams.

---

## Website Agent
- **Status:** ✅ Completed
- **Output:** `outputs/website/landing.json`
- **Notes:** Landing page references the forthcoming hero artwork at `../images/final/1024/kwt-hero.png`. Includes lore, roadmap, tokenomics, and meme quote sections tailored to KOL Wallet Tracker.

---

## Chrome Extension Agent
- **Status:** ✅ Completed (awaiting image assets)
- **Outputs:**  
  - `outputs/extension/manifest.json` (Manifest V3)  
  - `outputs/extension/popup.html`  
  - `outputs/extension/README.md`
- **Pending:** Generate icon assets (16/32/48/128) from the hero image and place them in `outputs/extension/assets/`.

---

## Twitter Agent
- **Status:** ✅ Completed (draft mode)
- **Outputs:**  
  - `outputs/social/thread.md` — 7-tweet launch thread ready for scheduling  
  - `outputs/social/snippets.md` — one-liners and spicy replies  
  - `outputs/social/schedule.md` — 48-hour posting plan
- **Next Step:** Set `TWITTER_*` credentials and run `node scripts/twitter-api.js --preview outputs/social/thread.md` to validate, then `--publish` when ready.

---

## Follow-Up Checklist
1. Generate hero artwork via Ideogram and re-run Sharp resizing.
2. Drop resized icons into `outputs/extension/assets/` and verify popup rendering.
3. Import `outputs/website/landing.json` into V0 and hook up mint + analytics links.
4. Schedule the launch thread using the provided UTC timestamps.
5. After publishing, archive final assets and update this log with transaction hashes or performance notes.


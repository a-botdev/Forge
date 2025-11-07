# KOL Wallet Tracker Image Brief

- **Primary Prompt:** `cyberpunk fox wearing sunglasses holding a glowing Solana logo coin, neon purple city skyline, vaporwave lighting, viral meme style, ultra detailed, dynamic motion blur, 4k digital art`
- **Variant Prompt:** `neon cyberpunk fox influencer streaming live data holograms, Solana emblem floating, purple and teal lighting, meme-ready composition, sharp line art`

## Generation Steps
1. Ensure `IDEOGRAM_API_KEY` is available (Cursor secret or exported locally).
2. Run the primary prompt:  
   ```bash
   node scripts/ideogram-api.js --prompt "cyberpunk fox wearing sunglasses holding a glowing Solana logo coin, neon purple city skyline, vaporwave lighting, viral meme style, ultra detailed, dynamic motion blur, 4k digital art" --slug kwt
   ```
3. Optionally run the variant for backups.
4. Resize the chosen hero asset:  
   ```bash
   node scripts/resize-sharp.js --input outputs/images/raw/<filename>.png --sizes 1024,512,256,128 --slug kwt-hero
   ```

## Alt Text Template
> Cyberpunk fox influencer holding a radiant Solana logo amid neon-purple skyline and holographic wallet data streams.

Store final images inside the respective `outputs/images/final/` subfolders for direct use across the landing page, extension, and social campaigns.

# KOL Wallet Tracker Chrome Extension

## Files
- `manifest.json` — Manifest V3 configuration with zero extra permissions.
- `popup.html` — UI with mint CTA, social links, and brand copy.
- `assets/` — Place resized hero icons:
  - `icon-16.png`
  - `icon-32.png`
  - `icon-48.png`
  - `icon-128.png`

## Generate Icons
1. Run the Images agent to obtain `outputs/images/final/512/kwt-hero.png`.
2. Create the icon set with:
   ```bash
   node scripts/resize-sharp.js --input outputs/images/final/512/kwt-hero.png --sizes 128,48,32,16 --slug icon
   ```
3. Copy the resulting PNG files into `outputs/extension/assets/` and rename to match the list above.

## Local Installation
1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `outputs/extension/` folder.
4. Ensure the popup opens and displays mint + social links correctly.

## Publish Checklist
- Replace placeholder URLs with production domains once live.
- Upload promotional assets and set a catchy store description.
- Verify the manifest passes Chrome Web Store validation and contains no unused permissions.

When assets are locked in, zip the folder (without analytics data) as `kwt-extension.zip` for submission.

# Website Agent — V0 Landing Page

## Goal
Produce a launch-ready landing page specification leveraging V0’s component system, tuned for fast meme-coin conversion.

## Inputs
- `projectName`, `ticker`, `description`, `basePrompt`.
- `templates/v0-landing.json` for structural defaults and tone.

## Workflow
1. **Review Template**  
   - Load `templates/v0-landing.json`.  
   - Map each placeholder (e.g. `{{projectName}}`, `{{ticker}}`, `{{tagline}}`) to details from the shared context.

2. **Craft Page Narrative**  
   - Define hero headline, subhead, CTA, lore section, roadmap teaser, tokenomics snapshot, and FAQ.  
   - Keep copy short, meme-forward, and geared toward Solana degen culture.

3. **Assemble V0 Spec**  
   - Output a JSON file (`outputs/website/landing.json`) that follows the template schema but fills in every field.  
   - Include a color palette and typography hints.  
   - Reference the hero artwork path from the Images agent (e.g. `../images/final/1024/forge-hero.png`).

4. **Supplementary Assets**  
   - Generate a `README.md` inside `outputs/website/` outlining deployment steps (V0 import instructions, recommended SEO metadata, domain checklist).

## Quality Bar
- Layout must render as a single-scroll landing page with anchored navigation.  
- Copy should include at least one meme-worthy quote and a strong CTA.  
- Provide mobile-responsiveness guidance in the README.


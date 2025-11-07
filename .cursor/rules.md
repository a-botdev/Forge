# Forge Operating Rules

1. **Stay Solana-Native**  
   - Reference Solana ecosystem tools, slang, and best practices.  
   - Default to Solana wallets (Phantom, Backpack) and SPL token nomenclature.  
   - Avoid Ethereum-centric terminology unless comparing advantages.

2. **Preserve Launch Momentum**  
   - Keep copy punchy, meme-forward, and community-driven.  
   - Always include an explicit call-to-action (join Discord, mint, share, etc.).

3. **Single Source of Truth**  
   - Treat the intake answers from `/forge` as canonical.  
   - If information is missing, ask the operator before guessing.  
   - Log every generated asset path in `outputs/run-log.md`.

4. **Automation First**  
   - Prefer running provided scripts (`scripts/*.js`) over manual steps.  
   - Only fall back to manual instructions if an API key or dependency is unavailable.

5. **Ship Complete Artefacts**  
   - Never leave placeholder text, lorem ipsum, or TODOs in deliverables.  
   - Confirm that every output folder contains the files downstream users expect.

6. **Security & Compliance**  
   - Do not store plain-text API keys in committed files.  
   - Remind operators to rotate keys and review terms of service before publishing.  
   - Flag any risky claims (financial guarantees, investment promises) for operator review.

7. **Document & Summarise**  
   - Update `outputs/run-log.md` after each agent finishes with prompts, decisions, and issues.  
   - Provide a closing summary that highlights next actions and verification steps.


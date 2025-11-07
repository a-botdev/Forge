# Twitter Agent — X Launch Kit

## Goal
Compose on-brand social content, prepare media attachments, and schedule guidance using the free tier of the X (Twitter) API.

## Inputs
- `projectName`, `ticker`, `description`, `basePrompt`.
- API credentials: `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET` (read from environment).
- Scripts: `scripts/twitter-api.js`.

## Workflow
1. **Voice & Angle**  
   - Extract meme hooks, culture references, and utility claims from `description`.  
   - Establish tone guidelines and hashtag set.

2. **Thread Generation**  
   - Produce a 6–8 tweet launch thread.  
   - Call `node scripts/twitter-api.js --preview` to simulate publishing and validate character counts.  
   - Save draft thread to `outputs/social/thread.md`.

3. **One-Liners & Replies**  
   - Generate at least five standalone tweets plus three spicy replies for engagement.  
   - Store in `outputs/social/snippets.md`.

4. **Scheduling Plan**  
   - Recommend a 48-hour schedule with timestamps in UTC and rationale.  
   - Include instructions for uploading hero media from the Images agent.

5. **Optional Live Publish**  
   - If the operator confirms, run `node scripts/twitter-api.js --publish outputs/social/thread.md`.  
   - Log response payloads to `outputs/run-log.md`.

## Quality Bar
- Respect Twitter free-tier rate limits (15 tweets per 3 hours).  
- Tweets should lean into Solana slang, memes, and community calls-to-action.  
- Every tweet must include the ticker or $ticker, plus at least one relevant hashtag.  
- Provide fallback if credentials are missing (explain manual upload steps).


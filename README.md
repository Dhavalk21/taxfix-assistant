# Taxfix AI Tax Assistant - Case Study Prototype

A working AI assistant for solo self-employed Taxfix users, built around a
curated, risk-tagged knowledge base and a four-tier trust system
(direct / hedge / escalate / refuse).

## Deploy to Vercel (5 minutes)

1. Push this folder to a new GitHub repo:
   ```
   git init
   git add .
   git commit -m "Taxfix AI assistant prototype"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com), click **Add New → Project**, and
   import the repo. Vercel auto-detects Next.js — no config needed.

3. Before deploying, add one environment variable:
   - `ANTHROPIC_API_KEY` → your Anthropic API key
   (Project Settings → Environment Variables. Do this before the first
   deploy, or redeploy after adding it.)

4. Deploy. You'll get a live URL like `taxfix-assistant.vercel.app`.

## Run locally

```
npm install
cp .env.example .env.local   # add your real key
npm run dev
```
Visit http://localhost:3000

## What's in here

- `lib/knowledge-base.json` — the 18 curated tax rules, each tagged with
  risk level, financial consequence, and trust tier. This is the assistant's
  only source of truth — it does not answer from general model knowledge.
- `app/api/chat/route.ts` — server-side API route. The Anthropic API key
  stays server-side via an environment variable; it's never exposed to the
  browser.
- `app/page.tsx` — the chat UI. Renders each answer's trust tier visually
  (color-coded rail + badge) so the routing logic is legible at a glance.
- `prompts/system-prompt.md` — the source-of-truth system prompt (also
  inlined into the API route for deployment).

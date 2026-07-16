# Taxfix AI Tax Assistant - Case Study Prototype

A working AI assistant for solo self-employed Taxfix users, built around a
curated, risk-tagged knowledge base and a four-tier trust system
(direct / hedge / escalate / refuse).

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

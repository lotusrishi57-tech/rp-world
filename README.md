# RP World

A responsive Next.js starter for custom AI character roleplay.

## Included
- Character creation
- Local character persistence
- Chat history in localStorage
- Tanglish / English / Tamil preference
- `*action text*` italics
- Streaming AI responses
- Mobile-friendly chat UI

## Run locally

```bash
npm install
cp .env.example .env.local
# Put your API key in .env.local
npm run dev
```

Open http://localhost:3000

## Production database

The current starter stores characters and messages locally in the browser so it works immediately. For multi-device accounts, replace the localStorage layer with Supabase Auth + PostgreSQL and store messages server-side.

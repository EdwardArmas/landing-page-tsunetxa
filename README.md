# Tsunexa landing

Standalone Next.js landing using the existing Tsunexa brand. Start with **LEEME-PRIMERO.md** for installation instructions in Spanish.

```sh
pnpm install --frozen-lockfile
pnpm dev --port 3001
pnpm lint
pnpm build
```

The page contains illustrative product data, not a live customer workspace. Set `NEXT_PUBLIC_APP_URL` to the existing application origin to enable its login link. No Supabase connection is made by this landing.

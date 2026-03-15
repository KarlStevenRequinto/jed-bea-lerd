# Auto Real Estate Ecommerce

Next.js 16 + TypeScript + Tailwind + Supabase app for automotive and property listings.

## Local Development

1. Install dependencies:
```bash
npm install
```
2. Create local env file:
```bash
copy .env.example .env.local
```
3. Fill values in `.env.local`.
4. Run the app:
```bash
npm run dev
```

## Required Environment Variables

- `NEXT_PUBLIC_SITE_URL`
  - Local: `http://localhost:3000`
  - Production: your deployed HTTPS domain
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, never expose to client code)

## Deployment (Vercel + Supabase)

1. Push repo to GitHub/GitLab/Bitbucket.
2. In Vercel, import the project.
3. Set build settings:
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Output: default
4. Add environment variables (Production and Preview as needed):
   - `NEXT_PUBLIC_SITE_URL=https://<your-domain>`
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
   - `SUPABASE_SERVICE_ROLE_KEY=...`
5. In Supabase Auth settings:
   - Add Site URL: `https://<your-domain>`
   - Add redirect URL: `https://<your-domain>/auth/callback`
6. Run SQL migrations in order from `supabase/migrations/` in your target Supabase project.
7. Trigger deployment.

## Production Verification Checklist

- Home and products pages load listings.
- Login/register flows work.
- Email verification redirect returns to `/auth/callback` successfully.
- Forgot password reset flow works end-to-end.
- No client-exposed server secrets.

## Notes

- This project uses `next build --webpack` due to custom webpack SVG handling.
- If local build fails to fetch Google Fonts in restricted networks, deployment on Vercel should still succeed with normal internet egress.

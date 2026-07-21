# MindVersa

AI software agency website built with Next.js.  
Live site: [https://www.mindversa.dev](https://www.mindversa.dev)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a `.env.local` file in the project root (do not commit it) with:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@mindversa.dev
CONTACT_TO_EMAIL=
NEXT_PUBLIC_CONTACT_EMAIL=hello@mindversa.dev
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production on Vercel, set the same keys and use:

```bash
NEXT_PUBLIC_SITE_URL=https://www.mindversa.dev
```

## Scripts

- `npm run dev` — local development (Turbopack)
- `npm run build` — production build + sitemap
- `npm start` — run production build

# Synergy Brix

Public corporate website for Synergy Brix, built with React, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion, and Lucide React.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Lucide React
- React Hook Form + Zod

## Getting started

1. Install dependencies:
   npm install
2. Start the development server:
   npm run dev
3. Build for production:
   npm run build

## Project notes

- This is a frontend-only public website.
- There is no admin dashboard, database, authentication flow, or private portal.
- The contact form is frontend-ready and can later be connected to a backend or form provider via the environment variable `VITE_CONTACT_PROVIDER_URL`.
- SEO metadata, sitemap, robots.txt, and branded favicon are included.

## Environment variables

Create a `.env` file if you want to connect the contact form to a real provider:

```bash
VITE_CONTACT_PROVIDER_URL=https://example.com/contact
```

## Production deployment

The app is static-frontend ready and can be deployed to any static hosting platform such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

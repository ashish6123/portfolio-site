# Ashish Ranjan, portfolio

A personal portfolio built as a book you page through. Next.js (App Router), TypeScript and Tailwind CSS, statically generated, deployed on Vercel.

## Run

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Turn pages with the arrow keys, the buttons under the book, the chapter tabs, or a swipe on touch screens.

## Check and build

```bash
npm run check
npm run build
npm run start
```

`check` runs the TypeScript compiler, ESLint and Prettier. `build` must finish with zero errors before a deploy.

## Edit content

All copy lives in typed files, so no page code needs to change for content updates:

- `data/site.ts`: name, positioning, links, about text, education
- `data/experience.ts`: roles
- `data/projects.ts`: project cards and the per-project pages at `/projects/[slug]`
- `public/resume.pdf`: the downloadable resume (keep the phone number out of it)

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New Project**, import the repository and keep the detected Next.js settings.
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` with the final address, for example `https://ashishranjan.vercel.app`. It is used for canonical URLs, the sitemap, Open Graph tags and JSON-LD.
4. Deploy. Every push to `main` deploys to production, and every pull request gets a preview URL.
5. In the project's **Analytics** tab, enable Web Analytics. It sets no cookies, so no consent banner is needed.

From the command line instead: `npx vercel` for a preview, `npx vercel --prod` for production.

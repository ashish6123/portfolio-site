@AGENTS.md

# Portfolio coding standards

## Stack

- Next.js 16 App Router with `cacheComponents` on. Read `node_modules/next/dist/docs/` before using an API you have not used in this repo. Route segment config such as `dynamicParams` is not allowed.
- TypeScript strict. Tailwind CSS v4 for layout and type utilities; the book mechanics and theme tokens live in `app/globals.css`.
- No animation libraries. CSS transitions only, and every motion must stop under `prefers-reduced-motion`.

## Content rules (apply to every string on the site)

- Never use em dashes. Use commas, periods or colons.
- Direct and concrete. No buzzwords such as "passionate", "synergy" or "cutting-edge".
- Do not invent metrics, users, revenue or skills. Only use facts already in `data/`.
- Never show the phone number anywhere, including `public/resume.pdf`.
- Infivector work is proprietary: high level only. No customer names, internal metrics, architecture details or screenshots. The title is Forward Deployed Engineer, never "backend engineer".

## Structure

- Content lives in `data/*.ts`. Pages read from there; do not hard-code copy in components when it belongs in data.
- `components/Book.tsx` renders a list of `BookPage`s. Each page appears exactly once in the DOM: leaf k holds page k on its front and the chapter opener (`verso`) of page k + 1 on its back. Keep that invariant so content stays crawlable and screen readers see each page once.
- Hidden leaves are `inert`. Keep focus, keyboard (arrows, Page Up/Down, Home, End) and hash links working when changing the reader.
- Page ids double as URL hashes (`/#projects`). Do not rename them without updating links.

## Styling

- Colors come only from the tokens in `globals.css` (`--paper`, `--ink`, `--accent` and so on), defined for dark (default) and light. Never use a literal color in a component.
- Do not name a CSS class after a Tailwind utility (for example `contents`, `hidden`, `block`): Tailwind's rule wins and breaks the layout.
- Check every change at 375px, 768px and 1280px in both themes. The page body must never scroll sideways.

## Before committing

- `npm run check` and `npm run build` must pass with zero errors or warnings.
- Small commits with clear messages.

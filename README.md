# Freelens

Time, invoices & agreements for freelancers. Track your hours, draft agreements, send invoices and get paid.

This repository contains the Freelens marketing site and app shell, built with SvelteKit.

## Tech stack

- [SvelteKit](https://svelte.dev/docs/kit) + [Svelte 5](https://svelte.dev) (runes), TypeScript, [Vite](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com) with the typography and forms plugins
- [Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) for i18n (`en`, `es`)
- [mdsvex](https://mdsvex.pngwn.io) for Markdown in Svelte
- Vitest (unit and component tests) and Playwright (end-to-end tests)
- ESLint and Prettier
- [Umami](https://umami.is) for event tracking

## Getting started

Requires [Bun](https://bun.sh) (or Node.js with npm).

```sh
bun install        # or: npm install
bun run dev        # or: npm run dev
```

Open the local URL that Vite prints (usually http://localhost:5173).

## Scripts

| Script                | Description                                   |
| --------------------- | --------------------------------------------- |
| `npm run dev`         | Start the development server                  |
| `npm run build`       | Create a production build                     |
| `npm run preview`     | Preview the production build                  |
| `npm run check`       | Type-check with `svelte-check`                |
| `npm run lint`        | Check formatting (Prettier) and lint (ESLint) |
| `npm run format`      | Format the codebase with Prettier             |
| `npm run test:unit`   | Run Vitest                                    |
| `npm run test:e2e`    | Run Playwright tests                          |
| `npm test`            | Run unit and e2e tests                        |

## Project structure

```
src/
  routes/            Pages and layout (+page.svelte, +layout.svelte)
  lib/
    components/      UI sections (Hero, Features, Workflow, Changelog, Footer, ...)
    changelog.ts     Release notes, newest first
    motion.ts        Animation helpers
    paraglide/       Generated i18n runtime
messages/            Translation files (en.json, es.json)
static/              Fonts and robots.txt
```

## Changelog

Release notes live in [src/lib/changelog.ts](src/lib/changelog.ts) and render in the site's changelog section. Add a new entry at the top for each release.

## Deployment

The project uses [`adapter-auto`](https://svelte.dev/docs/kit/adapter-auto). To deploy to a specific platform, install the matching [adapter](https://svelte.dev/docs/kit/adapters) and update [svelte.config.js](svelte.config.js).

```sh
npm run build
npm run preview
```

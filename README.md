# Rick & Morty Characters — Nuxt 4 (Interview Task)

Single-page Nuxt app that lists and searches Rick & Morty characters and shows character detail pages. 

## Tech Stack
- Nuxt 4 + Vue 3 + TypeScript
- Tailwind CSS
- Rick & Morty public REST API

## Prerequisites
- Node 20 (see `.nvmrc`)
- pnpm (preferred) — `npm i -g pnpm`

## Quick Start
```bash
pnpm install
pnpm dev
```
App runs at `http://localhost:3000`.

## Environment Config
- Public API base is read from `NUXT_PUBLIC_API_BASE`.
- Local defaults live in `.env` (gitignored); production overrides go in `.env.production` (also gitignored).
- Variables are documented in `.env.example`.

## Useful Scripts
- `pnpm dev` — start dev server with HMR
- `pnpm build` — production build
- `pnpm preview` — preview built output
- `pnpm format` / `pnpm format:check` — Prettier with Tailwind plugin

## Notes for Reviewers
- Data fetching uses `useFetch` with debounced search and client-side pagination.
- API base is centralized in `runtimeConfig.public.apiBase` to allow easy environment switching.
- No backend or auth; all data is public from the Rick & Morty API.

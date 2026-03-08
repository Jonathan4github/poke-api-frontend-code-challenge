# Pokédex — PokeAPI Frontend Challenge

A Next.js application that consumes the [PokeAPI](https://pokeapi.co/) to let users browse Pokémon by type, search by name, and view detailed stats.

## Features

- **Type browser** — lists all official Pokémon types as coloured cards on the home page
- **Pokémon list per type** — clicking a type shows every Pokémon that belongs to it, sorted by Pokédex number
- **Search** — client-side filter by name within a type (no extra API call needed)
- **Pagination** — results are paginated at 25 per page when there are more than 25 Pokémon
- **Pokémon detail** — artwork, height/weight/base experience, abilities, sprites, and animated stat bars
- **Dark mode** — respects the OS preference via Tailwind's `dark:` classes
- **Loading skeletons** — every route shows an animated skeleton while server data is being fetched

## Tech stack

| Concern | Library |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, React Server Components) |
| Language | TypeScript |
| HTTP client | [Axios](https://axios-http.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Images | `next/image` with remote patterns for PokeAPI sprites |
| Unit testing | [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) |

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home — type list (server component)
│   ├── loading.tsx             # Skeleton loader for home page
│   ├── not-found.tsx           # 404 page
│   ├── type/[slug]/
│   │   ├── page.tsx            # Server component: fetches all Pokémon for the type
│   │   ├── loading.tsx         # Skeleton loader for type page
│   │   └── PokemonList.tsx     # Client component: search + pagination
│   └── pokemon/[name]/
│       ├── page.tsx            # Pokémon detail (server component)
│       └── loading.tsx         # Skeleton loader for detail page
├── components/
│   ├── BackButton.tsx          # Client-side back navigation
│   ├── PokemonCard.tsx         # Card with sprite, number, name, type badges
│   ├── Pagination.tsx          # Page controls with ellipsis
│   ├── StatBar.tsx             # Animated base-stat bar
│   ├── TypeBadge.tsx           # Coloured inline type pill
│   └── TypeCard.tsx            # Clickable type grid card
├── lib/
│   ├── api.ts                  # Axios instance + typed API helpers
│   └── typeColors.ts           # Type → Tailwind class + hex colour maps
└── types/
    └── pokemon.ts              # TypeScript interfaces for PokeAPI responses
```

### Test structure

```
src/
├── lib/__tests__/
│   ├── typeColors.test.ts      # getTypeColors fallback + hex colour validity
│   └── api.test.ts             # fetchAllTypes / fetchType / fetchPokemon (mocked)
├── components/__tests__/
│   ├── StatBar.test.tsx        # Label mapping, width %, colour classes, cap logic
│   ├── TypeBadge.test.tsx      # span vs link rendering, colour classes
│   ├── Pagination.test.tsx     # Ellipsis logic, disabled states, click handlers
│   └── BackButton.test.tsx     # Label prop, router.back() on click
└── app/type/[slug]/__tests__/
    └── PokemonList.test.tsx    # Search filter, case-insensitivity, page reset,
                                # empty state, pagination visibility, count text
```

## Local development

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9 (comes with Node 18+)

### Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd poke-api-frontend-code-challenge

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The dev server uses Turbopack for fast HMR. No `.env` file is required — the app only calls the public PokeAPI.

### Other scripts

```bash
npm run build          # Production build
npm run start          # Start the production server (after build)
npm run lint           # ESLint
npm test               # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
```

## Testing

The project uses **Jest** and **React Testing Library** for unit tests. 52 tests cover the core logic and components.

```bash
npm test
```

Key areas covered:

- **API helpers** (`fetchAllTypes`, `fetchType`, `fetchPokemon`) — success and error paths via `axios-mock-adapter`
- **Type colour utilities** — known types, fallback for unknown types, hex colour format validation
- **StatBar** — stat label mapping, percentage width calculation, colour class selection, 100% cap
- **TypeBadge** — conditional link vs span rendering, type-specific colour classes
- **Pagination** — page range / ellipsis algorithm, disabled states, `aria-current`, click callbacks
- **BackButton** — label prop, `router.back()` called on click
- **PokemonList** — search filtering, case-insensitivity, page reset on search, empty state, pagination visibility

## Deployment

### Vercel (recommended)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import the repository — Vercel auto-detects Next.js and sets the correct build command (`next build`) and output directory (`.next`).
4. Click **Deploy**. No environment variables are required.

Every push to `main` will trigger an automatic re-deploy.

### Self-hosted (Node.js)

```bash
# Build
npm run build

# Run the production server
npm run start
# Listens on http://localhost:3000 by default

# Change port
PORT=8080 npm run start
```

Use a process manager (e.g. [pm2](https://pm2.keymetrics.io/)) to keep the server running:

```bash
npm install -g pm2
pm2 start "npm run start" --name pokedex
pm2 save
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

> **Note**: add `output: "standalone"` to `next.config.ts` when using the Docker approach.

## Design decisions

- **Server components for data fetching** — type lists and Pokémon details are fetched on the server, keeping API calls out of the browser bundle and benefiting from Next.js caching.
- **Client component only where interactivity is required** — only `PokemonList` (search + pagination state) and `BackButton` (router) are marked `"use client"`.
- **Batched parallel fetching** — when loading all Pokémon for a type the app fetches them in parallel batches of 20 to avoid overwhelming the API while staying fast.
- **Graceful 404 handling** — invalid type or Pokémon names trigger `notFound()` which renders the custom `not-found.tsx` page.

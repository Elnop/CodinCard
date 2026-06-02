# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CodinCard** is a Next.js 14 app that lets users generate embeddable SVG profile cards for [CodinGame](https://www.codingame.com) profiles, with selectable badges. All source code lives in `site/`.

## Commands

All commands run from `site/`:

```bash
cd site
npm run dev      # Start dev server on localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Architecture

### Data flow

1. User enters a CodinGame profile URL in `ProfileUrlForm`
2. `CodingamerDataContext` fetches profile data via `POST /get_codingamer` (rate-limited: 5s debounce)
3. User selects badges in `BadgesTab`; selections are stored in `ActivatedBadgesContext`
4. `Preview` renders a live card preview; `OutputBar` generates a shareable SVG URL

### Routes

- `/` — the generator UI (single page, client component)
- `/svg_card/` — server-rendered SVG card endpoint; accepts query params: `public_handle`, `badges` (comma-separated IDs), `w`, `h`, `bg_img`, `bg_color`
- `/get_cg_svg` — proxy endpoint that fetches CodinGame images to avoid CORS issues
- `/get_codingamer` — POST endpoint that fetches profile data using `codingame_profile_fetcher` npm package

### Key abstractions

- **`Card`** (`components/Card/Card.tsx`) — async server component that renders the profile card HTML/CSS. Used both in the live preview and SVG export.
- **`SVGCard`** (`components/SVGCard/SVGCard.tsx`) — wraps `Card` in a `<foreignObject>` for SVG export; inlines all CSS by reading CSS files with `readFileSync` at server render time.
- **`CardProps`** (`types/CardProps.d.ts`) — the URL query param shape shared between the generator and `/svg_card/` route.
- **`T_ComponentConfig`** (`types/T_ComponentConfig.ts`) — responsive layout config type; component sizes expressed as viewport fractions.

### Context providers

Wrapped at the page root by `GeneratorProviders`:
- `CodingamerDataContext` — holds fetched `Codingamer` profile; exposes `setCodingamer(profile_url)` with 5s rate-limit
- `ActivatedBadgesContext` — holds the list of selected badge IDs

### Path alias

`@/` maps to `site/` (configured in `tsconfig.json`).

## Important notes

- `SVGCard` reads CSS files synchronously at render time (`readFileSync`). CSS paths are relative to `process.cwd()`, which must be the Next.js project root (`site/`).
- The `codingame_profile_fetcher` npm package handles CodinGame API calls; its `Codingamer` type is the core data model.
- Responsive layout config lives in `responsive/generator.responsive.ts` using `T_ComponentConfig` — sizes are viewport fractions, not pixels.

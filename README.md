# CodinCard

Embed your CodinGame profile as a dynamic SVG card — anywhere.

[![Live demo](https://img.shields.io/badge/demo-codincard.vercel.app-brightgreen)](https://codincard.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black)](https://vercel.com)

![CodinCard example](https://codincard.vercel.app/svg_card?public_handle=Elnop&bg_img=true)

---

## Use CodinCard

1. Go to [codincard.vercel.app](https://codincard.vercel.app)
2. Paste your CodinGame profile URL and pick your badges
3. Copy the generated Markdown snippet and paste it in your README

```markdown
![My CodinGame card](https://codincard.vercel.app/svg_card?public_handle=YOUR_HANDLE)
```

You can also customize the card with query parameters:

| Parameter      | Description                              | Default     |
|----------------|------------------------------------------|-------------|
| `public_handle`| CodinGame public handle (**required**)   | —           |
| `badges`       | Comma-separated badge IDs                | none        |
| `w`            | Width in pixels                          | auto        |
| `h`            | Height in pixels                         | auto        |
| `bg_color`     | Background color (hex or rgba)           | `#20252A`   |
| `bg_img`       | Show CodinGame background image          | `false`     |

---

## Develop / Contribute

### Stack

- [Next.js 14](https://nextjs.org) (App Router) + TypeScript
- [`codingame_profile_fetcher`](https://www.npmjs.com/package/codingame_profile_fetcher) — CodinGame API client
- [@phosphor-icons/react](https://phosphoricons.com) — icons
- Deployed on [Vercel](https://vercel.com)

### Local setup

```bash
git clone https://github.com/Elnop/CodinCard.git
cd CodinCard/site
npm install
npm run dev       # http://localhost:3000
```

### Key routes

| Route             | Description                                             |
|-------------------|---------------------------------------------------------|
| `/`               | Generator UI — enter a profile URL, pick badges, copy embed |
| `/svg_card`       | Renders the SVG card (GET, query params above)          |
| `/get_codingamer` | POST — fetches CodinGame profile data                   |
| `/get_cg_svg`     | Proxy for CodinGame images (CORS bypass)                |

### Architecture

1. User submits a CodinGame profile URL → `CodingamerDataContext` fetches profile data (5 s debounce)
2. User picks badges → stored in `ActivatedBadgesContext`
3. `OutputBar` builds the shareable `/svg_card` URL with selected params
4. `/svg_card` renders `SVGCard` server-side: inlines all CSS via `readFileSync`, wraps HTML in a `<foreignObject>`, and returns a self-contained SVG

### Contributing

PRs are welcome. Before submitting, make sure everything passes:

```bash
npm run check     # typecheck + lint + format check
```

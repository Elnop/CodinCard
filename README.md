# CodinCard

Embed your CodinGame profile as a dynamic SVG card — anywhere.

[![Live demo](https://img.shields.io/badge/demo-codincard.vercel.app-brightgreen)](https://codincard.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black)](https://vercel.com)

![CodinCard example](https://codincard.vercel.app/svg_card?w=1000&public_handle=961697f63a0daf0d4649a6f1c368acf81098515&bg_img=true&badges=CODING_SPEED,AI,ALGORITHMS,COLLABORATION,38823044854472,1923859026951,1925032048027,110379867599957,1925113228778,1925189810047)

<table>
  <tr>
    <td><img src="https://codincard.vercel.app/svg_card?w=1000&bg_img=true&public_handle=1d87d0a239c8e2f69181240098e0bb515984292&badges=AI,OPTIMIZATION,ALGORITHMS,COLLABORATION,1923792023719,1923900460781,1925067246288,1925216916635,50907824792251,50908045908249" /></td>
    <td><img src="https://codincard.vercel.app/svg_card?w=1000&bg_img=true&public_handle=e5d7ff0ed3b703ae2529902a9d58e7207985323&badges=AI,OPTIMIZATION,ALGORITHMS,CODING_SPEED,COLLABORATION,1925004003634,1925156270740,1923980068700,1922880904560,1922922204694,1922840039192,1923527230935,4465339362534,14440178045771,1923864394396,1923247682469,1923202296412,1925067246288,1923792023719,1923900460781,50907824792251" /></td>
  </tr>
  <tr>
    <td><img src="https://codincard.vercel.app/svg_card?w=1000&bg_img=true&public_handle=f9bbfea0c4a031ce1857249bb7a5245c3858193&badges=CODING_SPEED,ALGORITHMS,OPTIMIZATION,AI,1923919321884,1925067246288,1925216916635,1923806378980,1925023249158,1925004003634,1924611580559,1925156270740,1924975463423,1923202296412,38823044854472,1923247682469,1922922204694,1922840039192,3448445416671,4465339362534,50908227828169" /></td>
    <td><img src="https://codincard.vercel.app/svg_card?w=1000&bg_img=true&public_handle=3799c30a7f390b64b9430ff53613309e489451&badges=OPTIMIZATION,AI,ALGORITHMS,CODING_SPEED,1923895836180,1923806378980,1925067246288,1925216916635,1925023249158,1925004003634,1924611580559,1924759959507,50907841803167,50907824792251,50908184669525,50907860075876,50908140938088,50908061361554" /></td>
  </tr>
</table>

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

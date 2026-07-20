# QingTools

A pocketful of small, ready-to-use online tools — built with [Astro](https://astro.build),
served as plain static HTML/CSS/JS, and deployed to Cloudflare Pages.

Live: https://tools.ropean.org

## Highlights

- **Static output** — one standalone `.html` per page plus extracted CSS/JS. No
  runtime framework on the page; interactivity is small vanilla-JS islands.
- **Searchable catalog** — home page groups tools by category with instant search.
- **Favorites** — star any tool with the heart; favorites are saved locally and
  pinned to the top.
- **External tools** — off-site tools link out with their favicon and an
  "External ↗" marker.
- **Dark mode** — warm dark theme with a header toggle, following your system
  preference by default.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Astro dev server with HMR |
| `pnpm build` | Production build to `_site/` |
| `pnpm preview` | Build, then locally preview `_site/` |
| `pnpm ship` | Build + deploy to Cloudflare Pages (`tools`) |
| `pnpm ship:ci` | Build + deploy to Cloudflare Pages (`tools-ci`) |

## Project structure

```
src/
  data/tools.js       # Tool catalog (categories + tools) and helpers
  layouts/            # Base shell + shared tool-page chrome (ToolLayout)
  components/         # Header, Footer, cards, icons
  pages/              # index, about, and one page per tool
  styles/theme.css    # Design tokens (light + dark) and shared styles
public/               # Static assets served at the site root
astro.config.mjs      # Build config (outputs to _site/)
```

## Adding a tool

1. Add an entry to `TOOLS` in `src/data/tools.js`
   (`{ id, category, name, desc, ready: true, icon }`).
2. Create `src/pages/<id>.astro` using `ToolLayout` (copy an existing tool page
   as a starting point). For an off-site tool, set `external: 'https://…'`
   instead of creating a page.
3. `pnpm build` and verify.

See [`CLAUDE.md`](./CLAUDE.md) for the full contributor guide and conventions.

## Deployment

Pushing to a `ci*` or `release*` branch triggers
`.github/workflows/deploy-to-cloudflare.yml`, which builds and deploys `_site/`
to Cloudflare Pages (`ci*` → staging, `release*` → production).

## Design

The visual system is a warm "paper" theme documented in
[`design/lovable-DESIGN.md`](./design/lovable-DESIGN.md).

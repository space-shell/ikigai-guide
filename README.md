# ikigai-guide

A static website that guides users through discovering their ikigai in as
much depth as possible: a genuine guided process (staged exercises,
reflection prompts, saved progress), not a static article.

**Live:** https://space-shell.github.io/ikigai-guide/

## What it is

An eight-stage guided journey grounded in the original Japanese conception of
ikigai (Kamiya Mieko's needs model, Mogi's pillars, the validated Ikigai-9
scale) rather than the Western four-circle Venn, which the site explicitly
demystifies, offering it only as an optional, clearly-labelled livelihood
lens. Everything runs client-side: no account, no analytics, no server; all
answers live in `localStorage` and can be exported/imported as JSON.

- Research basis: [`docs/research/`](docs/research/):
  [resource inventory](docs/research/resource-inventory.md) ·
  [synthesis](docs/research/synthesis.md) ·
  [gap analysis](docs/research/gap-analysis.md) ·
  [recommendations](docs/research/recommendations.md)
- Brief: [`docs/brief.md`](docs/brief.md) · Build plan: [`docs/plan.md`](docs/plan.md)

## Stack

Vite + Solid (SPA, hash routing) · Tailwind CSS v4 · TypeScript · Vitest.
Chosen over SolidStart because GitHub Pages is a static file host and the app
is fully client-stateful; hash routing makes the `/ikigai-guide/` base path
a non-issue (see [`docs/plan.md`](docs/plan.md) §1).

Design direction: "Scandinese", a Scandinavian × Japanese calm (paper/ink
palette, indigo accent, serif display, generous whitespace), restyled
neumorphic following the owner's Doodat project. Design tokens live in
[`src/styles/app.css`](src/styles/app.css).

## Development (NixOS)

All tooling comes from the flake devshell, with no global installs:

```sh
nix develop
npm ci && npm run dev      # dev server
npm test                   # vitest
npm run typecheck          # tsc --noEmit
npm run build              # production build to dist/ (BASE_PATH overridable)
npm run preview            # serve dist/
```

Node 22 / npm 10 are pinned via `flake.nix`.

## Deploy

Push to `main` → GitHub Actions runs tests + typecheck + build, then deploys
to GitHub Pages (workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). Pages is
configured with `build_type: workflow`.

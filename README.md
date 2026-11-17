# ikigai-guide

A static website that guides users through the process of discovering their
ikigai in as much depth as possible — a genuine guided process (exercises,
reflection prompts, progression), not a static article.

## Status

Phase 1 (research) and Phase 2 (plan) are complete; implementation is
**awaiting owner review**.

- Brief: [`docs/brief.md`](docs/brief.md)
- Research: [`docs/research/`](docs/research/) —
  [resource inventory](docs/research/resource-inventory.md) ·
  [synthesis](docs/research/synthesis.md) ·
  [gap analysis](docs/research/gap-analysis.md) ·
  [recommendations](docs/research/recommendations.md)
- Build plan: [`docs/plan.md`](docs/plan.md) — stack decision (Vite + Solid
  SPA, Tailwind v4, hash routing, GitHub Pages), IA, milestones

## Development (NixOS)

All tooling comes from the flake devshell — no global installs:

```sh
nix develop
npm ci && npm run dev
```

Node 22 / npm 10 are pinned via `flake.nix` (nixpkgs `nixos-unstable`,
matching the host's 26.11 line).

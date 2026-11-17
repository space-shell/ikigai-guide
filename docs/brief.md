# Project Brief — ikigai-guide

## Goal

Build a static website that guides users through discovering their ikigai in
as much depth as possible. The site must be an interactive guided process —
staged exercises, reflection prompts, saved progress — not a static article.

## Constraints

- **Static build, deployable to GitHub Pages.**
- **Stack preference to validate during planning** (owner's initial instinct):
  Tailwind CSS + SolidJS / SolidStart. Planning must confirm the best fit for
  a GitHub Pages static deploy — e.g. SolidStart static prerendering vs plain
  Vite + Solid SPA (hash routing to avoid GH Pages 404s) — and justify the
  choice. Treat this as a hypothesis, not a decision.
- **NixOS host**: define a devshell in `flake.nix` for all package/dependency
  management. No global tooling, no ad-hoc installs.
- **Commit little, commit often.**

## Phase 1 — Research (this handoff)

Investigate existing material on effectively uncovering one's ikigai:

- Workbooks / printable PDFs
- Ebooks and books — include the Japanese origins (e.g. Kamiya Mieko's work)
  and popular treatments (e.g. García & Miralles "Ikigai: The Japanese Secret
  to a Long and Happy Life", Ken Mogi's "The Little Book of Ikigai")
- Tutorials and online courses
- Blogs and articles
- YouTube videos and guided exercises

Use web search and web page reading tools. Deliverables as markdown under
`docs/research/`:

1. **Resource inventory** — per resource: title, creator, format, link,
   methodology/exercises used, strengths, weaknesses, depth rating.
2. **Synthesis** — recurring frameworks and where they disagree; notably the
   popular four-circle Venn ("what you love / what you're good at / what the
   world needs / what you can be paid for") vs the original Japanese
   conception, and whether "what you can be paid for" belongs in ikigai at all.
3. **Gap analysis** — what existing material fails to do that an interactive
   site can do better (interactivity, saved progress, exercise depth,
   personalisation).
4. **Recommendations** — a proposed structure for the site's guided discovery
   process: stages, exercises per stage, inputs/outputs, how depth is achieved.

## Phase 2 — Plan

A build plan for the static site:

- Stack decision + justification against the constraint above
- Information architecture and the guided flow (stages → steps → exercises)
- Content outline per stage, derived from Phase 1 recommendations
- State/persistence approach (e.g. localStorage progress, exportable summary)
- GitHub Pages deploy setup (workflow, base-path handling) and flake devshell
- Milestones for implementation

## Stop point

Complete Phases 1 and 2, then **stop for owner review**. Do not begin
implementation.

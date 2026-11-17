# Phase 2 — Build plan

Plan for implementing the static site per [docs/brief.md](brief.md) and the
Phase 1 output under [docs/research/](research/). Written 2026-11-17 against
current published tool versions (verified on the npm registry the same day).

## 1. Stack decision

**Decision: plain Vite + Solid SPA (no SolidStart), Tailwind CSS v4,
TypeScript, hash-based routing hand-rolled, localStorage persistence.
Deployed to GitHub Pages as static files.**

### Versions verified 2026-11-17 (npm dist-tags)
| Package | Latest | Used for |
|---|---|---|
| vite | 8.3.8 | build/dev server |
| solid-js | 2.0.0 | UI framework |
| tailwindcss | 4.3.5 | styling (CSS-first config, `@tailwindcss/vite` plugin) |
| typescript | 7.0.2 | language |
| nodejs (nixpkgs) | 22 LTS | runtime, pinned in flake.nix |

### Why Vite + Solid SPA over SolidStart
The brief names the owner's hypothesis (Tailwind + SolidJS/SolidStart) and
asks for a decision on GitHub Pages fit:

1. **GitHub Pages is a dumb file host.** No server runtime, no rewrite rules;
   unknown paths get the 404 page. Deep-linking an SPA with history routing
   therefore breaks on refresh (the classic `createBrowserRouter` + Pages
   404), unless one uses the `404.html` redirect hack.
2. **This app has no server-renderable content.** The product is a personal,
   stateful journey — every meaningful view depends on localStorage that only
   exists in the user's browser. Prerendering buys SEO for pages that are
   empty shells without user state.
3. **SolidStart's value is SSR/SSG/islands + server functions.** Using it as
   a pure static generator adds an adapter, hydration boundary and a
   framework-level routing contract we would immediately fight, for ~zero
   benefit. It also couples deploys to SolidStart release cadence.
4. **Hash routing neutralises the Pages base-path problem entirely.**
   `/#/journey/3/2` is valid at *any* base path; no 404 hack, no
   `BASE_PATH` threading through a router config (one `vite build --base`
   flag remains for assets).
5. **Minimal dependency surface:** `solid-js`, `vite`, `tailwindcss`,
   `@tailwindcss/vite`, `typescript`. Routing (~60 lines: parse hash,
   `createSignal`, route guards) is cheaper than `@solidjs/router` for a
   linear journey state machine.
6. **Escape hatch:** if content marketing/SEO later matters, the landing page
   (`/index.html`) can be hand-written static HTML at the same URL — no
   framework change needed.

**Rejected alternatives:** SolidStart SSG (unnecessary SSR machinery);
Astro (content-site model, wrong shape for a stateful app); Next/Remix
(React ecosystems, heavier); plain MPA (would lose persistent state UX that
is the core of the product).

**Pin policy:** exact versions in `package.json` (no `^`), `npm ci` in CI,
flake pins Node. Solid 2.0 went stable recently; exact pins isolate us from
ecosystem churn.

## 2. Information architecture

Hash routes (all under `/`):

```
#/                     Landing: what ikigai is/isn't, what the journey is, privacy note
#/journey              Stage overview + progress (the "map of the journey")
#/journey/:stage/:step One exercise step (stage 0–7, steps numbered within)
#/map                  The synthesis artifact (My Ikigai Map) — also printable
#/settings             Export / import / reset data; retest scheduler
```

Route transitions drive the stage/step state machine (recommendations §2);
unknown stage/step → redirect to `#/journey`. Progress-gating: a stage is
enterable when the previous stage's required steps are complete (soft-gate:
user can peek ahead, cannot mark complete).

## 3. Content outline per stage

From [research/recommendations.md](research/recommendations.md) §2.
Teach = sourced intro cards; Ex = exercises; Art = persisted artifact.

| # | Stage | Teach | Ex | Art |
|---|---|---|---|---|
| 0 | Orientation & baseline | 3 (what it is; what it isn't incl. Venn history pointer; how data is stored) | expectations check (3q); Ikigai-9 baseline (9 sliders → subscale scores) | baseline score card |
| 1 | Mine the past | 2 (why past is evidence; how to memory-prompt) | peak-moments timeline (5–10 entries); sentence stems; lost-loves audit | timeline; candidate themes |
| 2 | Map the present | 2 (Mogi pillars; flow + little things) | energy audit; flow scan; little-things practice; strengths inventory | energy map; flow list; strengths list |
| 3 | Values & needs | 3 (ikigai-kan vs sources; 7+1 needs; logotherapy & Morita in one card each) | needs self-rating; values clarification; others' expectations; meaning audit | needs flower data; top-5 values |
| 4 | Sources | 2 (plural small sources; feelings as proof) | sources list (seeded from stages 1–3); feelings vocabulary per source; optional two-word distillation | sources catalogue |
| 5 | Contribution & world | 2 (resonance; Venn history + livelihood lens disclosure) | world-needs reflection; contribution inventory; optional livelihood map; job-crafting review | contribution list; optional livelihood map |
| 6 | Enemies & experiments | 2 (Tamashiro's four enemies; act-before-motivation) | enemies worksheet; if-then obstacle plans; 3-experiment plan | enemies sheet; experiments plan |
| 7 | Synthesis & practice | 2 (practice not completion; retest meaning) | assemble ikigai map; Ikigai-9 retest + delta; revisit scheduler | **My Ikigai Map** (printable/exportable); delta card |

Each step = one exercise or one teach card; autosave on every input;
"between sessions" real-world action shown at stage end.

## 4. State & persistence

- **Store:** Solid signals in a typed `JourneyStore`; derived values via
  `createMemo` (subscale scores, stage progress, artifact views).
- **Persistence:** single versioned record under
  `localStorage["ikigai-guide:v1"]`, written debounced (~300 ms) on change;
  schema:
  ```ts
  {
    version: 1,
    createdAt: string, updatedAt: string,
    baseline: Ikigai9Answers, retest: Ikigai9Answers | null,
    steps: Record<StepId, StepCompletion>,
    answers: Record<StepId, unknown>,   // per-step payloads, schema per exercise type
    sources: SourceEntry[], values: ValueEntry[], needs: NeedsRating,
    experiments: Experiment[], settings: { retestCadence?: string }
  }
  ```
- **Migration:** `version` field with a tiny migration table; only `v1` at
  launch.
- **Export/import:** `#/settings` — download full JSON; import validates with
  a schema check (plus Zod-free hand-rolled validation to keep deps minimal)
  before replacing state; destructive actions (reset) require typed
  confirmation.
- **Print/export artifact:** `#/map` gets a print stylesheet; "Download
  summary" generates a self-contained HTML or Markdown file from the same
  data.

## 5. GitHub Pages deploy & flake devshell

- **Workflow** (`.github/workflows/deploy.yml`): `on: push: branches: [main]`
  → checkout → `setup-node` 22 with `cache: npm` → `npm ci` →
  `npm run build` → `actions/upload-pages-artifact` → `actions/deploy-pages`.
- **Base path:** project pages at `https://<owner>.github.io/ikigai-guide/` —
  build with `vite build --base=/ikigai-guide/` (a `BASE_PATH` env with
  default keeps custom-domain/user-site cases one-flag away).
- **Routing:** hash routes make the deploy path-agnostic; no 404 fallback
  needed. Cache headers are Pages-default; `index.html` immutable-asset
  hashing is provided by Vite.
- **flake.nix devshell** (added in this phase, verified):
  - `nodejs_22` (dev/build parity with CI), `git`, `nixfmt-rfc-style`.
  - Enter with `nix develop`; `npm ci && npm run dev`.
  - No global installs, no ad-hoc tooling (NixOS constraint).

## 6. Accessibility & quality gates

- Keyboard-complete step navigation; visible focus; ARIA labels on sliders
  (Ikigai-9) and dynamic regions; `prefers-reduced-motion` respected.
- Contrast-checked Tailwind palette (the subject matter deserves calm,
  accessible defaults).
- **Vitest** unit tests: store persistence, Ikigai-9 scoring, export/import
  round-trip, step-gating logic.
- Playwright smoke (journey start → stage 0 complete → reload resume) added
  at milestone M5 if time permits; not a launch blocker.

## 7. Milestones

| M | Scope | Acceptance |
|---|---|---|
| M0 | Scaffold: flake, Vite+Solid+Tailwind+TS, hash router shell, CI build+deploy, landing | `nix develop` → dev server; Pages URL serves landing; CI green |
| M1 | Journey engine: stage/step schema, store, autosave/resume, progress map | Reload mid-journey restores state exactly; vitest green |
| M2 | Stages 0–2 content (teach cards + exercises + artifacts) | Stages 0–2 completable end-to-end; baseline score correct |
| M3 | Stages 3–5 content (needs/values/sources + optional livelihood lens) | Sources list seeds from prior stages; needs flower renders |
| M4 | Stages 6–7 + artifact + retest + export/import + print | Full journey completable; delta card shows baseline vs retest; JSON round-trip passes |
| M5 | Polish: a11y pass, mobile, empty/error states, onboarding resume banner, README | Keyboard-only journey pass; Lighthouse a11y ≥ 95 |

Commit cadence: per milestone sub-unit (content per stage is one or two
commits; engine pieces are individual commits).

## 8. Risks

- **solid-js 2.0 ecosystem churn** — exact pins; check `@tailwindcss/vite`
  compat at M0.
- **Tailwind v4 + Vite 8 integration** — one-line plugin, verify in M0
  (it is the officially supported path).
- **localStorage evaporation** (user clears data) — mitigate with prominent
  export in settings + nudge after stage 7; document that data is local.
- **Scope creep in content** — stage exercise counts are capped in §3; extra
  ideas go to a backlog, not the journey.

## 9. Open questions for the owner

1. **Repo/base path:** deploy under `/ikigai-guide/` (project pages) —
   confirm repo name stays `ikigai-guide`?
2. **Livelihood lens default:** shown by default (with disclosure) or
   opt-in only? (Recommendation: opt-in banner in stage 5.)
3. **Tone/design direction:** calm minimal vs warm editorial — affects M2+
   visual work; needs a call before M2.
4. **i18n:** English-only for v1, but should copy live in content modules
   structured for future translation?
5. **Analytics:** assume *none* (privacy posture is a feature) — confirm.

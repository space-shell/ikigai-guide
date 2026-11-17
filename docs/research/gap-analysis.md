# Phase 1 — Gap analysis

What existing material fails to do that an interactive guided site can do
better. Categories follow the [inventory](resource-inventory.md).

## 1. Failure modes by format

| Format | Core failure |
|---|---|
| Books (incl. the best ones) | Depth without engagement: no feedback, no persistence, exercises live in prose, "reading about" substitutes for "doing" |
| Printable worksheets/PDFs | One-shot; no progression; no way to revisit or build on prior answers; outputs scattered across papers |
| Online tests (ikigaitest.com etc.) | Career-centric; shallow scoring; results are labels ("your ikigai is X") with no process to act on; nothing saved or revisited |
| Generator/canvas tools (FigJam, talbraiman, coachful, wrkshp.tools) | Single-session form-filling around the Venn; assume a facilitator; zero methodological teaching |
| AI wrappers (ikig-ai.app) | Novelty without method; user's most personal answers leave the device; output quality ungrounded |
| Coach certifications/courses | Expensive, human-mediated; no self-serve structured path |
| Hobby web apps (findmyikigai.app — dead) | Appear and disappear; single-session depth (~10–15 min); no maintenance |

## 2. Cross-cutting gaps (opportunities)

### G1 — No guided, multi-stage journey with saved progress
Nothing found walks a user through staged exercises *across sessions* with
state. Everything is either a book (no state) or a single-session quiz/tool
(no depth). The obvious core of an interactive guide is unoccupied.

### G2 — Depth and interactivity are mutually exclusive today
The culturally accurate, evidence-based material (Kamiya's needs model,
Ikigai-9, logotherapy/Morita exercises, Mogi's pillars, Mitsuhashi's methods)
exists only in books/articles/paid coach packs. The interactive artifacts
teach the debunked Venn model. No product combines the two.

### G3 — No validated measurement in the loop
Ikigai-9 exists, is validated in English, is 9 items — and no consumer
interactive product uses it. A site can administer it as a baseline, retest
after the journey, and *show* movement. Existing tools either score a fake
"instrument" or nothing at all.

### G4 — No synthesis artifact
Books end in advice; worksheets end in filled paper; generators end in a
picture. Nothing produces a durable, exportable personal artifact — an ikigai
map (Mogi-style two-axis placement of one's sources), a needs profile
(Kamiya flower), named sources with the feelings they generate, an
experiments plan. The user's accumulated work should *converge* into
something they keep, print, and revisit.

### G5 — No personalisation or branching
Real users differ wildly: some arrive at a career crossroads, some are
retired, some are depressed ("I don't have one" is a common reply on Winn's
post). Existing material is one-size-fits-all. Interactive structure can
branch: optional livelihood lens, optional deep dives, differentiated paths
when a needs area scores low.

### G6 — No practice/retest loop
Every serious source says ikigai changes and must be maintained (needs erode,
sources fade). No product supports revisiting: quarterly retests, delta views,
"strengthen this need" follow-ups. Sites treat discovery as a completion, not
a practice.

### G7 — Privacy is feasible and unused
An ikigai journey collects extremely personal reflections. AI wrappers ship
them to servers; account-based apps add signup friction. A fully static,
client-side app (localStorage + export/import + no analytics) is the privacy
optimum — and GitHub Pages makes it free to run.

### G8 — Honest sourcing is rare
Even good tools present the Venn without origin or criticism. A site that
cites Kamiya, Mogi, the Ikigai-9 validation and the cohort studies inline —
while explicitly labelling the Venn as a Western adaptation — is more
trustworthy than everything currently ranking for the topic.

## 3. What an interactive site can uniquely do (summary)

1. Sequence depth: teach → reflect → collect → synthesise → act, across
   multiple sessions, with resume.
2. Persist every input; make stage N build visibly on stage N−1.
3. Measure with a real instrument (Ikigai-9) at start and end.
4. Branch and personalise without assuming a coach.
5. Converge everything into an exportable artifact + an experiments plan.
6. Support the practice loop (retest, strengthen needs) instead of a one-shot.
7. Keep all data on-device; export/import for portability.
8. Cite honestly; correct the Venn misconception as part of the journey.

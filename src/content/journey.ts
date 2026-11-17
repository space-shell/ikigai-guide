import type { ScaleItem, Stage } from "./schema";
import { IKIGAI9_ITEMS } from "../state/ikigai9";

const ikigai9ScaleItems: ScaleItem[] = IKIGAI9_ITEMS.map((item) => ({
  id: item.id,
  label: item.label,
  minLabel: "Not at all",
  maxLabel: "Strongly",
}));

// Placeholder step bodies for stages 1–7 are replaced stage-by-stage in
// milestones M2 (0–2), M3 (3–5) and M4 (6–7); see docs/plan.md §3.

export const STAGES: Stage[] = [
  {
    id: 0,
    slug: "orientation",
    title: "Orientation & baseline",
    tagline: "What ikigai is, what it isn't, and where you stand today.",
    action: "None — completing this stage is the action.",
    steps: [
      {
        kind: "teach",
        title: "What ikigai means",
        paragraphs: [
          "Ikigai (生きがい) is a Japanese word for the worth you find in daily living. Iki comes from ikiru — to live, everyday living — and gai means value or worth.",
          "Psychiatrist Kamiya Mieko, who studied the concept in the 1960s, distinguished the sources of ikigai (people, pursuits, places, memories — usually several small ones) from ikigai-kan: the feeling that life is worth living, produced when a set of human needs are satisfied.",
          "That distinction shapes everything in this journey: we will look for your sources, and pay attention to the feelings they generate — not hunt for one grand answer.",
        ],
        bullets: [
          "Ikigai is plural — many small sources are normal.",
          "Ikigai is work-optional — a grandchild, a garden, a morning coffee all qualify.",
          "Ikigai-kan is available now, on the way to goals — not only when you arrive.",
        ],
      },
      {
        kind: "teach",
        title: "What it isn't",
        paragraphs: [
          "You may know the four-circle diagram: what you love, what you're good at, what the world needs, what you can be paid for. It is everywhere — and it is not Japanese.",
          "The Spanish astrologer Andrés Zuzunaga drew it around 2011–2012 as a purpose-of-work model. In May 2014, blogger Marc Winn pasted the word ikigai into its centre after watching a TED talk about Okinawan centenarians. Both have since said so openly.",
          "A career-lens diagram isn't useless — but treating it as ikigai pushes you toward one profitable intersection and away from the small, plural sources the concept actually describes. This journey teaches the original model, and offers the diagram later as an optional, clearly-labelled lens for work questions.",
        ],
      },
      {
        kind: "teach",
        title: "How this journey works",
        paragraphs: [
          "Eight stages. Each has a few short readings and exercises; each stage ends with one small real-world action. Expect 6–10 sessions of 20–40 minutes. Nothing is graded, nothing is a test of worth.",
          "At the start you'll complete the Ikigai-9 — a short questionnaire developed and validated by Japanese researchers — and again at the end, so you can see what changed. Your answers also shape later stages: what you write here comes back to help you there.",
          "Everything you write is saved in this browser only. No account, no analytics, no server. Export your data any time from Settings.",
        ],
      },
      {
        kind: "prompts",
        title: "Before we begin",
        intro:
          "Three honest sentences to your future self. You'll be able to revisit them at the end of the journey.",
        prompts: [
          {
            id: "why",
            label: "What brings you to this journey right now?",
            multiline: true,
          },
          {
            id: "hope",
            label: "What are you hoping will be different by the end?",
            multiline: true,
          },
          {
            id: "doubt",
            label: "What are you sceptical about? Name it now — scepticism is welcome here.",
            multiline: true,
            optional: true,
          },
        ],
      },
      {
        kind: "scale",
        title: "Ikigai-9 baseline",
        intro:
          "Nine statements. For each, answer as honestly as you can about your life right now — there are no wrong answers, and low scores are useful information, not failures.",
        target: "baseline",
        items: ikigai9ScaleItems,
      },
    ],
  },
  {
    id: 1,
    slug: "past",
    title: "Mine the past",
    tagline: "Recover the clues — ikigai is often visible early.",
    action: "Ask one person who knew you young: “what was I always doing?”",
    steps: [
      {
        kind: "teach",
        title: "The past is evidence",
        paragraphs: [
          "Placeholder for M2: why memory-mining works, and how to prompt recall.",
        ],
      },
      {
        kind: "prompts",
        title: "Placeholder — peak moments",
        intro: "Placeholder for M2.",
        prompts: [{ id: "placeholder", label: "Placeholder prompt." }],
      },
    ],
  },
  {
    id: 2,
    slug: "present",
    title: "Map the present",
    tagline: "Locate current sources, energy and flow.",
    action: "Do one everyday activity in “little things” mode this week.",
    steps: [
      {
        kind: "teach",
        title: "Placeholder — the present",
        paragraphs: ["Placeholder for M2: Mogi's pillars, flow, little things."],
      },
      {
        kind: "prompts",
        title: "Placeholder — energy audit",
        intro: "Placeholder for M2.",
        prompts: [{ id: "placeholder", label: "Placeholder prompt." }],
      },
    ],
  },
  {
    id: 3,
    slug: "values-needs",
    title: "Values & needs",
    tagline: "The interior scaffolding — Kamiya's needs, your values.",
    action: "Do one small act that serves a top value, for its own sake.",
    steps: [
      {
        kind: "teach",
        title: "Placeholder — needs & values",
        paragraphs: ["Placeholder for M3: ikigai-kan, the 7+1 needs, logotherapy, Morita."],
      },
      {
        kind: "prompts",
        title: "Placeholder — needs rating",
        intro: "Placeholder for M3.",
        prompts: [{ id: "placeholder", label: "Placeholder prompt." }],
      },
    ],
  },
  {
    id: 4,
    slug: "sources",
    title: "Sources",
    tagline: "Name your actual ikigai — plural, small, allowed.",
    action: "Schedule one dormant source into the coming week.",
    steps: [
      {
        kind: "teach",
        title: "Placeholder — sources",
        paragraphs: ["Placeholder for M3: sources vs feelings, two-word distillation."],
      },
      {
        kind: "prompts",
        title: "Placeholder — sources list",
        intro: "Placeholder for M3.",
        prompts: [{ id: "placeholder", label: "Placeholder prompt." }],
      },
    ],
  },
  {
    id: 5,
    slug: "contribution",
    title: "Contribution & the world",
    tagline: "Resonance, contribution — and an optional livelihood lens.",
    action: "One small contribution act this week.",
    steps: [
      {
        kind: "teach",
        title: "Placeholder — contribution",
        paragraphs: ["Placeholder for M3: resonance; the Venn history; livelihood lens."],
      },
      {
        kind: "prompts",
        title: "Placeholder — world needs",
        intro: "Placeholder for M3.",
        prompts: [{ id: "placeholder", label: "Placeholder prompt." }],
      },
    ],
  },
  {
    id: 6,
    slug: "enemies",
    title: "Enemies & experiments",
    tagline: "Clear resistance; convert insight into motion.",
    action: "Run experiment #1 — the plan is the action.",
    steps: [
      {
        kind: "teach",
        title: "Placeholder — enemies",
        paragraphs: ["Placeholder for M4: the four enemies; if-then plans; experiments."],
      },
      {
        kind: "prompts",
        title: "Placeholder — enemies worksheet",
        intro: "Placeholder for M4.",
        prompts: [{ id: "placeholder", label: "Placeholder prompt." }],
      },
    ],
  },
  {
    id: 7,
    slug: "synthesis",
    title: "Synthesis & practice",
    tagline: "Converge everything into your map; close the loop.",
    action: "Export or print your map; put experiment check-ins somewhere real.",
    steps: [
      {
        kind: "teach",
        title: "Placeholder — synthesis",
        paragraphs: ["Placeholder for M4: the artifact, the retest, the practice loop."],
      },
      {
        kind: "prompts",
        title: "Placeholder — ikigai-9 retest",
        intro: "Placeholder for M4.",
        prompts: [{ id: "placeholder", label: "Placeholder prompt." }],
      },
    ],
  },
];

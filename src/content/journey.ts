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
          "When people hunt for their ikigai, they usually stare at the present and the future — what job, what passion, what next. But your sources leave traces all the way back. Yukari Mitsuhashi, who writes about ikigai as everyday meaning, suggests sifting your memories deliberately: what you loved doing often shows up early, in school years, side pursuits, and the hours that disappeared.",
          "This stage treats memory as data, not nostalgia. You're looking for patterns — recurring activities, recurring feelings — not for the single defining memory. Nothing you dig up is trivial: the person who spent every afternoon drawing, or building, or organising neighbourhood games is already telling you something.",
          "Be patient with recall. Concrete places help: the kitchen table, the garden, the friend's house, the classroom you liked. If a memory won't come, skip it — the exercises that follow offer several doors into the same room.",
        ],
      },
      {
        kind: "prompts",
        title: "Sentence stems",
        intro:
          "Complete these quickly, without polishing. First honest answers beat considered ones.",
        prompts: [
          {
            id: "child",
            label: "When I was a child, I loved…",
            multiline: true,
          },
          {
            id: "money",
            label: "If money didn't matter, I would…",
            multiline: true,
          },
          {
            id: "time",
            label: "I completely lose track of time when…",
            multiline: true,
          },
          {
            id: "failure",
            label: "If I believed I could not fail, I would…",
            multiline: true,
          },
        ],
      },
      {
        kind: "list",
        title: "Peak-moments timeline",
        intro:
          "Recall moments when you felt most alive, absorbed, or quietly proud — at any age. Aim for four to eight. Short phrases are fine.",
        entryNoun: "Moment",
        minEntries: 4,
        maxEntries: 12,
        fields: [
          { id: "when", label: "Roughly when (age or era)", type: "text", required: true, placeholder: "e.g. age 10, university, a few years ago" },
          { id: "what", label: "What you were doing", type: "text", required: true, placeholder: "e.g. restoring an old bicycle" },
          { id: "felt", label: "What it felt like", type: "textarea", placeholder: "e.g. absorbed, useful, unobserved, challenged" },
        ],
      },
      {
        kind: "prompts",
        title: "Lost loves",
        intro:
          "Most lives contain activities abandoned to circumstance — a move, a job, other people's expectations — rather than to lost interest.",
        prompts: [
          {
            id: "stopped",
            label: "Which activities did you stop doing, even though the interest itself never died?",
            multiline: true,
          },
          {
            id: "resume",
            label: "Which one of those would you resume if life made room for it?",
            multiline: true,
          },
        ],
      },
      {
        kind: "prompts",
        title: "Candidate themes",
        intro:
          "Re-read your timeline, stems and lost loves. You're looking for recurring shapes — not conclusions yet.",
        prompts: [
          {
            id: "themes",
            label: "Which two to four themes keep appearing? Name them in your own words.",
            placeholder: "e.g. making physical things; being the one who explains; being outdoors; close one-to-one conversations",
            multiline: true,
          },
          {
            id: "surprise",
            label: "Did anything in your answers surprise you?",
            multiline: true,
            optional: true,
          },
        ],
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
        title: "The present holds sources too",
        paragraphs: [
          "The neuroscientist Ken Mogi describes ikigai through five pillars: starting small, releasing yourself, harmony and sustainability, the joy of little things, and being in the here and now. Notice what the pillars assume: ikigai is already available in ordinary days — in a well-made breakfast, a train departure announced on time, a small kindness done properly.",
          "You do not need to invent a new life to have ikigai. This stage maps what your days actually contain: what energises you, when you disappear into an activity, what people rely on you for. The point is evidence again — the present is where your future sources are hiding in plain sight.",
        ],
      },
      {
        kind: "teach",
        title: "Flow and the little things",
        paragraphs: [
          "Flow is the state of being fully absorbed — the task's difficulty matching your skill, clear goals, immediate feedback, time distorting. The psychologist Mihaly Csikszentmihalyi found that activities producing flow are among our strongest candidates for ikigai sources, because absorption and worth arrive together.",
          "The joy of little things is flow's modest sibling. Mogi's pillars treat attention itself as practice: the same cup of tea, fully attended, feeds the feeling Kamiya called ikigai-kan. One of this stage's exercises is exactly that — an act of deliberate attention, not analysis.",
        ],
      },
      {
        kind: "list",
        title: "Energy audit",
        intro:
          "Think over the last few ordinary days. List the activities that filled them, and how each left you feeling. Honesty about drains matters as much as spotting sparks.",
        entryNoun: "Activity",
        minEntries: 3,
        maxEntries: 15,
        fields: [
          { id: "activity", label: "Activity", type: "text", required: true, placeholder: "e.g. the Tuesday meetings" },
          {
            id: "energy",
            label: "Energy afterwards",
            type: "select",
            required: true,
            options: ["Drained", "Slightly drained", "Neutral", "Energised", "Fully alive"],
          },
          { id: "notes", label: "Notes (optional)", type: "textarea", placeholder: "e.g. good in small doses; always run over; I lose track of time" },
        ],
      },
      {
        kind: "prompts",
        title: "Flow scan",
        intro: "Recall the last time you lost track of time doing something.",
        prompts: [
          {
            id: "activity",
            label: "What were you doing?",
            multiline: true,
          },
          {
            id: "conditions",
            label: "What made it work — challenge matched to skill, clear goals, instant feedback, no interruption?",
            multiline: true,
          },
          {
            id: "frequency",
            label: "How often does this happen with this activity, and what usually gets in its way?",
            multiline: true,
          },
        ],
      },
      {
        kind: "prompts",
        title: "Little things",
        intro:
          "A short practice, not a question. Sometime today, do one mundane act — making tea, washing a dish, walking to the letterbox — and attend to it completely.",
        prompts: [
          {
            id: "act",
            label: "Which act did you choose, and what did you notice when you attended to it fully?",
            multiline: true,
          },
          {
            id: "difference",
            label: "Did the act feel different? Say so honestly, even if the difference was small or absent.",
            multiline: true,
          },
        ],
      },
      {
        kind: "prompts",
        title: "Strengths",
        intro: "Evidence from other people is often clearer than self-report.",
        prompts: [
          {
            id: "asked",
            label: "What do people ask you for — help, advice, time, company?",
            multiline: true,
          },
          {
            id: "effortless",
            label: "What comes to you effortlessly that others seem to find hard?",
            multiline: true,
          },
          {
            id: "proud",
            label: "Which of your ordinary abilities are you quietly proudest of?",
            multiline: true,
          },
        ],
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

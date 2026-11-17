import type { ScaleItem, Stage } from "./schema";
import { IKIGAI9_ITEMS } from "../state/ikigai9";

const ikigai9ScaleItems: ScaleItem[] = IKIGAI9_ITEMS.map((item) => ({
  id: item.id,
  label: item.label,
  minLabel: "Not at all",
  maxLabel: "Strongly",
}));

export const STAGES: Stage[] = [
  {
    id: 0,
    slug: "orientation",
    title: "Orientation & baseline",
    tagline: "What ikigai is, what it isn't, and where you stand today.",
    action: "None. Completing this stage is the action.",
    steps: [
      {
        kind: "teach",
        title: "What ikigai means",
        paragraphs: [
          "Ikigai (生きがい) is a Japanese word for the worth you find in daily living. Iki comes from ikiru (to live, everyday living), and gai means value or worth.",
          "Psychiatrist Kamiya Mieko, who studied the concept in the 1960s, distinguished the sources of ikigai (people, pursuits, places, memories; usually several small ones) from ikigai-kan: the feeling that life is worth living, produced when a set of human needs are satisfied.",
          "That distinction shapes everything in this journey. We will look for your sources, and pay attention to the feelings they generate, rather than hunt for one grand answer.",
        ],
        bullets: [
          "Ikigai is plural: many small sources are normal.",
          "Ikigai is work-optional. A grandchild, a garden, a morning coffee all qualify.",
          "Ikigai-kan is available now, on the way to goals, not only when you arrive.",
        ],
      },
      {
        kind: "teach",
        title: "What it isn't",
        paragraphs: [
          "You may know the four-circle diagram: what you love, what you're good at, what the world needs, what you can be paid for. It is everywhere, and it is not Japanese.",
          "The Spanish astrologer Andrés Zuzunaga drew it around 2011–2012 as a purpose-of-work model. In May 2014, blogger Marc Winn pasted the word ikigai into its centre after watching a TED talk about Okinawan centenarians. Both have since said so openly.",
          "A career-lens diagram isn't useless, but treating it as ikigai pushes you toward one profitable intersection and away from the small, plural sources the concept actually describes. This journey teaches the original model, and offers the diagram later as an optional, clearly-labelled lens for work questions.",
        ],
      },
      {
        kind: "teach",
        title: "How this journey works",
        paragraphs: [
          "Eight stages. Each has a few short readings and exercises; each stage ends with one small real-world action. Expect 6–10 sessions of 20–40 minutes. Nothing is graded, nothing is a test of worth.",
          "At the start you'll complete the Ikigai-9, a short questionnaire developed and validated by Japanese researchers, and again at the end so you can see what changed. Your answers also shape later stages: what you write here comes back to help you there.",
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
            label: "What are you sceptical about? Name it now; scepticism is welcome here.",
            multiline: true,
            optional: true,
          },
        ],
      },
      {
        kind: "scale",
        title: "Ikigai-9 baseline",
        intro:
          "Nine statements. For each, answer as honestly as you can about your life right now. There are no wrong answers, and low scores are useful information, not failures.",
        target: "baseline",
        items: ikigai9ScaleItems,
      },
    ],
  },
  {
    id: 1,
    slug: "past",
    title: "Mine the past",
    tagline: "Recover the clues; ikigai is often visible early.",
    action: "Ask one person who knew you young: “what was I always doing?”",
    steps: [
      {
        kind: "teach",
        title: "The past is evidence",
        paragraphs: [
          "When people hunt for their ikigai, they usually stare at the present and the future: what job, what passion, what next. But your sources leave traces all the way back. Yukari Mitsuhashi, who writes about ikigai as everyday meaning, suggests sifting your memories deliberately: what you loved doing often shows up early, in school years, side pursuits, and the hours that disappeared.",
          "This stage treats memory as data, not nostalgia. You're looking for patterns (recurring activities, recurring feelings), not for the single defining memory. Nothing you dig up is trivial: the person who spent every afternoon drawing, or building, or organising neighbourhood games is already telling you something.",
          "Be patient with recall. Concrete places help: the kitchen table, the garden, the friend's house, the classroom you liked. If a memory won't come, skip it; the exercises that follow offer several doors into the same room.",
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
          "Recall moments when you felt most alive, absorbed, or quietly proud, at any age. Aim for four to eight. Short phrases are fine.",
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
          "Most lives contain activities abandoned to circumstance (a move, a job, other people's expectations) rather than to lost interest.",
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
          "Re-read your timeline, stems and lost loves. You're looking for recurring shapes, not conclusions yet.",
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
          "The neuroscientist Ken Mogi describes ikigai through five pillars: starting small, releasing yourself, harmony and sustainability, the joy of little things, and being in the here and now. Notice what the pillars assume: ikigai is already available in ordinary days, in a well-made breakfast, a train departure announced on time, a small kindness done properly.",
          "You do not need to invent a new life to have ikigai. This stage maps what your days actually contain: what energises you, when you disappear into an activity, what people rely on you for. The point is evidence again. The present is where your future sources are hiding in plain sight.",
        ],
      },
      {
        kind: "teach",
        title: "Flow and the little things",
        paragraphs: [
          "Flow is the state of being fully absorbed: the task's difficulty matching your skill, clear goals, immediate feedback, time distorting. The psychologist Mihaly Csikszentmihalyi found that activities producing flow are among our strongest candidates for ikigai sources, because absorption and worth arrive together.",
          "The joy of little things is flow's modest sibling. Mogi's pillars treat attention itself as practice: the same cup of tea, fully attended, feeds the feeling Kamiya called ikigai-kan. One of this stage's exercises is exactly that: an act of deliberate attention, not analysis.",
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
            label: "What made it work (challenge matched to skill, clear goals, instant feedback, no interruption)?",
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
          "A short practice, not a question. Sometime today, do one mundane act (making tea, washing a dish, walking to the letterbox) and attend to it completely.",
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
            label: "What do people ask you for (help, advice, time, company)?",
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
    tagline: "The interior scaffolding. Kamiya's needs, your values.",
    action: "Do one small act that serves a top value, for its own sake.",
    steps: [
      {
        kind: "teach",
        title: "The feeling and its needs",
        paragraphs: [
          "Kamiya's central discovery: ikigai-kan, the feeling that life is worth living, isn't produced by achievements. It arises when a set of ordinary human needs are being met. Her work with sanatorium patients, who had lost almost everything, showed her which needs matter: even there, some people felt life was worth living, and some didn't.",
          "Her seven needs: life satisfaction; change and growth; a bright future; resonance (the sense that the world answers you); freedom; self-actualization; and meaning and value. She treated a sense of mission, the feeling of being needed for something only you can do, as something even deeper; Nicholas Kemp, who brought her work to English readers, counts it as an eighth need.",
          "Treat the list as a design checklist, not a personality test. Low scores are directions to build in, not verdicts.",
        ],
      },
      {
        kind: "teach",
        title: "Two therapies worth borrowing",
        paragraphs: [
          "Viktor Frankl's logotherapy holds that meaning is available under all circumstances. It is not granted by success; it is made through how we meet what happens to us. Its practical edge: instead of asking what you expect from life, notice what life is asking of you.",
          "Morita therapy, developed in Japan, says the opposite of what self-help usually says about feelings: feelings are like weather. They cannot be commanded, so stop trying. Act while the feeling hasn't arrived, and it often follows. Doing the thing badly while unmotivated is the therapy.",
          "Both appear in García and Miralles' ikigai book, and both convert directly into exercises. You'll use each below.",
        ],
      },
      {
        kind: "scale",
        title: "Needs self-rating",
        intro:
          "Rate how well each need is met in your life right now. Be blunt; this is your map, not your report card.",
        target: null,
        items: [
          { id: "satisfaction", label: "Life satisfaction: my days satisfy me", minLabel: "Barely met", maxLabel: "Fully met" },
          { id: "growth", label: "Change & growth: I am changing and growing", minLabel: "Barely met", maxLabel: "Fully met" },
          { id: "future", label: "A bright future: I have one I look forward to", minLabel: "Barely met", maxLabel: "Fully met" },
          { id: "resonance", label: "Resonance: the world answers me when I reach out", minLabel: "Barely met", maxLabel: "Fully met" },
          { id: "freedom", label: "Freedom: I choose my own path", minLabel: "Barely met", maxLabel: "Fully met" },
          { id: "actualization", label: "Self-actualization: I am becoming who I can be", minLabel: "Barely met", maxLabel: "Fully met" },
          { id: "meaning", label: "Meaning & value: my life has meaning and value", minLabel: "Barely met", maxLabel: "Fully met" },
          { id: "mission", label: "Sense of mission: something is needed that only I can do", minLabel: "Barely met", maxLabel: "Fully met" },
        ],
      },
      {
        kind: "pick",
        title: "Values clarification",
        intro:
          "Choose the values that genuinely steer you, not the ones you admire in theory. Pick at least four, then name your top ones in your own words.",
        multi: true,
        minSelections: 4,
        options: [
          { id: "achievement", label: "Achievement", description: "Getting things done, mastery, measurable progress" },
          { id: "adventure", label: "Adventure", description: "Novelty, risk, the unknown" },
          { id: "autonomy", label: "Autonomy", description: "Choosing your own path and pace" },
          { id: "beauty", label: "Beauty & craft", description: "Making things well; the made world matching the mind" },
          { id: "community", label: "Community", description: "Belonging, shared life, showing up for people" },
          { id: "creativity", label: "Creativity", description: "Bringing new things into existence" },
          { id: "family", label: "Family", description: "The specific people you are bound to" },
          { id: "faith", label: "Faith / spirituality", description: "Connection to something beyond the self" },
          { id: "growth", label: "Growth", description: "Becoming more capable, wiser, calmer" },
          { id: "health", label: "Health", description: "A body and mind that work well" },
          { id: "honesty", label: "Honesty", description: "Being and speaking truthfully" },
          { id: "justice", label: "Justice", description: "Fairness; things set right" },
          { id: "nature", label: "Nature", description: "The living world, outdoors, seasons" },
          { id: "service", label: "Service", description: "Usefulness to others, care made concrete" },
        ],
        freeText: { id: "own", label: "A value of yours that isn't listed, or what your top choices mean in practice:" },
      },
      {
        kind: "prompts",
        title: "What others expect",
        intro:
          "Other people's expectations are the quietest force on a life. Name them, then set them beside your own values; you keep the final word.",
        prompts: [
          {
            id: "expectations",
            label: "What do the significant people in your life (parents, partner, friends, colleagues) expect of you?",
            multiline: true,
          },
          {
            id: "contrast",
            label: "Which of those expectations sit comfortably beside your values, and which would you set down?",
            multiline: true,
          },
        ],
      },
      {
        kind: "prompts",
        title: "Meaning audit",
        intro:
          "A logotherapy question, then a Morita action. Answer plainly.",
        prompts: [
          {
            id: "asked",
            label: "Setting aside what you want from life: what does your life, right now, seem to be asking of you?",
            multiline: true,
          },
          {
            id: "act",
            label: "Name one small thing you could do this week that serves a value you chose, regardless of whether you feel like it.",
            multiline: true,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "sources",
    title: "Sources",
    tagline: "Name your actual ikigai: plural, small, allowed.",
    action: "Schedule one dormant source into the coming week.",
    steps: [
      {
        kind: "teach",
        title: "Name your sources",
        paragraphs: [
          "Time to collect. Your sources of ikigai are the specific things that make life feel worth living: people, pursuits, places, practices, even memories. Kamiya's examples were deliberately small: a child, a garden, a daily ritual, work done well.",
          "You have already gathered evidence. The past stage gave you themes and lost loves; the present stage gave you energising activities, flow situations and strengths; the last stage gave you values. Your sources usually stand where those overlap, but a brand-new candidate is just as welcome as an inherited one.",
          "Aim for four to eight. Keep them concrete (“Saturday morning cycling”, not “fitness”), and let them be unequal: some sources carry more weight than others, and that's fine.",
        ],
      },
      {
        kind: "list",
        title: "Sources list",
        intro:
          "Below are candidates pulled from your earlier answers. Click any to start an entry, or write your own from scratch.",
        entryNoun: "Source",
        minEntries: 4,
        maxEntries: 12,
        seedFrom: [
          { stepId: "1-2", field: "what", targetField: "source" },
          { stepId: "2-2", field: "activity", targetField: "source" },
          { stepId: "1-3", field: "resume", targetField: "source" },
        ],
        fields: [
          { id: "source", label: "The source", type: "text", required: true, placeholder: "e.g. teaching the kids to swim" },
          {
            id: "origin",
            label: "Where it surfaced",
            type: "select",
            required: true,
            options: ["Mined from my past", "Alive in my present", "Serves a value I chose", "New, not from my answers"],
          },
          { id: "feelings", label: "The feelings it gives you", type: "textarea", placeholder: "e.g. usefulness, quiet pride, being needed, calm focus" },
        ],
      },
      {
        kind: "prompts",
        title: "Weigh your sources",
        intro: "Sources are unequal. It's worth knowing which carry the most.",
        prompts: [
          {
            id: "protect",
            label: "If you could keep only three of your sources, which three, and what does that ranking tell you?",
            multiline: true,
          },
          {
            id: "starved",
            label: "Which source is currently the most starved of your time and attention?",
            multiline: true,
          },
        ],
      },
      {
        kind: "prompts",
        title: "A two-word compass (optional)",
        intro:
          "Tim Tamashiro compresses ikigai into two words (a verb and an object, like his own “to delight”). It's a slogan, not a definition; skip it if it feels like a straitjacket.",
        prompts: [
          {
            id: "twowords",
            label: "Try it: “to ______”. What's your two-word compass?",
            placeholder: "e.g. to make, to connect, to grow, to tend",
            optional: true,
          },
          {
            id: "fit",
            label: "Does the phrase fit your sources list, or does the list refuse to compress? Say which, honestly.",
            optional: true,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "contribution",
    title: "Contribution & the world",
    tagline: "Resonance, contribution, and an optional livelihood lens.",
    action: "One small contribution act this week.",
    steps: [
      {
        kind: "teach",
        title: "Resonance and contribution",
        paragraphs: [
          "Every serious account of ikigai includes an outward-facing dimension. Kamiya named it resonance: the sense that your existence answers to something beyond yourself. The Ikigai-9 scale measures it directly: “I feel that I am contributing to someone or society”; “my existence is needed by something or someone”; “I have some impact on someone”.",
          "In Japan, ikigai is often found precisely where the self meets others: in work done for a community, in care given to family, in a craft practised for people who value it. Contribution is not the opposite of personal joy; in practice they usually arrive together.",
          "This stage looks outward: where you already give, where the world's needs tug at you, and then (only if you want it) how your sources connect to earning a living.",
        ],
      },
      {
        kind: "teach",
        title: "The four-circle diagram, honestly",
        paragraphs: [
          "A reminder of where the famous diagram comes from. Andrés Zuzunaga drew it around 2011–2012 as a purpose-of-work model (“what you love, what you're good at, what the world needs, what you can be paid for”), and Marc Winn attached the word ikigai to it in 2014. It is a Western career-counselling tool wearing a Japanese word.",
          "As a tool for thinking about livelihood, it's still genuinely useful. As a definition of ikigai, it's wrong: it implies a single profitable intersection, where the Japanese conception wants plural, small, work-optional sources.",
          "So: the next two exercises are optional. If your question is “how do I connect my ikigai to making a living?”, they will help. If your ikigai has nothing to do with earning, that is the orthodox position, and a perfectly good place to stop.",
        ],
      },
      {
        kind: "prompts",
        title: "World needs",
        intro: "Not “solve the world”. Just notice what tugs at you specifically.",
        prompts: [
          {
            id: "annoys",
            label: "What genuinely annoys or saddens you about the world around you?",
            multiline: true,
          },
          {
            id: "fix",
            label: "If you could press on one small corner of that, which corner?",
            multiline: true,
          },
          {
            id: "serve",
            label: "Who do you most want to serve? Describe them.",
            multiline: true,
          },
        ],
      },
      {
        kind: "prompts",
        title: "Contribution inventory",
        intro: "Where giving already happens in your life.",
        prompts: [
          {
            id: "give",
            label: "Where do you already give? Time, care, skill, money, attention.",
            multiline: true,
          },
          {
            id: "thanks",
            label: "What have people actually thanked you for, recently or repeatedly?",
            multiline: true,
          },
        ],
      },
      {
        kind: "prompts",
        title: "The livelihood lens (optional)",
        intro:
          "Optional: the four-circle model applied to your sources. Skip freely if earning isn't part of your question.",
        prompts: [
          {
            id: "love-good",
            label: "Of your sources, which do you both love and do well?",
            multiline: true,
          },
          {
            id: "paid",
            label: "Which of those could someone plausibly be paid for, and by whom, for what?",
            multiline: true,
          },
          {
            id: "gaps",
            label: "Name the gap honestly: what's missing between your sources and a livelihood (skill, audience, courage, patience)?",
            multiline: true,
          },
        ],
      },
      {
        kind: "prompts",
        title: "Job crafting (optional)",
        intro:
          "If you have a current job, you can move it toward your sources without leaving it. Both prompts optional.",
        prompts: [
          {
            id: "reshape",
            label: "Which small parts of your current work could be expanded, reshaped, or traded away, to make room for what energises you?",
            multiline: true,
          },
          {
            id: "first",
            label: "What is the smallest such change you could make this month?",
            multiline: true,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "enemies",
    title: "Enemies & experiments",
    tagline: "Clear resistance; convert insight into motion.",
    action: "Run experiment #1. The plan is the action.",
    steps: [
      {
        kind: "teach",
        title: "The four enemies",
        paragraphs: [
          "Tim Tamashiro names four fears that block ikigai: fear of failure, fear of success, fear of what others will think, and fear of discomfort. They rarely announce themselves; they arrive as “someday”, “I'm not ready”, or a sudden full calendar.",
          "The useful move is naming. Written down, a fear shrinks to a specific object with a specific shape, and specific objects can be planned around.",
          "Morita therapy adds the sting: don't wait for the fear to pass. Act with the fear in the room; the action comes first, the confidence after.",
          "You will not eliminate these fears. The goal is smaller and real: recognise which ones grip you, and have a move ready for each.",
        ],
      },
      {
        kind: "list",
        title: "Enemies worksheet",
        intro:
          "Name the fears that actually apply to you (one to four is plenty). For each: how it shows up, how tightly it grips, and one counter-move.",
        entryNoun: "Fear",
        minEntries: 2,
        maxEntries: 4,
        fields: [
          {
            id: "fear",
            label: "Which fear",
            type: "select",
            required: true,
            options: ["Fear of failure", "Fear of success", "Fear of others' judgment", "Fear of discomfort", "Something else"],
          },
          { id: "shows", label: "How it shows up in your life", type: "textarea", required: true, placeholder: "e.g. I bookmark courses and never start; I downplay my work when asked" },
          { id: "grip", label: "How tight is its grip", type: "select", required: true, options: ["Loose", "Moderate", "Tight"] },
          { id: "counter", label: "One counter-move", type: "text", required: true, placeholder: "e.g. show one unfinished thing to one person this week" },
        ],
      },
      {
        kind: "prompts",
        title: "If-then plans",
        intro:
          "Implementation intentions: decide now what you will do when the fear speaks. Specific beats heroic.",
        prompts: [
          {
            id: "plan1",
            label: "If [the fear appears in situation X], then I will [small concrete action]. Write your first plan.",
            multiline: true,
          },
          {
            id: "plan2",
            label: "And a second plan, for the fear you rated tightest.",
            multiline: true,
          },
        ],
      },
      {
        kind: "list",
        title: "Experiments plan",
        intro:
          "Depth comes from action, not insight. Design three small experiments that give a source room to breathe: minimum versions, real dates.",
        entryNoun: "Experiment",
        minEntries: 3,
        maxEntries: 5,
        seedFrom: [{ stepId: "4-1", field: "source", targetField: "source" }],
        fields: [
          { id: "source", label: "Which source it serves", type: "text", required: true, placeholder: "e.g. teaching the kids to swim" },
          { id: "minimum", label: "The minimum version", type: "text", required: true, placeholder: "e.g. one hour, once, this week" },
          { id: "when", label: "When it happens", type: "text", required: true, placeholder: "e.g. Saturday morning" },
          { id: "checkin", label: "Check-in date", type: "text", placeholder: "e.g. Sunday evening" },
        ],
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
        title: "Practice, not trophy",
        paragraphs: [
          "You are about to assemble everything into one page: sources, values, needs, experiments, and a measured before-and-after. Treat it as a snapshot of a practice, not a trophy. Kamiya's needs erode as circumstances change; sources fade and are replaced; the map is meant to be re-read and redrawn.",
          "That is why the journey ends with a retest of the Ikigai-9 scale you took at the very start. It is the same nine statements, answered by a slightly different life. The gap between the two sets of answers is yours to interpret: movement in any direction is information, not judgement.",
        ],
      },
      {
        kind: "scale",
        title: "Ikigai-9 retest",
        intro:
          "The same nine statements from the first day. Answer as you find yourself now.",
        target: "retest",
        items: ikigai9ScaleItems,
      },
      {
        kind: "prompts",
        title: "What changed",
        intro:
          "Your baseline and retest scores appear on your map. Here, interpret them.",
        prompts: [
          {
            id: "moved",
            label: "Which answers moved most between the two tests, and what in your life does that reflect?",
            multiline: true,
          },
          {
            id: "needs",
            label: "Looking at your needs ratings: which one need would change your days most if you strengthened it?",
            multiline: true,
          },
        ],
      },
      {
        kind: "prompts",
        title: "Practice plan",
        intro: "Close the loop: how this map stays alive.",
        prompts: [
          {
            id: "cadence",
            label: "When will you re-read your map, and when will you retake the Ikigai-9? Propose a real date.",
            placeholder: "e.g. first Sunday of each month; retest in three months",
          },
          {
            id: "strengthen",
            label: "Which single experiment continues first, and what is its very next step?",
            multiline: true,
          },
        ],
      },
    ],
  },
];

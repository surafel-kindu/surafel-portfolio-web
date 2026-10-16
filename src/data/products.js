export const products = [{
  id: "asili",
  category: "AGRITECH",
  previewDescription: "Daily, local farming advice. A pocket agronomist that puts farmers first.",
  name: "Asili",
  tagline: "Smart Farming Advisory",
  badge: "AgriTech · AI",
  theme: "lime",
  url: "https://asili.afroawi.com/",
  desc: "A pocket agronomist for every farmer — daily, local farming advice that works on any phone, even offline. Map your fields, connect soil & weather sensors, and ask an AI advisor anything.",
  longDesc: ["Asili gives every farmer daily, local farming advice that works on any phone — even offline. Open it in the morning and it greets you with a briefing tuned to your exact field: what your land is telling you today, what to watch for, and what to do next.", "From protecting teff from waterlogging in kiremt to connecting soil and weather sensors, Asili turns agronomy into clear, ranked answers — no jargon, no waiting for an extension officer who serves a whole district."],
  stats: [["Focus", "AgriTech & AI"], ["Platform", "Web & Mobile"], ["Built for", "Every farmer"]],
  tags: ["React", "AI / ML", "AgriTech"],
  gallery: [{
    src: "/images/blog/asili-2.jpg",
    caption: "Daily guidance, ask anything, know your land."
  }, {
    src: "/images/blog/asili-1.jpg",
    caption: "The daily briefing — fields, sensors and farm news."
  }],
  features: ["Daily guidance — a briefing tuned to your exact field, every day", "Ask anything — chat advisor with clear, ranked answers", "Know your land — map fields and track harvests", "Connect soil & weather sensors for advice from live data", "Offline-first — works on any phone", "Localized crop guides for the seasons farmers know best"]
}, {
  id: "halt",
  category: "DEVELOPER TOOLS",
  previewDescription: "Thoughtful rate limiting for APIs. Safe defaults, built for Python and TypeScript.",
  name: "Halt",
  tagline: "Modern Rate Limiting",
  badge: "Dev Tool · v0.4.0",
  theme: "ink",
  url: "https://halt.afroawi.com/",
  github: "https://github.com/surafel-kindu/halt",
  code: "pip install halt-rate\n# or\nnpm install halt-rate",
  desc: "Drop-in rate-limiting middleware for APIs & SaaS — safe defaults, observability hooks and distributed storage. Works the same in Python and TypeScript.",
  longDesc: ["Halt sits between your clients and your handlers. It identifies who is calling (by IP, user, or API key), counts their requests against a policy, and forwards or blocks each one in well under a millisecond — your route code never changes.", "Blocked requests get a 429 before your handler ever runs, every response carries RateLimit-* headers, and well-behaved clients get a Retry-After so they can back off on their own."],
  stats: [["Algorithms", "4"], ["Storage backends", "6"], ["Frameworks", "8"]],
  tags: ["Python", "TypeScript", "Redis", "FastAPI", "Express"],
  gallery: [{
    src: "/images/blog/halt-1.jpg",
    caption: "Drop-in middleware with safe defaults."
  }, {
    src: "/images/blog/halt-2.jpg",
    caption: "One policy. Any stack. Limit with confidence."
  }, {
    src: "/images/blog/halt-3.jpg",
    caption: "Works the same in Python and TypeScript."
  }],
  features: ["Token Bucket, Fixed Window, Sliding Window & Leaky Bucket", "Memory, Redis, PostgreSQL, MongoDB, DynamoDB & Memcached", "FastAPI, Flask, Django, Express, NestJS, Next.js, Hono & Fastify", "Plans, quotas, penalties & per-plan tagging for SaaS", "StatsCollector endpoint + OpenTelemetry metrics adapter", "RateLimit-* headers & Retry-After on every response"]
}, {
  id: "arcade",
  name: "Model Arcade Lab",
  category: "AI RESEARCH",
  tagline: "Small models. Real decisions.",
  badge: "Open Research · System 1 AI",
  theme: "arcade",
  url: "https://arcade.afroawi.com/",
  github: "https://github.com/surafel-kindu/system-one-models-game-test",
  logo: "/images/products/arcade/arcade-logo.png",
  preview: "/images/products/arcade/arcade-home.png",
  previewDescription: "An open playground for small decision models. Five games, visible choices, and benchmarks you can inspect.",
  desc: "An open experiment in System 1 AI: five familiar games explore how well a small model can choose its next move.",
  longDesc: [
    "I created Model Arcade Lab to make small-model decisions visible. Game states become text, a shared model backend scores a set of candidate actions, and the engine applies the chosen move. The lab brings together 2048, Dino Run, Chess, Flappy Bird, and Sudoku.",
    "The benchmark archive makes the conditions part of the story: inspect seeds, engine versions, control settings, scores, and decision timing. Compare models against baselines and explore recorded runs before interpreting the rankings. The project is open source, with guides for contributing another model or game."
  ],
  stats: [["Games", "5"], ["Model backends", "7"], ["My role", "Creator"]],
  tags: ["Python", "JavaScript", "System 1 AI", "Benchmarking"],
  gallery: [
    { src: "/images/products/arcade/arcade-home.png", caption: "The experiment floor — five familiar games, one question about the next move." },
    { src: "/images/products/arcade/arcade-benchmarks.png", caption: "The benchmark archive — recorded runs, inspectable settings, and model comparisons." },
    { src: "/images/products/arcade/arcade-overview.png", caption: "A closer look at the games, decision loop, and open-source experiment." }
  ],
  features: [
    "Five game environments: 2048, Dino Run, Chess, Flappy Bird, and Sudoku",
    "Seven supported model backends alongside baseline players",
    "Inspectable context, candidate actions, and model choices",
    "Recorded benchmarks with seeds, engine versions, and control settings",
    "Scores, consistency, and decision timing in the results archive",
    "Open-source guides for bringing a model or building a game"
  ]
}];

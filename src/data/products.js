export const products = [{
  id: "asili",
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
}];

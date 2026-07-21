import { useState } from "react";

import { FiArrowUpRight, FiPlus } from "react-icons/fi";

import SectionHeader from "../SharedComponents/SectionHeader";
import ProductModal from "./ProductModal";

const products = [
    {
        id: "asili",
        name: "Asili",
        tagline: "Smart Farming Advisory",
        badge: "AgriTech · AI",
        theme: "lime",
        url: "https://asili.afroawi.com/",
        desc: "A pocket agronomist for every farmer — daily, local farming advice that works on any phone, even offline. Map your fields, connect soil & weather sensors, and ask an AI advisor anything.",
        longDesc: [
            "Asili gives every farmer daily, local farming advice that works on any phone — even offline. Open it in the morning and it greets you with a briefing tuned to your exact field: what your land is telling you today, what to watch for, and what to do next.",
            "From protecting teff from waterlogging in kiremt to connecting soil and weather sensors, Asili turns agronomy into clear, ranked answers — no jargon, no waiting for an extension officer who serves a whole district.",
        ],
        stats: [["Focus", "AgriTech & AI"], ["Platform", "Web & Mobile"], ["Built for", "Every farmer"]],
        tags: ["React", "AI / ML", "AgriTech"],
        gallery: [
            { src: "/images/blog/asili-2.jpg", caption: "Daily guidance, ask anything, know your land." },
            { src: "/images/blog/asili-1.jpg", caption: "The daily briefing — fields, sensors and farm news." },
        ],
        features: [
            "Daily guidance — a briefing tuned to your exact field, every day",
            "Ask anything — chat advisor with clear, ranked answers",
            "Know your land — map fields and track harvests",
            "Connect soil & weather sensors for advice from live data",
            "Offline-first — works on any phone",
            "Localized crop guides for the seasons farmers know best",
        ],
    },
    {
        id: "halt",
        name: "Halt",
        tagline: "Modern Rate Limiting",
        badge: "Dev Tool · v0.4.0",
        theme: "ink",
        url: "https://halt.afroawi.com/",
        github: "https://github.com/surafel-kindu/halt",
        code: "pip install halt-rate\n# or\nnpm install halt-rate",
        desc: "Drop-in rate-limiting middleware for APIs & SaaS — safe defaults, observability hooks and distributed storage. Works the same in Python and TypeScript.",
        longDesc: [
            "Halt sits between your clients and your handlers. It identifies who is calling (by IP, user, or API key), counts their requests against a policy, and forwards or blocks each one in well under a millisecond — your route code never changes.",
            "Blocked requests get a 429 before your handler ever runs, every response carries RateLimit-* headers, and well-behaved clients get a Retry-After so they can back off on their own.",
        ],
        stats: [["Algorithms", "4"], ["Storage backends", "6"], ["Frameworks", "8"]],
        tags: ["Python", "TypeScript", "Redis", "FastAPI", "Express"],
        gallery: [
            { src: "/images/blog/halt-1.jpg", caption: "Drop-in middleware with safe defaults." },
            { src: "/images/blog/halt-2.jpg", caption: "One policy. Any stack. Limit with confidence." },
            { src: "/images/blog/halt-3.jpg", caption: "Works the same in Python and TypeScript." },
        ],
        features: [
            "Token Bucket, Fixed Window, Sliding Window & Leaky Bucket",
            "Memory, Redis, PostgreSQL, MongoDB, DynamoDB & Memcached",
            "FastAPI, Flask, Django, Express, NestJS, Next.js, Hono & Fastify",
            "Plans, quotas, penalties & per-plan tagging for SaaS",
            "StatsCollector endpoint + OpenTelemetry metrics adapter",
            "RateLimit-* headers & Retry-After on every response",
        ],
    },
];

const statRow = (rows) => (
    <div className="flex flex-col">
        {rows.map(([k, v]) => (
            <div key={k}
                className="flex items-center justify-between border-b border-ink/10 py-3 text-sm last:border-b-0">
                <span className="text-ink/45">{k}</span>
                <span className="font-display font-bold text-ink">{v}</span>
            </div>
        ))}
    </div>
);

const tags = (list) => (
    <div className="flex flex-wrap gap-2">
        {list.map((t) => (
            <span key={t}
                className="rounded-full border border-ink/10 bg-cream px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/60">
                {t}
            </span>
        ))}
    </div>
);

const BandDeco = ({ id }) => id === "asili" ? (
    <svg viewBox="0 0 120 80" className="absolute -bottom-1 right-5 h-20 w-28 md:h-24 md:w-36" fill="none">
        <rect x="8" y="42" width="10" height="34" rx="5" fill="#16150F" />
        <rect x="30" y="28" width="10" height="48" rx="5" fill="#16150F" opacity="0.75" />
        <rect x="52" y="50" width="10" height="26" rx="5" fill="#16150F" opacity="0.5" />
        <rect x="74" y="16" width="10" height="60" rx="5" fill="#16150F" />
        <rect x="96" y="34" width="10" height="42" rx="5" fill="#16150F" opacity="0.8" />
    </svg>
) : (
    <svg viewBox="0 0 160 60" className="absolute -bottom-1 right-4 h-16 w-36 md:h-20 md:w-44" fill="none">
        <path d="M2 42 C 20 42, 24 14, 42 14 S 60 50, 78 50 S 96 8, 114 8 S 140 42, 158 30"
            stroke="#D9F24F" strokeWidth="3" strokeLinecap="round" />
        <rect x="118" y="40" width="10" height="10" rx="2" fill="#8B7CF6" />
        <rect x="134" y="24" width="10" height="10" rx="2" fill="#E8622C" />
    </svg>
);

function Featured() {

    const [active, setActive] = useState(null);

    return (
        <section id="products" className="w-full">
            <SectionHeader title="Featured Products" />

            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
                {products.map((product) => {
                    const lime = product.theme === "lime";
                    return (
                        <article key={product.id}
                            className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-bento transition-transform duration-300 hover:-translate-y-2">

                            <div className={`relative overflow-hidden p-8 md:p-10 ${lime ? "bg-lime-pop" : "bg-ink"}`}>
                                <div className="flex items-start justify-between gap-4">
                                    <span className={`rounded-full px-3.5 py-1.5 text-[10px] font-display font-bold uppercase tracking-[0.2em] ${lime ? "border border-ink/20 bg-white/60 text-ink" : "border border-white/15 bg-violet-pop text-white"}`}>
                                        {product.badge}
                                    </span>
                                    <button onClick={() => setActive(product)} aria-label={`More about ${product.name}`}
                                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform duration-300 hover:rotate-45 ${lime ? "bg-ink text-lime-pop" : "bg-lime-pop text-ink"}`}>
                                        <FiArrowUpRight size={18} />
                                    </button>
                                </div>

                                <h3 className={`mt-8 font-display text-6xl font-black uppercase leading-none tracking-tight md:text-7xl ${lime ? "text-ink" : "text-cream"}`}>
                                    {product.name}
                                </h3>
                                <p className={`mt-2 font-display text-sm font-bold uppercase tracking-[0.18em] md:text-base ${lime ? "text-ink/60" : "text-cream/50"}`}>
                                    {product.tagline}
                                </p>

                                <BandDeco id={product.id} />
                            </div>

                            <div className="flex flex-1 flex-col gap-5 p-8 md:p-10">
                                <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                                    {product.desc}
                                </p>

                                {product.code && (
                                    <code className="w-fit rounded-xl bg-ink px-4 py-2.5 font-mono text-sm text-lime-pop">
                                        $ pip install halt-rate
                                    </code>
                                )}

                                {statRow(product.stats)}

                                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
                                    {tags(product.tags)}
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setActive(product)}
                                            className="group/btn flex items-center gap-2 rounded-full border border-ink/15 bg-white py-2.5 pl-5 pr-2.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-orange-pop hover:text-orange-pop">
                                            Details
                                            <span className="grid h-6 w-6 place-items-center rounded-full bg-orange-pop text-white transition-transform duration-300 group-hover/btn:rotate-90">
                                                <FiPlus size={12} />
                                            </span>
                                        </button>
                                        <a href={product.url} target="_blank" rel="noreferrer"
                                            className="group/btn flex items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-orange-pop">
                                            Visit site
                                            <span className="grid h-6 w-6 place-items-center rounded-full bg-lime-pop text-ink transition-transform duration-300 group-hover/btn:rotate-45">
                                                <FiArrowUpRight size={12} />
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {active && <ProductModal product={active} onClose={() => setActive(null)} />}
        </section>
    );
}

export default Featured;

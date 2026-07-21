import React from "react";

import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCalendar, FiClock } from "react-icons/fi";

import postsData from "../../json/posts.json";
import SectionHeader from "../SharedComponents/SectionHeader";

function BlogTeaser() {

    const latest = postsData.posts[0];

    if (!latest) return null;

    return (
        <section id="blog" className="w-full">
            <SectionHeader title="From the Blog" />

            <Link to={`/blog/${latest.slug}`} className="group block">
                <article className="grid grid-cols-1 overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-bento transition-all duration-300 group-hover:-translate-y-2 md:grid-cols-5">

                    <div className="relative h-56 overflow-hidden bg-cream-2 md:col-span-2 md:h-auto">
                        <img src={latest.cover} alt={latest.title}
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute left-5 top-5 rounded-full border border-ink/10 bg-cream/90 px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink backdrop-blur">
                            Latest post
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 p-8 md:col-span-3 md:p-10">
                        <div className="flex items-center gap-4 text-[11px] font-display font-bold uppercase tracking-[0.15em] text-ink/45">
                            <span className="flex items-center gap-1.5"><FiCalendar size={12} /> {latest.date}</span>
                            <span className="flex items-center gap-1.5"><FiClock size={12} /> {latest.readTime}</span>
                        </div>

                        <h3 className="font-display text-2xl font-extrabold uppercase leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-orange-pop md:text-3xl">
                            {latest.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-ink-soft md:text-base">
                            {latest.excerpt}
                        </p>

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
                            <div className="flex flex-wrap gap-2">
                                {latest.tags.map((t) => (
                                    <span key={t}
                                        className="rounded-full border border-ink/10 bg-cream px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/60">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <span className="flex items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-cream transition-colors duration-300 group-hover:bg-orange-pop">
                                Read post
                                <span className="grid h-6 w-6 place-items-center rounded-full bg-lime-pop text-ink transition-transform duration-300 group-hover:rotate-45">
                                    <FiArrowUpRight size={12} />
                                </span>
                            </span>
                        </div>
                    </div>
                </article>
            </Link>

            <div className="mt-6 flex justify-center">
                <Link to="/blog"
                    className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-ink/50 transition-colors hover:text-orange-pop">
                    View all posts →
                </Link>
            </div>
        </section>
    );
}

export default BlogTeaser;

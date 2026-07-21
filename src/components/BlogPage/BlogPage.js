import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCalendar, FiClock } from "react-icons/fi";

import postsData from "../../json/posts.json";
import AppBar from "../SharedComponents/AppBar";

function BlogPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const posts = postsData.posts;

    return (
        <div className="min-h-screen bg-cream font-body text-ink">
            <AppBar />

            <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-32 md:px-8 md:pt-40">

                {/* ---- Header ---- */}
                <div className="mb-12 flex flex-col items-start gap-5 md:mb-16">
                    <span className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-[11px] font-display font-bold uppercase tracking-[0.2em] text-ink">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-orange-pop"></span>
                        Blog
                    </span>
                    <h1 className="font-display text-5xl font-black uppercase leading-[1.02] tracking-tight text-ink md:text-7xl">
                        Notes &{" "}
                        <span className="rounded-2xl border-[3px] border-dashed border-ink/70 px-3 md:px-5">
                            stories
                        </span>
                    </h1>
                    <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                        What I'm building, learning and shipping — products, engineering
                        notes and everything in between.
                    </p>
                </div>

                {/* ---- Posts grid ---- */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                    {posts.map((post) => (
                        <Link to={`/blog/${post.slug}`} key={post.slug} className="group">
                            <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-bento transition-all duration-300 group-hover:-translate-y-2">

                                <div className="relative h-60 overflow-hidden bg-cream-2 md:h-64">
                                    <img src={post.cover} alt={post.title}
                                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                                    <span className="absolute left-5 top-5 rounded-full border border-ink/10 bg-cream/90 px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink backdrop-blur">
                                        {post.tags[0]}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
                                    <div className="flex items-center gap-4 text-[11px] font-display font-bold uppercase tracking-[0.15em] text-ink/45">
                                        <span className="flex items-center gap-1.5"><FiCalendar size={12} /> {post.date}</span>
                                        <span className="flex items-center gap-1.5"><FiClock size={12} /> {post.readTime}</span>
                                    </div>

                                    <h2 className="font-display text-xl font-extrabold uppercase leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-orange-pop md:text-2xl">
                                        {post.title}
                                    </h2>

                                    <p className="text-sm leading-relaxed text-ink-soft">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4">
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.slice(1, 3).map((t) => (
                                                <span key={t}
                                                    className="rounded-full border border-ink/10 bg-cream px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-ink/55">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-lime-pop transition-all duration-300 group-hover:rotate-45 group-hover:bg-orange-pop group-hover:text-white">
                                            <FiArrowUpRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>

            {/* ---- Mini footer ---- */}
            <footer className="border-t border-ink/10">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 md:px-8">
                    <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink/50">
                        Surafel Kindu © 2026
                    </span>
                    <Link to="/"
                        className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-orange-pop">
                        ← Back home
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default BlogPage;

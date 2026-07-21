import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from "react-icons/fi";

import postsData from "../../json/posts.json";
import AppBar from "../SharedComponents/AppBar";

const Block = ({ block }) => {
    switch (block.type) {
        case "h2":
            return (
                <h2 className="pt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-ink md:text-3xl">
                    {block.text}
                </h2>
            );
        case "p":
            return (
                <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                    {block.text}
                </p>
            );
        case "image":
            return (
                <figure className="flex flex-col gap-3">
                    <img src={block.src} alt={block.caption || ""}
                        className="w-full rounded-[1.5rem] border border-ink/10 object-cover shadow-bento" />
                    {block.caption && (
                        <figcaption className="text-center font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );
        case "gallery":
            return (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {block.images.map((img) => (
                        <figure key={img.src} className="flex flex-col gap-3">
                            <img src={img.src} alt={img.caption || ""}
                                className="h-full w-full rounded-[1.5rem] border border-ink/10 object-cover object-top shadow-bento" />
                            {img.caption && (
                                <figcaption className="text-center font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                                    {img.caption}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            );
        case "code":
            return (
                <pre className="overflow-x-auto rounded-2xl bg-ink px-5 py-4 font-mono text-sm leading-relaxed text-lime-pop">
                    {block.text}
                </pre>
            );
        case "quote":
            return (
                <blockquote className="rounded-[1.5rem] border-l-8 border-lime-pop bg-ink p-6 md:p-8">
                    <span className="font-display text-4xl leading-none text-lime-pop">❝</span>
                    <p className="mt-2 font-display text-xl font-bold leading-snug text-cream md:text-2xl">
                        {block.text}
                    </p>
                </blockquote>
            );
        case "list":
            return (
                <ul className="flex flex-col gap-3">
                    {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-ink-soft md:text-lg">
                            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-orange-pop"></span>
                            {item}
                        </li>
                    ))}
                </ul>
            );
        default:
            return null;
    }
};

function BlogPostPage() {

    const { slug } = useParams();
    const post = postsData.posts.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    return (
        <div className="min-h-screen bg-cream font-body text-ink">
            <AppBar />

            <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-32 md:pt-40">

                {!post ? (
                    <div className="flex flex-col items-start gap-6">
                        <h1 className="font-display text-4xl font-black uppercase text-ink md:text-6xl">
                            Post not found
                        </h1>
                        <Link to="/blog"
                            className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-orange-pop">
                            <FiArrowLeft size={14} /> All posts
                        </Link>
                    </div>
                ) : (
                    <article className="flex flex-col gap-6">

                        <Link to="/blog"
                            className="group flex w-fit items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-orange-pop">
                            <FiArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                            All posts
                        </Link>

                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                                <span key={t}
                                    className="rounded-full border border-ink/10 bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/60">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h1 className="font-display text-3xl font-black uppercase leading-[1.08] tracking-tight text-ink md:text-5xl">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-5 border-y border-ink/10 py-4 text-[11px] font-display font-bold uppercase tracking-[0.15em] text-ink/45">
                            <span className="flex items-center gap-1.5"><FiUser size={12} /> {post.author}</span>
                            <span className="flex items-center gap-1.5"><FiCalendar size={12} /> {post.date}</span>
                            <span className="flex items-center gap-1.5"><FiClock size={12} /> {post.readTime}</span>
                        </div>

                        <img src={post.cover} alt={post.title}
                            className="h-64 w-full rounded-[2rem] border border-ink/10 object-cover object-top shadow-bento md:h-96" />

                        <div className="mt-2 flex flex-col gap-6">
                            {post.blocks.map((block, i) => (
                                <Block key={i} block={block} />
                            ))}
                        </div>

                        {/* ---- Author card ---- */}
                        <div className="mt-8 flex items-center gap-4 rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-bento">
                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink font-display text-lg font-black text-lime-pop">
                                S.
                            </span>
                            <div>
                                <div className="font-display text-sm font-extrabold uppercase tracking-widest text-ink">
                                    Surafel Kindu
                                </div>
                                <div className="text-sm text-ink-soft">
                                    Co-Founder @ Afroawi · Software Engineer @ TestSavant.AI
                                </div>
                            </div>
                        </div>
                    </article>
                )}
            </main>

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

export default BlogPostPage;

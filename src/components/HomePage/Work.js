import React, { useState, useEffect } from 'react';

import { FiGithub, FiArrowUpRight, FiExternalLink } from "react-icons/fi";

import { db } from '../../firebase/firebaseConfig';
import { onSnapshot, collection, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import { fallbackWorks, mergeWorks } from '../../data/fallback';
import SectionHeader from '../SharedComponents/SectionHeader';

// Initials tile used when a work entry has no image (e.g. current job).
const InitialsTile = ({ name }) => {
    const initials = (name || "?")
        .split(/[\s.]+/)
        .filter(Boolean)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-ink">
            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-violet-pop/40"></div>
            <div className="absolute -bottom-10 -right-6 h-32 w-32 rounded-full bg-lime-pop/25"></div>
            <span className="font-display text-7xl font-black text-lime-pop md:text-8xl">
                {initials}
            </span>
        </div>
    );
};

function Work() {

    const [works, setWorks] = useState(fallbackWorks);

    useEffect(() => {
        const q = query(collection(db, "projects"));
        const unsub = onSnapshot(q,
            (snapshot) => {
                const wrks = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                if (wrks.length > 0) setWorks(mergeWorks(wrks));
            },
            () => { /* offline — fallback works stay */ }
        );
        return () => unsub();
    }, []);

    return (
        <section id="work" className="w-full">
            <SectionHeader title="Work Experience" />

            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
                {works.map((work) => (
                    <article key={work.id}
                        className="group flex flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-bento transition-all duration-300 hover:-translate-y-2">

                        <div className="relative h-60 overflow-hidden bg-cream-2 md:h-72">
                            {work.images?.[0] ? (
                                <img src={work.images[0]} alt={work.name}
                                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                            ) : (
                                <InitialsTile name={work.name} />
                            )}
                            <span className="absolute left-5 top-5 rounded-full border border-ink/10 bg-cream/90 px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink backdrop-blur">
                                {work.from} — {work.to}
                            </span>
                        </div>

                        <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-ink md:text-2xl">
                                        {work.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-ink/50">{work.title}</p>
                                </div>
                                <Link to={`/work/${work.id}`}
                                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-lime-pop transition-all duration-300 hover:rotate-45 hover:bg-orange-pop hover:text-white">
                                    <FiArrowUpRight size={18} />
                                </Link>
                            </div>

                            <p className="text-sm leading-relaxed text-ink-soft">{work.desc}</p>

                            <div className="flex flex-wrap items-center gap-2 pt-1">
                                {work.techs && work.techs.map((tech) => (
                                    <span key={tech}
                                        className="rounded-full border border-ink/10 bg-cream px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/60">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4">
                                {work.source ? (
                                    <a href={work.source} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55 transition-colors hover:text-orange-pop">
                                        <FiGithub size={15} /> Source
                                    </a>
                                ) : <span></span>}
                                {work.link && (
                                    <a href={work.link} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55 transition-colors hover:text-orange-pop">
                                        Live <FiExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Work;

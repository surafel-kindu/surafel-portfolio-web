import { useState, useEffect, useContext } from 'react';

import { FiArrowUpRight, FiZap } from "react-icons/fi";

import { db } from '../../firebase/firebaseConfig';
import { onSnapshot, collection, query } from 'firebase/firestore';

import { UserContext } from '../../contexts/UserContext';
import { fallbackInfo, fallbackSkills } from '../../data/fallback';
import profileFallback from '../../asset/profile.JPG';

const stats = [
    { num: "4+", label: "Years of experience" },
    { num: "12+", label: "Projects shipped" },
    { num: "2", label: "Own products" },
    { num: "4", label: "Certifications" },
];

const roles = [
    { label: "Co-Founder", org: "Afroawi", url: "https://afroawi.com/", dark: true, dot: "bg-lime-pop" },
    { label: "Software Engineer", org: "TestSavant", url: "https://testsavant.ai/", dark: false, dot: "bg-violet-pop" },
];

function HomePage() {
    const { myData } = useContext(UserContext);
    const [skills, setSkills] = useState(fallbackSkills);

    // Hero photo: prefer remote profile URL, but revert to the local
    // photo if the remote one is missing or fails to load.
    const [photoSrc, setPhotoSrc] = useState(profileFallback);

    useEffect(() => {
        if (myData?.profile) setPhotoSrc(myData.profile);
    }, [myData]);

    useEffect(() => {
        const q = query(collection(db, "skills"));
        const unsub = onSnapshot(q,
            (snapshot) => {
                const sks = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                if (sks.length > 0) setSkills(sks);
            },
            () => { /* offline — fallback skills stay */ }
        );
        return () => unsub();
    }, []);

    return (
        <section id="about" className="w-full pt-32 md:pt-40">

            <div className="grid grid-cols-12 items-center gap-10">

                {/* ---- Left: headline ---- */}
                <div className="col-span-12 flex flex-col items-start gap-6 lg:col-span-7">

                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-[11px] font-display font-bold uppercase tracking-[0.2em] text-ink">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-pop"></span>
                            Open to work
                        </span>
                        <span className="hidden h-[3px] w-16 dots-line md:block"></span>
                        <span className="hidden text-[11px] font-display font-bold uppercase tracking-[0.2em] text-ink/45 md:block">
                            Portfolio © 2026
                        </span>
                    </div>

                    <h1 className="font-display text-[13vw] font-black uppercase leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl xl:text-[5.1rem]">
                        I build
                        <br />
                        <span className="my-1 inline-flex flex-wrap items-center gap-3 md:gap-5">
                            <span className="rounded-2xl border-[3px] border-dashed border-ink/70 px-3 md:px-5">
                                delightful
                            </span>
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-lg text-lime-pop md:h-14 md:w-14 md:text-2xl">
                                ▶
                            </span>
                            products
                        </span>
                    </h1>

                    <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                        {fallbackInfo.statement}
                    </p>

                    {/* ---- Current roles ---- */}
                    <div className="flex flex-wrap items-center gap-3">
                        {roles.map((role) => (
                            <a key={role.org} href={role.url} target="_blank" rel="noreferrer"
                                className={role.dark
                                    ? "group flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[11px] font-display font-bold uppercase tracking-[0.15em] text-cream transition-colors duration-300 hover:bg-orange-pop"
                                    : "group flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-[11px] font-display font-bold uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:border-orange-pop hover:text-orange-pop"}>
                                <span className={`h-1.5 w-1.5 rounded-full ${role.dot}`}></span>
                                {role.label} · {role.org}
                                <FiArrowUpRight size={12} className={role.dark ? "text-lime-pop" : "text-orange-pop"} />
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <a href="#work"
                            className="group flex items-center gap-3 rounded-full bg-ink py-3 pl-7 pr-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-orange-pop">
                            See my work
                            <span className="grid h-8 w-8 place-items-center rounded-full bg-lime-pop text-ink transition-transform duration-300 group-hover:rotate-45">
                                <FiArrowUpRight size={14} />
                            </span>
                        </a>
                        <div className="flex items-center gap-3">
                            <span className="font-display text-3xl font-black text-ink md:text-4xl">4+</span>
                            <span className="text-[10px] font-display font-bold uppercase leading-tight tracking-[0.2em] text-ink/50">
                                Years of<br />experience
                            </span>
                        </div>
                    </div>

                    {/* ---- Toolbox chips ---- */}
                    <div className="mt-2 flex w-full flex-col gap-3">
                        <span className="text-[10px] font-display font-bold uppercase tracking-[0.25em] text-ink/45">
                            Toolbox
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <div key={skill.id}
                                    className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 transition-transform duration-200 hover:-translate-y-1 hover:scale-105">
                                    <img src={skill.icon} title={skill.title} alt={skill.title} width="16" height="16" />
                                    <span className="text-xs font-medium text-ink/70">{skill.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---- Right: photo card ---- */}
                <div className="relative col-span-12 mt-6 lg:col-span-5 lg:mt-0">
                    <div className="absolute -top-8 right-0 hidden h-28 w-28 rounded-3xl border-2 border-dashed border-ink/25 md:block"></div>

                    <div className="relative mx-auto w-64 sm:w-72 md:w-80">
                        {/* violet offset backdrop */}
                        <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.2rem] bg-violet-pop"></div>

                        <img src={photoSrc} alt="Surafel Kindu"
                            onError={() => setPhotoSrc(profileFallback)}
                            className="relative h-80 w-full rounded-[2.2rem] border-4 border-white object-cover shadow-bento sm:h-96" />

                        {/* experience chip */}
                        <div className="absolute -left-6 -top-6 flex -rotate-6 items-center gap-2.5 rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-chip">
                            <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-pop text-white">
                                <FiZap size={15} />
                            </span>
                            <span className="leading-tight">
                                <span className="block font-display text-sm font-black text-ink">4+ yrs</span>
                                <span className="block text-[9px] font-bold uppercase tracking-widest text-ink/50">experience</span>
                            </span>
                        </div>

                        {/* sticker */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 -rotate-6 whitespace-nowrap rounded-2xl border-2 border-ink bg-lime-pop px-5 py-3 shadow-chip">
                            <span className="font-mono text-sm font-bold text-ink md:text-base">
                                git commit -m "let's build"
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---- Stats bento strip ---- */}
            <div className="mt-20 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-4">
                {stats.map((s) => (
                    <div key={s.label}
                        className="group flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-bento md:p-6">
                        <div className="flex items-start justify-between">
                            <span className="font-display text-4xl font-black tracking-tight text-ink md:text-5xl">{s.num}</span>
                            <FiArrowUpRight className="text-ink/25 transition-colors duration-300 group-hover:text-orange-pop" size={20} />
                        </div>
                        <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-ink/50">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* ---- Marquee band ---- */}
            <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2 -rotate-1 overflow-hidden bg-ink py-3.5 md:mt-20">
                <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap px-5">
                    {[...skills, ...skills].map((s, i) => (
                        <span key={i} className="flex items-center gap-10">
                            <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-cream">{s.title}</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-pop"></span>
                        </span>
                    ))}
                </div>
            </div>

        </section>
    );
}

export default HomePage;

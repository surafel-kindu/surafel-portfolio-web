import React, { useState, useEffect } from "react";

import { FiFolder, FiArrowUpRight, FiGithub } from "react-icons/fi";

import otherworks from "../../json/otherworks.json";
import SectionHeader from "../SharedComponents/SectionHeader";

function Experience() {

    const [projects, setProjects] = useState(null);

    useEffect(() => {
        setProjects(otherworks.otherworks);
    }, []);

    return (
        <section id="projects" className="w-full">
            <SectionHeader title="More Projects" />

            {projects !== null && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
                    {projects.map(({ id, title, description, link, techs, github }) => (
                        <article key={id}
                            className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-bento">

                            <div className="mb-5 flex items-start justify-between">
                                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime-pop text-ink">
                                    <FiFolder size={18} />
                                </span>
                                <div className="flex items-center gap-2">
                                    {github && (
                                        <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub"
                                            className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink/50 transition-colors hover:bg-ink hover:text-lime-pop">
                                            <FiGithub size={15} />
                                        </a>
                                    )}
                                    {link && (
                                        <a href={link} target={link.startsWith("/") ? "_self" : "_blank"} rel="noreferrer" aria-label="Open project"
                                            className="grid h-9 w-9 place-items-center rounded-full bg-ink text-lime-pop transition-all duration-300 hover:rotate-45 hover:bg-orange-pop hover:text-white">
                                            <FiArrowUpRight size={15} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <h3 className="font-display text-base font-extrabold uppercase leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-orange-pop">
                                {title}
                            </h3>
                            <p className="mt-2 hidden text-sm leading-relaxed text-ink-soft md:block">
                                {description}
                            </p>

                            <div className="mt-auto flex flex-wrap gap-2 pt-4">
                                {techs.map((tech) => (
                                    <span key={tech}
                                        className="rounded-full border border-ink/10 bg-cream px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-ink/55">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Experience;

import React, { useState, useEffect } from "react";

import { FiAward, FiArrowUpRight } from "react-icons/fi";

import certifications from "../../json/certifications.json";
import SectionHeader from "../SharedComponents/SectionHeader";

function Certification() {

    const [certificates, setCertificates] = useState(null);

    useEffect(() => {
        setCertificates(certifications.certificates);
    }, []);

    return (
        <section id="certificates" className="w-full">
            <SectionHeader title="Certifications" />

            {certificates !== null && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
                    {certificates.map(({ name, org, date, id, link, techs }) => (
                        <article key={id}
                            className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-bento">

                            <div className="mb-5 flex items-start justify-between">
                                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-pop text-white">
                                    <FiAward size={18} />
                                </span>
                                <a href={link} target="_blank" rel="noreferrer" aria-label="View certificate"
                                    className="grid h-9 w-9 place-items-center rounded-full bg-ink text-lime-pop transition-all duration-300 hover:rotate-45 hover:bg-orange-pop hover:text-white">
                                    <FiArrowUpRight size={15} />
                                </a>
                            </div>

                            <h3 className="font-display text-base font-extrabold uppercase leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-orange-pop">
                                {name}
                            </h3>

                            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink/50">
                                <span className="font-bold text-ink/70">{org.join(" · ")}</span>
                                <span className="h-1 w-1 rounded-full bg-orange-pop"></span>
                                <span>{date}</span>
                            </div>

                            <div className="mt-auto flex flex-wrap gap-2 pt-4">
                                {techs.slice(0, 4).map((tech) => (
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

export default Certification;

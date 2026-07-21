import React, { useState } from "react";

import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

import SectionHeader from "../SharedComponents/SectionHeader";

function Contact() {

    const [messageSent, setMessageSent] = useState(false);
    const [message, setMessage] = useState({
        name: "",
        email: "",
        text: ""
    });

    const rows = [
        { icon: <FiMail size={15} />, label: "Email", value: "surafel@afroawi.com", href: "mailto:surafel@afroawi.com" },
        { icon: <FiPhone size={15} />, label: "Phone", value: "+2519 86 214 242", href: "tel:+251986214242" },
        { icon: <FiMapPin size={15} />, label: "Address", value: "Addis Ababa, Ethiopia", href: null },
    ];

    return (
        <section id="contact" className="w-full">
            <SectionHeader title="Let's Chat" />

            <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] bg-ink shadow-bento lg:grid-cols-5">

                {/* ---- Info panel ---- */}
                <div className="flex flex-col gap-6 border-b border-white/10 p-8 md:p-12 lg:col-span-2 lg:border-b-0 lg:border-r">
                    <h3 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-cream md:text-4xl">
                        Have a project <span className="text-lime-pop">in mind?</span>
                    </h3>
                    <p className="text-sm leading-relaxed text-cream/60 md:text-base">
                        I'm always open to discussing new products, creative ideas or
                        opportunities to be part of your vision.
                    </p>

                    <div className="mt-2 flex flex-col gap-3">
                        {rows.map((row) => (
                            <div key={row.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5">
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime-pop text-ink">
                                    {row.icon}
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-[9px] font-display font-bold uppercase tracking-[0.2em] text-cream/45">
                                        {row.label}
                                    </span>
                                    {row.href ? (
                                        <a href={row.href} className="block truncate text-sm font-medium text-cream transition-colors hover:text-lime-pop">
                                            {row.value}
                                        </a>
                                    ) : (
                                        <span className="block truncate text-sm font-medium text-cream">{row.value}</span>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---- Form panel ---- */}
                <div className="flex flex-col gap-4 p-8 md:p-12 lg:col-span-3">
                    <input
                        type="text"
                        value={message.name}
                        placeholder="Full name"
                        onChange={(e) => setMessage({ ...message, name: e.target.value })}
                        className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-cream outline-none transition-colors placeholder:text-cream/35 focus:border-lime-pop"
                    />
                    <input
                        type="email"
                        value={message.email}
                        placeholder="Email"
                        onChange={(e) => setMessage({ ...message, email: e.target.value })}
                        className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-cream outline-none transition-colors placeholder:text-cream/35 focus:border-lime-pop"
                    />
                    <textarea
                        value={message.text}
                        cols="30"
                        rows="5"
                        placeholder="Tell me about your project..."
                        onChange={(e) => setMessage({ ...message, text: e.target.value })}
                        className="resize-none rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-cream outline-none transition-colors placeholder:text-cream/35 focus:border-lime-pop"
                    />

                    <div className="mt-2 flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => {
                                setMessageSent(true);
                                setMessage({ name: "", email: "", text: "" });
                            }}
                            className="group flex items-center gap-3 rounded-full bg-lime-pop py-3 pl-7 pr-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-orange-pop hover:text-white">
                            Send message
                            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-lime-pop transition-transform duration-300 group-hover:rotate-45">
                                <FiSend size={13} />
                            </span>
                        </button>
                        {messageSent && (
                            <span className="text-sm font-medium text-lime-pop">
                                Thank you for your message! I'll get back to you soon.
                            </span>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Contact;

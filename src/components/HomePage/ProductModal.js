import { useEffect } from "react";

import { FiX, FiArrowUpRight, FiGithub, FiCheck } from "react-icons/fi";

function ProductModal({ product, onClose }) {

    useEffect(() => {
        if (!product) return; // only lock scroll while the modal is open
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [product, onClose]);

    if (!product) return null;

    const lime = product.theme === "lime";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* backdrop */}
            <button aria-label="Close details" onClick={onClose}
                className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm"></button>

            {/* panel */}
            <div className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-ink/10 bg-cream shadow-bento">

                {/* ---- Header band ---- */}
                <div className={`relative overflow-hidden p-8 md:p-10 ${lime ? "bg-lime-pop text-ink" : "bg-ink text-cream"}`}>
                    <span className={`rounded-full px-3.5 py-1.5 text-[10px] font-display font-bold uppercase tracking-[0.2em] ${lime ? "border border-ink/20 bg-white/60 text-ink" : "border border-white/15 bg-violet-pop text-white"}`}>
                        {product.badge}
                    </span>
                    <h3 className="mt-6 font-display text-5xl font-black uppercase leading-none tracking-tight md:text-6xl">
                        {product.name}
                    </h3>
                    <p className={`mt-2 font-display text-sm font-bold uppercase tracking-[0.18em] md:text-base ${lime ? "text-ink/60" : "text-cream/50"}`}>
                        {product.tagline}
                    </p>

                    <button onClick={onClose} aria-label="Close"
                        className={`absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 hover:rotate-90 ${lime ? "bg-ink text-lime-pop" : "bg-lime-pop text-ink"}`}>
                        <FiX size={17} />
                    </button>
                </div>

                <div className="flex flex-col gap-8 p-6 md:p-10">

                    {/* ---- Gallery ---- */}
                    <div className={`grid gap-4 ${product.gallery.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                        {product.gallery.map((img) => (
                            <figure key={img.src} className={product.gallery.length > 2 ? "first:sm:col-span-2" : ""}>
                                <img src={img.src} alt={img.caption || product.name}
                                    className="w-full rounded-[1.25rem] border border-ink/10 object-cover object-top shadow-bento" />
                                {img.caption && (
                                    <figcaption className="mt-2 text-center font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                                        {img.caption}
                                    </figcaption>
                                )}
                            </figure>
                        ))}
                    </div>

                    {/* ---- Long description ---- */}
                    <div className="flex flex-col gap-4">
                        {product.longDesc.map((para, i) => (
                            <p key={i} className="text-base leading-relaxed text-ink-soft md:text-lg">{para}</p>
                        ))}
                    </div>

                    {/* ---- Install command ---- */}
                    {product.code && (
                        <pre className="overflow-x-auto rounded-2xl bg-ink px-5 py-4 font-mono text-sm leading-relaxed text-lime-pop">
                            {product.code}
                        </pre>
                    )}

                    {/* ---- Feature checklist ---- */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {product.features.map((f) => (
                            <div key={f} className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3.5">
                                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime-pop text-ink">
                                    <FiCheck size={13} />
                                </span>
                                <span className="text-sm leading-snug text-ink-soft">{f}</span>
                            </div>
                        ))}
                    </div>

                    {/* ---- Stats ---- */}
                    <div className="flex flex-col rounded-2xl border border-ink/10 bg-white px-5 py-2">
                        {product.stats.map(([k, v]) => (
                            <div key={k} className="flex items-center justify-between border-b border-ink/10 py-3 text-sm last:border-b-0">
                                <span className="text-ink/45">{k}</span>
                                <span className="font-display font-bold text-ink">{v}</span>
                            </div>
                        ))}
                    </div>

                    {/* ---- CTAs ---- */}
                    <div className="flex flex-wrap items-center gap-3">
                        <a href={product.url} target="_blank" rel="noreferrer"
                            className="group/btn flex items-center gap-2 rounded-full bg-ink py-3 pl-6 pr-3 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-orange-pop">
                            Visit {product.name}
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-lime-pop text-ink transition-transform duration-300 group-hover/btn:rotate-45">
                                <FiArrowUpRight size={13} />
                            </span>
                        </a>
                        {product.github && (
                            <a href={product.github} target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-3 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-orange-pop hover:text-orange-pop">
                                <FiGithub size={14} /> Open source
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;

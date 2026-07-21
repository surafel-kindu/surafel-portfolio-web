import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const menus = [
    { id: 1, name: 'About', url: 'about' },
    { id: 2, name: 'Products', url: 'products' },
    { id: 3, name: 'Work', url: 'work' },
    { id: 4, name: 'Projects', url: 'projects' },
    { id: 5, name: 'Certificates', url: 'certificates' },
    { id: 6, name: 'Blog', url: '/blog', route: true },
    { id: 7, name: 'Contact', url: 'contact' }
];

function AppBar() {
    const [openSide, setOpenSide] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const goTo = (menu) => {
        setOpenSide(false);
        if (menu.route) {
            navigate(menu.url);
            return;
        }
        if (location.pathname !== '/') {
            // Not on the landing page — go home first, then scroll to the section.
            navigate('/', { state: { scrollTo: menu.url } });
            return;
        }
        const reftp = document.getElementById(menu.url);
        if (reftp) reftp.scrollIntoView({ behavior: 'smooth' });
    };

    const goHome = () => {
        setOpenSide(false);
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            const reftp = document.getElementById('about');
            if (reftp) reftp.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-4 left-1/2 z-50 w-[min(1120px,94vw)] -translate-x-1/2">
            <nav className="flex items-center justify-between gap-3 rounded-full border border-ink/10 bg-white/85 py-2.5 pl-3 pr-2.5 shadow-chip backdrop-blur-xl">

                <button onClick={goHome} className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink font-display text-base font-black text-lime-pop">
                        S.
                    </span>
                    <span className="hidden sm:block font-display text-sm font-extrabold uppercase tracking-widest text-ink">
                        Surafel Kindu
                    </span>
                </button>

                <ul className="hidden lg:flex items-center gap-6">
                    {menus.map((menu) => (
                        <li key={menu.id}>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    goTo(menu);
                                }}
                                className="group flex flex-col items-center gap-1 text-[11px] font-display font-bold uppercase tracking-[0.18em] text-ink/55 transition-colors duration-200 hover:text-orange-pop">
                                {menu.name}
                                <span className="h-0.5 w-0 rounded-full bg-orange-pop transition-all duration-200 group-hover:w-full"></span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => goTo({ url: 'contact' })}
                        className="group hidden sm:flex items-center gap-2 rounded-full bg-ink py-2 pl-5 pr-2 text-[11px] font-display font-bold uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-orange-pop">
                        Let's talk
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-lime-pop text-ink transition-transform duration-300 group-hover:rotate-45">
                            <FiArrowUpRight size={13} />
                        </span>
                    </button>

                    <button
                        onClick={() => setOpenSide(!openSide)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-cream text-ink lg:hidden">
                        {openSide ? <FiX size={16} /> : <FiMenu size={16} />}
                    </button>
                </div>
            </nav>

            {openSide && (
                <div className="mt-2 flex flex-col gap-1 rounded-3xl border border-ink/10 bg-white p-3 shadow-bento lg:hidden">
                    {menus.map((menu) => (
                        <button
                            key={menu.id}
                            onClick={(e) => {
                                e.preventDefault();
                                goTo(menu);
                            }}
                            className="flex items-center justify-between rounded-2xl px-4 py-3 text-left font-display text-xs font-bold uppercase tracking-[0.18em] text-ink/70 transition-colors hover:bg-cream hover:text-orange-pop">
                            {menu.name}
                            <FiArrowUpRight className="text-orange-pop" />
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
}

export default AppBar;

import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, HomePage, Featured, Work, Contact, Experience, Certification, BlogTeaser, ResumeButton } from './components';

import { FaGithub, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { UserContext } from './contexts/UserContext';

function LandingPage() {

  const { myData } = useContext(UserContext);
  const location = useLocation();

  // Handle "scroll to section" requests coming from other routes (e.g. /blog).
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      const timer = setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState({}, document.title);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const socials = [
    { icon: <FaGithub size={17} />, url: myData?.github, label: "GitHub" },
    { icon: <FaLinkedinIn size={17} />, url: myData?.linkedin, label: "LinkedIn" },
    { icon: <FaTwitter size={17} />, url: myData?.twitter, label: "Twitter" },
    { icon: <FaInstagram size={17} />, url: myData?.instagram, label: "Instagram" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream font-body text-ink">

      <AppBar />
      <ResumeButton />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-16 md:gap-36 md:px-8">
        <HomePage />
        <Featured />
        <Work />
        <Experience />
        <Certification />
        <BlogTeaser />
        <Contact />
      </main>

      {/* ---- Footer ---- */}
      <footer className="border-t border-ink/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink font-display text-sm font-black text-lime-pop">S.</span>
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60">
              Surafel Kindu © 2026
            </span>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a key={s.label} href={`${s.url}`} target="_blank" rel="noreferrer" aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white text-ink/60 transition-all duration-200 hover:-translate-y-1 hover:bg-ink hover:text-lime-pop">
                {s.icon}
              </a>
            ))}
          </div>

          <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-ink/40">
            Made with ❤ in Addis Ababa
          </span>
        </div>
      </footer>

      {/* ---- Left social rail (desktop) ---- */}
      <div className="fixed bottom-0 left-6 z-40 hidden min-h-screen flex-col items-center justify-center gap-4 xl:flex">
        <div className="w-px flex-grow bg-gradient-to-t from-transparent to-ink/15"></div>
        {socials.map((s) => (
          <a key={s.label} href={`${s.url}`} target="_blank" rel="noreferrer" aria-label={s.label}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-ink/60 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-ink hover:text-lime-pop">
            {s.icon}
          </a>
        ))}
        <div className="w-px flex-grow bg-gradient-to-b from-transparent to-ink/15"></div>
      </div>

      {/* ---- Right year rail (desktop) ---- */}
      <div className="fixed bottom-0 right-6 z-40 hidden min-h-screen flex-col items-center justify-center gap-4 xl:flex">
        <div className="w-px flex-grow bg-gradient-to-t from-transparent to-ink/15"></div>
        <span className="rotate-90 font-display text-xs font-bold uppercase tracking-[0.4em] text-ink/40">
          2026
        </span>
        <div className="w-px flex-grow bg-gradient-to-b from-transparent to-ink/15"></div>
      </div>

    </div>
  );
}

export default LandingPage;

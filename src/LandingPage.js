import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiCheck, FiGithub, FiLinkedin, FiX, FiPlus, FiMinus, FiPause, FiPlay } from 'react-icons/fi';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase/firebaseConfig';
import { UserContext } from './contexts/UserContext';
import { fallbackSkills, fallbackWorks, mergeWorks, currentRoles } from './data/fallback';
import { products } from './data/products';
import { AppBar } from './components';
import otherworks from './json/otherworks.json';
import certifications from './json/certifications.json';
import postsData from './json/posts.json';
import profile from './asset/profile.JPG';
import TerminalShowcase from './components/Studio/TerminalShowcase';
import ProductCard from './components/Studio/ProductCard';
import { useReducedMotion, useScrollReveal } from './components/Studio/useStudioMotion';
import './studio.css';
import './studio-motion.css';
import './studio-arcade.css';
const modes = [{
  name: 'Design',
  title: 'Start with the human.',
  copy: 'A clear idea. A thoughtful interface. A little curiosity.',
  label: '01 / THE IDEA'
}, {
  name: 'Build',
  title: 'Make the pieces click.',
  copy: 'Interfaces, APIs, and systems that work together.',
  label: '02 / THE SYSTEM'
}, {
  name: 'Ship',
  title: 'Put it into the world.',
  copy: 'Real products, in real hands. Then make them better.',
  label: '03 / THE IMPACT'
}];

function Workbench({ motionPaused, onToggleMotion }) {
  const [mode, setMode] = useState(1);
  return <div className="workbench">
    <div className="workbench-label"><span className="status-dot" /> THE BUILDER’S WORKBENCH <span>FIG. 01</span><button className="motion-toggle" onClick={onToggleMotion} aria-pressed={motionPaused} aria-label={motionPaused ? "Resume page animations" : "Pause page animations"}>{motionPaused ? <FiPlay /> : <FiPause />}</button></div>
    <svg className={`workbench-svg mode-${mode}`} viewBox="0 0 640 480" role="img" aria-labelledby="workbench-title">
      <title id="workbench-title">An isometric workbench connecting design, engineering, and products</title>
      <defs><pattern id="iso-grid" width="88" height="50.8" patternUnits="userSpaceOnUse"><path d="M0 0L88 50.8M88 0L0 50.8" stroke="#dadbd6" strokeWidth=".65" /></pattern>
        <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 5L5 0" stroke="#d5d6d0" strokeWidth=".7" /></pattern>
      </defs>
      <path d="M10 270L330 84L632 260L314 446Z" fill="url(#iso-grid)" />
      <g fill="none" stroke="#b8bab2" strokeWidth="1" strokeDasharray="4 5" className="bench-connectors"><path d="M155 245L323 341L491 245M323 341V407M323 146V341" /></g>
      <g className="bench-module module-design" transform="translate(65 158)"><g className="bench-float">
        <path d="M0 61L104 0L208 61L104 122Z" fill="#fbfcf9" /><path d="M0 61V98L104 159V122Z" fill="#eeefea" /><path d="M104 122V159L208 98V61Z" fill="#f8f9f6" />
        <path d="M0 61L104 0L208 61V98L104 159L0 98ZM0 61L104 122L208 61M104 122V159" fill="none" stroke="#383c35" strokeWidth="1.25" />
        <g transform="translate(60 40) skewY(30) scale(1 .85)" fill="none" stroke="#63695e"><rect width="74" height="47" rx="3" /><path d="M0 10H74M10 18H33V38H10ZM41 19H65M41 26H65M41 33H57" /><circle cx="5" cy="5" r="1" /></g>
        <text x="16" y="82" transform="skewY(30)" className="svg-label">INTERFACE / 01</text><circle cx="184" cy="69" r="3" fill={mode === 0 ? '#e7683e' : '#a7b784'} /><g fill="#30372d"><circle cx="4" cy="61" r="1.8" /><circle cx="104" cy="4" r="1.8" /><circle cx="203" cy="61" r="1.8" /></g></g>
      </g>
      <g className="bench-module module-build" transform="translate(216 54)"><g className="bench-float">
        <path d="M0 61L104 0L208 61L104 122Z" fill="#fbfcf9" /><path d="M0 61V98L104 159V122Z" fill="#eeefea" /><path d="M104 122V159L208 98V61Z" fill="#f8f9f6" />
        <path d="M0 61L104 0L208 61V98L104 159L0 98ZM0 61L104 122L208 61M104 122V159" fill="none" stroke="#383c35" strokeWidth="1.25" />
        <g transform="translate(69 33) skewY(30)" fill="none" stroke="#393f35" strokeWidth="2"><path d="M12 8L0 18L12 28M44 8L56 18L44 28M34 0L23 34" /></g>
        <text x="16" y="82" transform="skewY(30)" className="svg-label">ENGINEERING / 02</text><circle cx="184" cy="69" r="3" fill={mode === 1 ? '#e7683e' : '#a7b784'} /><g fill="#30372d"><circle cx="4" cy="61" r="1.8" /><circle cx="104" cy="4" r="1.8" /><circle cx="203" cy="61" r="1.8" /></g></g>
      </g>
      <g className="bench-module module-ship" transform="translate(367 158)"><g className="bench-float">
        <path d="M0 61L104 0L208 61L104 122Z" fill="#fbfcf9" /><path d="M0 61V98L104 159V122Z" fill="#eeefea" /><path d="M104 122V159L208 98V61Z" fill="#f8f9f6" />
        <path d="M0 61L104 0L208 61V98L104 159L0 98ZM0 61L104 122L208 61M104 122V159" fill="none" stroke="#383c35" strokeWidth="1.25" />
        <g transform="translate(74 32) skewY(30)" fill="none" stroke="#63695e"><path d="M0 20L26 5L52 20L26 35ZM0 20V43L26 58L52 43V20M26 35V58M13 12L39 28" /><path d="M26 5V19" /></g>
        <text x="16" y="82" transform="skewY(30)" className="svg-label">PRODUCT / 03</text><circle cx="184" cy="69" r="3" fill={mode === 2 ? '#e7683e' : '#a7b784'} /><g fill="#30372d"><circle cx="4" cy="61" r="1.8" /><circle cx="104" cy="4" r="1.8" /><circle cx="203" cy="61" r="1.8" /></g></g>
      </g>
      <g className="bench-core" transform="translate(216 269)">
        <path d="M0 61L104 0L208 61L104 122Z" fill="#fbfcf9" /><path d="M0 61V91L104 152V122Z" fill="url(#hatch)" /><path d="M104 122V152L208 91V61Z" fill="#f2f3ed" />
        <path d="M0 61L104 0L208 61V91L104 152L0 91ZM0 61L104 122L208 61M104 122V152" fill="none" stroke="#383c35" strokeWidth="1.25" />
        <ellipse className="bench-orbit" cx="104" cy="61" rx="44" ry="25" fill="none" stroke="#d4d7cd" strokeDasharray="2 4" />
        <ellipse className="bench-heart" cx="104" cy="61" rx="14" ry="8" fill="#e7683e" /><text x="16" y="78" transform="skewY(30)" className="svg-label">HUMAN AT THE CENTER</text>
        <g fill="#e7683e"><ellipse cx="169" cy="106" rx="2" ry="3" /><ellipse cx="178" cy="101" rx="2" ry="3" /><ellipse cx="187" cy="96" rx="2" ry="3" /></g>
      </g>
    </svg>
    <div className="workbench-bottom"><div role="group" aria-label="Explore my process" className="workbench-tabs">{modes.map((item, i) => <button key={item.name} aria-pressed={mode === i} onClick={() => setMode(i)}>{item.name}<span>0{i + 1}</span></button>)}</div><span className="bench-hint">AN IDEA → SOMETHING REAL</span></div>
    <div className="bench-description" key={mode} aria-live="polite"><strong>{modes[mode].title}</strong><span>{modes[mode].copy}</span></div><a href="#playground" className="bench-live-link">Watch code become a product<FiArrowRight /></a>
  </div>;
}

function ProductDialog({
  product,
  onClose
}) {
  const panel = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector('button')?.focus();

    const onKey = event => {
      if (event.key === 'Escape') onClose();

      if (event.key === 'Tab') {
        const focusable = panel.current.querySelectorAll('a[href],button');
        const first = focusable[0],
              last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [onClose]);
  return <div className="dialog-backdrop" onClick={onClose}><div ref={panel} className={`studio-dialog studio-dialog-${product.id}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={e => e.stopPropagation()}>
    <button className="dialog-close" onClick={onClose} aria-label="Close product details"><FiX /></button>
    <span className="eyebrow">{product.badge}</span><h2 id="dialog-title">{product.name}</h2><p className="dialog-tagline">{product.tagline}</p>
    {product.id === 'arcade' && <>
      <div className="arcade-dialog-actions"><a className="studio-button" href={product.url} target="_blank" rel="noreferrer">Visit the lab<FiArrowUpRight /></a><a className="text-link" href={product.github} target="_blank" rel="noreferrer"><FiGithub /> View source</a></div>
      <dl className="arcade-facts">{product.stats.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </>}
    <div className={`dialog-gallery ${product.id === 'arcade' ? 'arcade-dialog-gallery' : ''}`}>{product.gallery.map(img => product.id === 'arcade' ? <figure key={img.src}><a href={img.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${img.caption}`}><img src={img.src} alt={img.caption} loading="lazy" /></a><figcaption>{img.caption}</figcaption></figure> : <img key={img.src} src={img.src} alt={img.caption} loading="lazy" />)}</div>
    {product.longDesc.map(text => <p key={text}>{text}</p>)}
    <ul className="product-features">{product.features.map(item => <li key={item}><FiCheck />{item}</li>)}</ul>
    {product.code && <pre>{product.code}</pre>}
    <div className="button-row"><a className="studio-button" href={product.url} target="_blank" rel="noreferrer">Visit {product.name}<FiArrowUpRight /></a>{product.github && <a className="text-link" href={product.github} target="_blank" rel="noreferrer"><FiGithub /> View source</a>}</div>
  </div></div>;
}

const SectionHeading = ({
  number,
  label,
  title,
  children
}) => <div className="section-heading" data-reveal><div><p className="eyebrow"><span>{number}</span> / {label}</p><h2>{title}</h2></div>{children}</div>;

export default function LandingPage() {
  const {
    myData
  } = useContext(UserContext);
  const location = useLocation();
  const siteRef = useRef(null);
  const reduced = useReducedMotion();
  const [motionPaused, setMotionPaused] = useState(false);
  const toggleMotion = () => setMotionPaused(value => !value);
  useScrollReveal(siteRef, reduced);
  const [works, setWorks] = useState(fallbackWorks);
  const [skills, setSkills] = useState(fallbackSkills);
  const [active, setActive] = useState(null);
  const closeProduct = useCallback(() => setActive(null), []);
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const copyTimer = useRef(null);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useEffect(() => {
    const unsubWork = onSnapshot(collection(db, 'projects'), snapshot => {
      const remote = snapshot.docs.map(doc => ({ ...doc.data(),
        id: doc.id
      }));
      if (remote.length) setWorks(mergeWorks(remote.map(work => ({ ...fallbackWorks.find(local => local.name.toLowerCase() === (work.name || '').toLowerCase()),
        ...work
      }))));
    }, () => {});
    const unsubSkills = onSnapshot(collection(db, 'skills'), snapshot => {
      const remote = snapshot.docs.map(doc => ({ ...doc.data(),
        id: doc.id
      }));
      if (remote.length) setSkills(remote);
    }, () => {});
    return () => {
      unsubWork();
      unsubSkills();
    };
  }, []);
  useEffect(() => {
    if (location.state?.scrollTo) {
      document.getElementById(location.state.scrollTo)?.scrollIntoView({
        behavior: 'smooth'
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  const pastWorks = works.filter(work => !currentRoles.some(role => role.id === work.id));
  const filtered = pastWorks.filter(work => filter === 'All' || (filter === 'Mobile' ? /mobile|flutter|react.native/i.test(`${work.title} ${work.desc} ${work.details} ${work.techs?.join(' ')}`) : /web|front.end|fullstack|full.stack/i.test(`${work.title} ${work.desc} ${work.details} ${work.techs?.join(' ')}`)));
  const shown = expanded ? filtered : filtered.slice(0, 4);
  const latest = postsData.posts[0];
  const email = 'surafel@afroawi.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyFailed(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopyFailed(true);
    }
  };

  return <div ref={siteRef} className={`studio-site motion-ready ${motionPaused ? "motion-paused" : ""}`}>
    <a className="skip-link" href="#main">Skip to content</a><AppBar />
    <main id="main">
      <section className="studio-hero page-width" id="home">
        <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot" /> ADDIS ABABA, ETHIOPIA <span className="hero-edition">PORTFOLIO — 2026</span></p>
          <h1>Good ideas.<br />Real <span className="impact-word">impact<svg viewBox="0 0 360 24" aria-hidden="true"><path d="M4 15Q161 -3 350 10M19 21Q181 7 338 16" /></svg></span><span className="orange-period">.</span></h1>
          <p className="hero-intro">I’m Surafel. A software engineer, product designer, and co-founder turning complex problems into things people love to use.</p>
          <div className="button-row"><a className="studio-button" href="#work">Explore my work<FiArrowDownRight /></a><a className="text-link" href="/assets/resume/myresume.pdf" target="_blank" rel="noreferrer">The résumé<FiArrowUpRight /></a></div>
          <div className="hero-footnote"><span className="mini-avatar"><img src={profile} alt="" /></span><span>Building at <a href="https://afroawi.com/" target="_blank" rel="noreferrer">Afroawi</a> & <a href="https://testsavant.ai/" target="_blank" rel="noreferrer">TestSavant.AI</a><small>A little design. A lot of engineering.</small></span></div>
        </div><Workbench motionPaused={motionPaused} onToggleMotion={toggleMotion} />
      </section>
      <div className="credibility page-width"><p>THOUGHTFUL DESIGN.<br /><span>PROVEN IN THE REAL WORLD.</span></p><div><strong>8+</strong><span>years building</span></div><div><strong>80k+</strong><span>people reached</span></div><div className="credibility-note">From better payments<br />to smarter farming.<span>ALWAYS PEOPLE FIRST. <FiArrowUpRight /></span></div></div>
      <section className="selected-section page-width" id="work">
        <SectionHeading number="01" label="SELECTED WORK" title={<>Small details.<br />Big possibilities.</>}><p>From the first sketch to the last commit.<br />A few things I’ve helped bring to life.</p></SectionHeading>
        <div id="products" className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} onSelect={setActive} />)}</div>
        <div className="work-index-header"><span className="eyebrow">MORE IN THE FIELD</span><div className="filter-tabs" role="group" aria-label="Filter work">{['All', 'Web', 'Mobile'].map(item => <button key={item} aria-pressed={filter === item} onClick={() => {
              setFilter(item);
              setExpanded(false);
            }}>{item}</button>)}</div></div>
        <div className="work-index">{shown.map((work, i) => <Link key={work.id} to={`/work/${work.id}`} state={{
            work
          }} className="work-row"><span className="work-number">{String(i + products.length + 1).padStart(2, "0")}</span><div><h3>{work.shortName || work.name}</h3><p>{work.title}</p></div><span className="work-tech">{work.techs?.slice(0, 2).join(' / ')}</span><span className="work-year">{work.from?.match(/\d{4}/)?.[0]}</span><FiArrowUpRight /></Link>)}</div>
        {filtered.length > 4 && <button className="expand-work text-link" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : 'Explore all work'}{expanded ? <FiMinus /> : <FiPlus />}</button>}
      </section>
      <section className="about-section" id="about"><div className="page-width about-grid" data-reveal><div className="portrait-wrap"><img src={profile} alt="Surafel Kindu" loading="lazy" /><span className="portrait-label">THE HUMAN BEHIND THE CODE.</span><span className="portrait-star" aria-hidden="true">✳</span></div><div className="about-copy"><p className="eyebrow">02 / A LITTLE ABOUT ME</p><h2>Curious mind.<br />Builder at heart.</h2><p>I work where design meets engineering. For me, the best products make something complicated feel simple — and make someone’s day a little better.</p><p>Based in Addis Ababa, I build web and mobile experiences, co-found products at Afroawi, and work on AI assurance at TestSavant.</p><div className="current-roles">{currentRoles.map(role => <a key={role.id} href={role.link} target="_blank" rel="noreferrer"><div><span>{role.title}</span><strong>{role.name}</strong></div><span>{role.from} — NOW</span><FiArrowUpRight /></a>)}</div><a className="text-link" href="/assets/resume/myresume.pdf" target="_blank" rel="noreferrer">A closer look at my journey<FiArrowUpRight /></a></div></div><div className="page-width toolbox"><span className="eyebrow">TOOLS I THINK WITH</span><div>{skills.map(skill => <span key={skill.id}>{skill.title}</span>)}</div></div></section>
      <section className="lab-section" id="projects"><div className="page-width"><SectionHeading number="03" label="THE EXPERIMENT CORNER" title={<>Stay curious.<br />Keep making.</>}><a className="text-link" href={myData.github} target="_blank" rel="noreferrer">Find me on GitHub<FiGithub /></a></SectionHeading><div className="lab-grid" data-reveal>{otherworks.otherworks.map((project, i) => <article key={project.id}><span className="lab-number">EXPERIMENT / 0{i + 1}{project.role && <span className="lab-role">{project.role}</span>}</span><h3>{project.title}</h3><p>{project.id === 1 ? 'A web interface for detecting hate speech in Amharic Twitter posts.' : project.id === 3 ? 'An app for discovering, posting, and registering for events. Currently in progress.' : project.description}</p><div className="lab-bottom"><span>{project.techs.slice(0, 2).join(' + ')}</span><a href={project.link} target={project.link.startsWith('/') ? '_self' : '_blank'} rel="noreferrer" aria-label={`Explore ${project.title}`}><FiArrowUpRight /></a>{project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}><FiGithub /></a>}</div></article>)}</div></div></section>
      <TerminalShowcase reduced={reduced} motionPaused={motionPaused} onToggleMotion={toggleMotion} />
      <section className="learning-section page-width" id="certificates"><SectionHeading number="05" label="ALWAYS LEARNING" title="A work in progress." /><div className="certificate-grid" data-reveal>{certifications.certificates.map(cert => <a key={cert.id} href={cert.link} target="_blank" rel="noreferrer"><span>{cert.org.join(' / ')}</span><h3>{cert.name}</h3><div>{cert.date}<FiArrowUpRight /></div></a>)}</div></section>
      {latest && <section className="journal-section page-width" id="blog"><div className="journal-intro" data-reveal><p className="eyebrow">06 / FIELD NOTES</p><h2>Thinking<br />out loud.</h2><Link className="text-link" to="/blog">Visit the journal<FiArrowRight /></Link></div><Link to={`/blog/${latest.slug}`} className="journal-feature" data-reveal><div className="journal-image"><img src={latest.cover} alt={latest.title} loading="lazy" /><span>LATEST ENTRY <FiArrowUpRight /></span></div><p className="eyebrow">{latest.date} <span>·</span> {latest.readTime}</p><h3>{latest.title}</h3><p>{latest.excerpt}</p></Link></section>}
      <section className="contact-section" id="contact"><div className="page-width" data-reveal><p className="eyebrow"><span className="status-dot" /> OPEN TO GOOD CONVERSATIONS</p><h2>Let’s make<br />something <span>matter.</span><a href={`mailto:${email}`} aria-label="Email Surafel"><FiArrowUpRight /></a></h2><div className="contact-bottom"><p>Have a big idea, a tricky problem,<br />or just a good hello? I’m all ears.<a className="contact-phone" href="tel:+251986214242">+2519 86 214 242</a></p><div><a className="email-link" href={`mailto:${email}`}>{email}</a><button className="copy-email" onClick={copyEmail}>{copied ? <><FiCheck /> Copied</> : 'Copy email'}</button><span className="sr-only" role="status">{copied ? 'Email copied to clipboard' : copyFailed ? `Copy unavailable. Email me at ${email}.` : ''}</span></div></div></div></section>
    </main>
    <footer className="studio-footer page-width"><Link className="studio-brand" to="/">sk<span className="footer-name">surafel kindu</span></Link><span>MADE WITH INTENTION IN ADDIS ABABA.</span><div><a href={myData.github} target="_blank" rel="noreferrer">GitHub<FiGithub /></a><a href={myData.linkedin} target="_blank" rel="noreferrer">LinkedIn<FiLinkedin /></a><a href={myData.twitter} target="_blank" rel="noreferrer">Twitter<FiArrowUpRight /></a></div><span>© {new Date().getFullYear()}</span></footer>
    {active && <ProductDialog product={active} onClose={closeProduct} />}
  </div>;
}

function FiArrowDownRight() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 5L19 19M5 19H19V5" /></svg>;
}

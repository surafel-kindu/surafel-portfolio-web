import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiCheck, FiGithub, FiLinkedin, FiX, FiPlus, FiMinus } from 'react-icons/fi';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase/firebaseConfig';
import { UserContext } from './contexts/UserContext';
import { fallbackWorks, mergeWorks, currentRoles } from './data/fallback';
import { products } from './data/products';
import { AppBar } from './components';
import otherworks from './json/otherworks.json';
import certifications from './json/certifications.json';
import postsData from './json/posts.json';
import profile from './asset/profile.JPG';
import TerminalShowcase from './components/Studio/TerminalShowcase';
import ProductCard from './components/Studio/ProductCard';
import Workbench from './components/Studio/Workbench';
import FrameworkStack from './components/Studio/FrameworkStack';
import { SHOW_FIELD_NOTES } from './data/siteFeatures';
import PitchDeckViewer from './components/Studio/PitchDeckViewer';
import { useReducedMotion, useScrollReveal } from './components/Studio/useStudioMotion';
import './studio.css';
import './studio-motion.css';
import './studio-arcade.css';
import './studio-asili.css';
import './studio-profile.css';
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
  return <div className={`dialog-backdrop ${product.pitchDeck ? 'deck-backdrop' : ''}`} onClick={onClose}><div ref={panel} className={`studio-dialog studio-dialog-${product.id}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={e => e.stopPropagation()}>
    <button className="dialog-close" onClick={onClose} aria-label="Close product details"><FiX /></button>
    <span className="eyebrow">{product.badge}</span>
    {product.id === 'asili' && <img className="asili-dialog-logo" src={product.logo} alt="Asili — A pocket agronomist for every farmer" width="597" height="221" />}
    <h2 id="dialog-title" className={product.id === 'asili' ? 'sr-only' : ''}>{product.name}</h2><p className="dialog-tagline">{product.tagline}</p>
    {product.pitchDeck && <PitchDeckViewer deck={product.pitchDeck} />}
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
    return () => {
      unsubWork();
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
  const currentRole = currentRoles.find(role => role.primary);
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
          <h1>Engineering AI.<br /><span className="impact-word">Building trust<svg viewBox="0 0 360 24" aria-hidden="true"><path d="M4 15Q161 -3 350 10M19 21Q181 7 338 16" /></svg></span><span className="orange-period">.</span></h1>
          <p className="hero-intro">I’m Surafel, an AI specialist and full-stack engineer at <a className="inline-employer" href={currentRole.link} target="_blank" rel="noreferrer">{currentRole.name}</a>. I build AI systems, test models and agents, and create custom n8n nodes and agentic integrations.</p>
          <div className="button-row"><a className="studio-button" href="#work">Explore my work<FiArrowDownRight /></a><a className="text-link" href="/assets/resume/myresume.pdf" target="_blank" rel="noreferrer">The résumé<FiArrowUpRight /></a></div>
          <a className="hero-footnote current-employer" href={currentRole.link} target="_blank" rel="noreferrer"><span className="current-employer-copy"><span className="current-employer-label"><span className="status-dot" /> CURRENTLY WORKING AT</span><img className="current-employer-logo" src={currentRole.logo} alt={currentRole.name} width="2286" height="450" /><small>{currentRole.title} · {currentRole.from} — Present</small></span><FiArrowUpRight className="current-employer-arrow" /></a>
        </div><Workbench motionPaused={motionPaused} onToggleMotion={toggleMotion} />
      </section>
      <div className="credibility page-width"><p>THOUGHTFUL DESIGN.<br /><span>PROVEN IN THE REAL WORLD.</span></p><div><strong>8+</strong><span>years building</span></div><div><strong>2Million+</strong><span>people reached</span></div><div className="credibility-note">From better payments<br />to smarter farming.<span>ALWAYS PEOPLE FIRST. <FiArrowUpRight /></span></div></div>
      <section className="selected-section page-width" id="work">
        <SectionHeading number="01" label="MY COMPANY & SELECTED WORK" title={<>Built at Afroawi.<br />Made to matter.</>}><p>I own and co-founded Afroawi Technologies.<br />These are a few of the products I’m building.</p></SectionHeading>
        <a className="afroawi-studio-band" href="https://afroawi.com/" target="_blank" rel="noreferrer"><img src="/images/brands/afroawi.png" alt="Afroawi Technologies" width="491" height="130" loading="lazy" /><span>MY COMPANY · INDEPENDENT PRODUCTS</span><FiArrowUpRight /></a>
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
      <section className="about-section" id="about">
        <div className="page-width about-grid" data-reveal>
          <div className="portrait-wrap"><img src={profile} alt="Surafel Kindu" loading="lazy" /><span className="portrait-label">THE HUMAN BEHIND THE CODE.</span></div>
          <div className="about-copy"><p className="eyebrow">02 / A LITTLE ABOUT ME</p><h2>Engineer.<br />Builder. Owner.</h2>
            <p>I work across AI, full-stack engineering, and automation. I build and fine-tune models, test AI agents, and create the interfaces and systems around them.</p>
            <p>At TestSavant.AI, I work on AI security and assurance — from model evaluation and prompt-injection defenses to custom n8n nodes, community packages, and SDKs. I also build integrations across other agentic platforms, including LangChain.</p>
            <p>I own and co-founded Afroawi Technologies, where I turn ideas into independent products like Asili, Halt, and Model Arcade Lab.</p>
            <div className="current-roles">{currentRoles.map(role => <a key={role.id} className={role.primary ? "role-primary" : ""} href={role.link} target="_blank" rel="noreferrer"><div><span>{role.primary ? "Current role · " : ""}{role.title}</span><strong><img className={`role-logo role-logo-${role.id}`} src={role.logo} alt={role.name} loading="lazy" /></strong></div><span>{role.from} — NOW</span><FiArrowUpRight /></a>)}</div>
            <a className="text-link" href="/assets/resume/myresume.pdf" target="_blank" rel="noreferrer">View my updated résumé<FiArrowUpRight /></a>
          </div>
        </div>
        <FrameworkStack />
      </section>
      <section className="lab-section" id="projects"><div className="page-width"><SectionHeading number="03" label="THE EXPERIMENT CORNER" title={<>Stay curious.<br />Keep making.</>}><a className="text-link" href={myData.github} target="_blank" rel="noreferrer">Find me on GitHub<FiGithub /></a></SectionHeading><div className="lab-grid" data-reveal>{otherworks.otherworks.map((project, i) => <article key={project.id}><span className="lab-number">EXPERIMENT / 0{i + 1}{project.role && <span className="lab-role">{project.role}</span>}</span><h3>{project.title}</h3><p>{project.id === 1 ? 'A web interface for detecting hate speech in Amharic Twitter posts.' : project.id === 3 ? 'An app for discovering, posting, and registering for events. Currently in progress.' : project.description}</p><div className="lab-bottom"><span>{project.techs.slice(0, 2).join(' + ')}</span><a href={project.link} target={project.link.startsWith('/') ? '_self' : '_blank'} rel="noreferrer" aria-label={`Explore ${project.title}`}><FiArrowUpRight /></a>{project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}><FiGithub /></a>}</div></article>)}</div></div></section>
      <TerminalShowcase reduced={reduced} motionPaused={motionPaused} onToggleMotion={toggleMotion} />
      <section className="learning-section page-width" id="certificates"><SectionHeading number="05" label="ALWAYS LEARNING" title="A work in progress." /><div className="certificate-grid" data-reveal>{certifications.certificates.map(cert => <a key={cert.id} href={cert.link} target="_blank" rel="noreferrer"><span>{cert.org.join(' / ')}</span><h3>{cert.name}</h3><div>{cert.date}<FiArrowUpRight /></div></a>)}</div></section>
      {SHOW_FIELD_NOTES && latest && <section className="journal-section page-width" id="blog"><div className="journal-intro" data-reveal><p className="eyebrow">06 / FIELD NOTES</p><h2>Thinking<br />out loud.</h2><Link className="text-link" to="/blog">Visit the journal<FiArrowRight /></Link></div><Link to={`/blog/${latest.slug}`} className="journal-feature" data-reveal><div className="journal-image"><img src={latest.cover} alt={latest.title} loading="lazy" /><span>LATEST ENTRY <FiArrowUpRight /></span></div><p className="eyebrow">{latest.date} <span>·</span> {latest.readTime}</p><h3>{latest.title}</h3><p>{latest.excerpt}</p></Link></section>}
      <section className="contact-section" id="contact"><div className="page-width" data-reveal><p className="eyebrow"><span className="status-dot" /> OPEN TO GOOD CONVERSATIONS</p><h2>Let’s make<br />something <span>matter.</span><a href={`mailto:${email}`} aria-label="Email Surafel"><FiArrowUpRight /></a></h2><div className="contact-bottom"><p>Have a big idea, a tricky problem,<br />or just a good hello? I’m all ears.<a className="contact-phone" href="tel:+251986214242">+2519 86 214 242</a></p><div><a className="email-link" href={`mailto:${email}`}>{email}</a><button className="copy-email" onClick={copyEmail}>{copied ? <><FiCheck /> Copied</> : 'Copy email'}</button><span className="sr-only" role="status">{copied ? 'Email copied to clipboard' : copyFailed ? `Copy unavailable. Email me at ${email}.` : ''}</span></div></div></div></section>
    </main>
    <footer className="studio-footer page-width"><Link className="studio-brand" to="/">sk<span className="footer-name">surafel kindu</span></Link><span>MADE WITH INTENTION IN ADDIS ABABA.</span><div><a href={myData.github} target="_blank" rel="noreferrer">GitHub<FiGithub /></a><a href={myData.linkedin} target="_blank" rel="noreferrer">LinkedIn<FiLinkedin /></a><a href={myData.twitter} target="_blank" rel="noreferrer">Twitter<FiArrowUpRight /></a></div><span>© {new Date().getFullYear()}</span></footer>
    {active && <ProductDialog product={active} onClose={closeProduct} />}
  </div>;
}

function FiArrowDownRight() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 5L19 19M5 19H19V5" /></svg>;
}

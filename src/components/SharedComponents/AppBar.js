import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
const menus = [{
  name: 'Work',
  url: 'work'
}, {
  name: 'About',
  url: 'about'
}, {
  name: 'Lab',
  url: 'projects'
}, {
  name: 'Journal',
  url: '/blog',
  route: true
}];
export default function AppBar() {
  const [open, setOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;

    const close = event => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };

    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  useEffect(() => {
    if (scrollTarget && !open) {
      document.getElementById(scrollTarget)?.scrollIntoView({
        behavior: 'smooth'
      });
      setScrollTarget(null);
    }
  }, [scrollTarget, open]);

  const goTo = menu => {
    setOpen(false);
    if (menu.route) navigate(menu.url);else if (location.pathname !== '/') navigate('/', {
      state: {
        scrollTo: menu.url
      }
    });else setScrollTarget(menu.url);
  };

  return <header className="studio-header">
    <nav className="studio-nav" aria-label="Main navigation">
      <Link className="studio-brand" to="/" onClick={() => {
        setOpen(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }} aria-label="Surafel Kindu home">
        <span className="brand-mark">s<span>k</span><i /></span><span>surafel kindu<span className="brand-caption">ENGINEER & MAKER</span></span>
      </Link>
      <div className="desktop-nav">{menus.map(menu => <button key={menu.url} onClick={() => goTo(menu)}>{menu.name}</button>)}</div>
      <div className="nav-actions"><button className="studio-button small" onClick={() => goTo({
          url: 'contact'
        })}>Let’s talk <FiArrowUpRight /></button>
        <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button></div>
    </nav>
    {open && <div className="mobile-nav" id="mobile-navigation">{menus.map(menu => <button key={menu.url} onClick={() => goTo(menu)}>{menu.name}<FiArrowUpRight /></button>)}</div>}
  </header>;
}

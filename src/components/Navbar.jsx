import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const DARK   = '#0C1B2A';
const ORANGE = '#F97316';

const links = [
  { to: '/',          label: 'Accueil' },
  { to: '/a-propos',  label: 'À propos' },
  { to: '/poles',     label: 'Pôles' },
  { to: '/participer',label: 'Participer' },
  { to: '/comite',    label: 'Comité' },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible,  setVisible]  = useState(true);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);
  const { pathname } = useLocation();

  /* Ferme le menu mobile à chaque changement de route */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;

      /* Barre de progression */
      setProgress(docH > 0 ? (y / docH) * 100 : 0);

      /* Scroll-hide */
      setScrolled(y > 10);
      if (y < 80) {
        setVisible(true);
      } else {
        setVisible(y < lastY.current);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background-color 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Barre de progression scroll */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        height: 2.5,
        width: `${progress}%`,
        backgroundColor: ORANGE,
        boxShadow: `0 0 8px ${ORANGE}80`,
        transition: 'width 0.1s linear',
        borderRadius: '0 2px 2px 0',
      }} />

      <nav className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-0.5 group">
          <span className="font-extrabold text-xl tracking-tight transition-opacity group-hover:opacity-80"
            style={{ color: DARK, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Innova
          </span>
          <span className="font-extrabold text-xl tracking-tight transition-opacity group-hover:opacity-80"
            style={{ color: ORANGE, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            School
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(l => {
            const isActive = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
                  style={{ color: isActive ? ORANGE : '#57534e' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = DARK; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = isActive ? ORANGE : '#57534e'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {l.label}
                  {/* Indicateur actif */}
                  <span style={{
                    position: 'absolute', bottom: 2, left: '50%',
                    transform: `translateX(-50%) scaleX(${isActive ? 1 : 0})`,
                    width: 16, height: 2,
                    backgroundColor: ORANGE,
                    borderRadius: 2,
                    transition: 'transform 0.25s ease',
                    display: 'block',
                  }} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: pathname === '/contact' ? ORANGE : DARK, boxShadow: '0 2px 12px rgba(12,27,42,0.20)' }}
          >
            S'inscrire <ArrowRight size={13} />
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: DARK, backgroundColor: open ? 'rgba(0,0,0,0.06)' : 'transparent' }}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span style={{
            display: 'block',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </span>
        </button>
      </nav>

      {/* Mobile menu — slide animé */}
      <div style={{
        maxHeight: open ? '420px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
        backgroundColor: 'rgba(255,255,255,0.97)',
        borderTop: open ? '1px solid rgba(0,0,0,0.06)' : 'none',
      }}>
        <div className="px-4 pb-5 pt-3">
          <ul className="flex flex-col gap-1 mb-4">
            {links.map(l => {
              const isActive = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      color: isActive ? ORANGE : '#44403c',
                      backgroundColor: isActive ? `${ORANGE}10` : 'transparent',
                    }}
                  >
                    {l.label}
                    {isActive && <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, display: 'block' }} />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
            style={{ backgroundColor: DARK }}>
            S'inscrire <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </header>
  );
}

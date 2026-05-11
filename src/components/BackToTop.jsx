import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ORANGE = '#F97316';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollUp}
      aria-label="Retour en haut"
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 49,
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: 'rgba(12,27,42,0.90)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(8px)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.2s ease, box-shadow 0.2s ease',
        pointerEvents: visible ? 'auto' : 'none',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = ORANGE;
        e.currentTarget.style.boxShadow = `0 4px 20px ${ORANGE}60`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'rgba(12,27,42,0.90)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
      }}
    >
      <ArrowUp size={18} />
    </button>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Leaf, Sprout, BookOpen } from 'lucide-react';

const DARK   = '#0C1B2A';
const ORANGE = '#F97316';

const poles = [
  { icon: <Cpu size={13} strokeWidth={1.5} />,      label: 'Technologie & Innovation',  color: '#1D4ED8' },
  { icon: <Leaf size={13} strokeWidth={1.5} />,     label: 'Environnement & Durabilité', color: '#10B981' },
  { icon: <Sprout size={13} strokeWidth={1.5} />,   label: 'Agriculture & Développement',color: '#D97706' },
  { icon: <BookOpen size={13} strokeWidth={1.5} />, label: 'Culture, Histoire & Langues', color: '#7C3AED' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: DARK, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-0.5 mb-4 group">
              <span className="font-extrabold text-xl text-white transition-opacity group-hover:opacity-80"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Innova</span>
              <span className="font-extrabold text-xl transition-opacity group-hover:opacity-80"
                style={{ color: ORANGE, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>School</span>
            </Link>
            <p className="text-xs leading-relaxed mb-5 max-w-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Concours scolaire d'innovation — stimuler l'intelligence créative des jeunes à travers des projets concrets.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981', animation: 'blink 2s ease-in-out infinite' }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.30)' }}>Inscriptions ouvertes — 2026</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.25)' }}>Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/',           label: 'Accueil' },
                { to: '/a-propos',   label: 'À propos' },
                { to: '/poles',      label: 'Pôles thématiques' },
                { to: '/participer', label: 'Comment participer' },
                { to: '/comite',     label: 'Comité' },
                { to: '/contact',    label: 'Contact' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to}
                    className="text-xs transition-all hover:translate-x-1 inline-block"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pôles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.25)' }}>Les 4 pôles</h4>
            <ul className="space-y-2.5">
              {poles.map((p, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span style={{ color: p.color }}>{p.icon}</span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{p.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.25)' }}>Rejoindre</h4>
            <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Inscrivez votre équipe avant la fin septembre pour participer à la 1ère édition.
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: ORANGE, boxShadow: `0 4px 16px ${ORANGE}40` }}>
              Inscrire mon équipe <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.20)' }}>© 2026 InnovaSchool. Tous droits réservés.</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.20)' }}>Concours scolaire d'innovation — 1ère édition</p>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </footer>
  );
}

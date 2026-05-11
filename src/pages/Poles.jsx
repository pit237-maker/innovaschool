import { Link } from 'react-router-dom';
import { ArrowRight, Users, Cpu, Leaf, Sprout, BookOpen } from 'lucide-react';
import { poles } from '../data/data';
import useScrollReveal from '../hooks/useScrollReveal';
import ParticleCanvas from '../components/ParticleCanvas';
import ParallaxOrb from '../components/ParallaxOrb';

const DARK  = '#0C1B2A';
const ORANGE = '#F97316';

function Reveal({ children, delay = 0, className = '' }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity:   visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(36px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const poleIcons = [
  <Cpu      size={26} strokeWidth={1.5} />,
  <Leaf     size={26} strokeWidth={1.5} />,
  <Sprout   size={26} strokeWidth={1.5} />,
  <BookOpen size={26} strokeWidth={1.5} />,
];

/* ── Thèmes visuels par pôle ── */
const poleThemes = [
  {
    // Pôle 1 — Technologie & Innovation
    bg:    '#050f20',
    orb1:  'rgba(29,78,216,0.22)',
    orb2:  'rgba(56,189,248,0.12)',
    orb3:  'rgba(99,102,241,0.10)',
    label: 'Bleu technologie',
  },
  {
    // Pôle 2 — Environnement & Durabilité
    bg:    '#031410',
    orb1:  'rgba(16,185,129,0.22)',
    orb2:  'rgba(52,211,153,0.12)',
    orb3:  'rgba(20,184,166,0.10)',
    label: 'Vert forêt',
  },
  {
    // Pôle 3 — Agriculture & Développement
    bg:    '#0d0d03',
    orb1:  'rgba(217,119,6,0.22)',
    orb2:  'rgba(163,230,53,0.12)',
    orb3:  'rgba(234,179,8,0.10)',
    label: 'Terre & Récolte',
  },
  {
    // Pôle 4 — Culture, Histoire & Langues
    bg:    '#0a0618',
    orb1:  'rgba(124,58,237,0.22)',
    orb2:  'rgba(244,114,182,0.12)',
    orb3:  'rgba(167,139,250,0.10)',
    label: 'Violet culture',
  },
];

export default function Poles() {
  return (
    <main>

      {/* ══ 01 — HERO ══ */}
      <section style={{ backgroundColor: DARK, minHeight: 'calc(100vh - 65px)' }}
        className="relative overflow-hidden flex flex-col justify-between">
        <ParticleCanvas count={80} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <ParallaxOrb color={`rgba(249,115,22,0.14)`} size={600} top="-15%" right="-8%"  speed={0.18} />
          <ParallaxOrb color="rgba(16,185,129,0.08)"   size={500} bottom="5%"  left="-8%" speed={0.12} />
        </div>

        <div className="flex-1 flex items-center px-4 md:px-6 lg:px-8 relative z-20">
          <div className="mx-auto w-full max-w-[1280px]" style={{ animation: 'fadeInUp 0.7s ease 0.1s both' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ backgroundColor: 'rgba(249,115,22,0.12)', color: ORANGE, border: '1px solid rgba(249,115,22,0.25)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
              Thématiques
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-8 max-w-3xl">
              Les 4 pôles<br />
              <span style={{ color: ORANGE, textShadow: `0 0 60px ${ORANGE}45` }}>thématiques.</span>
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Chaque pôle répond à des problématiques précises et développe des compétences particulières chez les participants.
            </p>

            {/* Aperçu rapide des 4 pôles */}
            <div className="flex flex-wrap gap-3 mt-8">
              {poles.map((p, i) => (
                <div key={p.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: p.accent + '18', color: p.accent, border: `1px solid ${p.accent}30` }}>
                  {poleIcons[i]}
                  {p.title.split(' ')[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', animation: 'fadeIn 0.8s ease 0.9s both' }}>
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-5 flex justify-end">
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>Découvrir →</span>
          </div>
        </div>
      </section>

      {/* ══ Un pôle par section — fond thématique + parallax ══ */}
      {poles.map((pole, i) => {
        const theme = poleThemes[i];

        return (
          <section key={pole.id}
            style={{ backgroundColor: theme.bg, minHeight: '100vh' }}
            className="flex items-center relative overflow-hidden">

            {/* Orbes parallax thématiques */}
            <div className="pointer-events-none absolute inset-0">
              <ParallaxOrb color={theme.orb1} size={600} top="-20%"  right="-10%" speed={0.22} />
              <ParallaxOrb color={theme.orb2} size={450} bottom="-5%" left="-8%"  speed={0.15} />
              <ParallaxOrb color={theme.orb3} size={350} top="40%"   left="30%"   speed={0.10} />
            </div>

            {/* Grille de points subtile */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24 relative z-10">

              {/* En-tête */}
              <Reveal className="flex flex-col md:flex-row md:items-end gap-6 mb-20">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: pole.accent + '25', color: pole.accent, boxShadow: `0 4px 24px ${pole.accent}40` }}>
                  {poleIcons[i]}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white inline-block mb-3"
                    style={{ backgroundColor: pole.accent }}>
                    Pôle 0{pole.id}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
                    {pole.title}
                  </h2>
                </div>
                <p className="text-sm font-semibold md:self-end pb-1 max-w-xs" style={{ color: pole.accent }}>
                  {pole.theme}
                </p>
              </Reveal>

              {/* Corps — 3 colonnes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                {/* Description + problématique + objectif */}
                <Reveal delay={80} className="md:col-span-1 flex flex-col gap-5">
                  <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    {pole.description}
                  </p>

                  <div className="rounded-2xl p-5 flex-1"
                    style={{ backgroundColor: 'rgba(239,68,68,0.09)', border: '1.5px solid rgba(239,68,68,0.22)' }}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#f87171' }}>Problématique</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#fca5a5' }}>{pole.problematique}</p>
                  </div>

                  <div className="rounded-2xl p-5"
                    style={{ backgroundColor: 'rgba(16,185,129,0.09)', border: '1.5px solid rgba(16,185,129,0.22)' }}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#34d399' }}>Objectif</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#6ee7b7' }}>{pole.objectif}</p>
                  </div>
                </Reveal>

                {/* Projets attendus */}
                <Reveal delay={160}>
                  <div className="rounded-2xl p-7 h-full flex flex-col transition-all hover:scale-[1.01]"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: `1.5px solid ${pole.accent}28`, boxShadow: `0 4px 30px ${pole.accent}10` }}>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: pole.accent }} />
                      <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: pole.accent }}>
                        Projets attendus
                      </h4>
                    </div>
                    <ul className="space-y-3.5 flex-1">
                      {pole.projets.map((p, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>
                          <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white mt-0.5"
                            style={{ backgroundColor: pole.accent, boxShadow: `0 2px 8px ${pole.accent}55` }}>
                            {j + 1}
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                {/* Compétences + composition */}
                <Reveal delay={240}>
                  <div className="flex flex-col gap-5 h-full">
                    <div className="rounded-2xl p-7 flex-1 transition-all hover:scale-[1.01]"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: `1.5px solid ${pole.accent}28`, boxShadow: `0 4px 30px ${pole.accent}10` }}>
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: pole.accent }} />
                        <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: pole.accent }}>
                          Compétences
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pole.competences.map((c, j) => (
                          <span key={j}
                            className="text-xs px-3 py-1.5 rounded-full font-semibold"
                            style={{ backgroundColor: pole.accent + '18', color: pole.accent, border: `1px solid ${pole.accent}30` }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl p-5"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: `1.5px solid ${pole.accent}28` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: pole.accent }} />
                        <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: pole.accent }}>
                          Composition
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} style={{ color: pole.accent, flexShrink: 0 }} />
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.40)' }}>{pole.filiere}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Séparateur */}
              <div className="w-12 h-0.5 rounded-full" style={{ backgroundColor: pole.accent + '55' }} />
            </div>
          </section>
        );
      })}

      {/* ══ CTA final ══ */}
      <section style={{ backgroundColor: '#fafaf9', minHeight: '50vh' }} className="flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-16">
          <Reveal>
            <div className="rounded-3xl p-14 text-center relative overflow-hidden" style={{ backgroundColor: DARK }}>
              <div className="pointer-events-none absolute inset-0">
                <ParallaxOrb color={`rgba(249,115,22,0.20)`} size={400} top="-30%"  right="-8%"  speed={0.18} />
                <ParallaxOrb color="rgba(16,185,129,0.10)"   size={320} bottom="-20%" left="-5%" speed={0.12} />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Vous avez choisi votre pôle ?</h3>
                <p className="text-sm mb-8 max-w-sm mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Découvrez comment former votre équipe et déposer votre candidature.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/participer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                    style={{ backgroundColor: ORANGE, boxShadow: `0 6px 24px ${ORANGE}45` }}>
                    Comment participer <ArrowRight size={14} />
                  </Link>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    Inscrire mon équipe
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes fadeInUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse     { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </main>
  );
}

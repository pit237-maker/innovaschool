import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Award, Calendar, Cpu, Leaf, Sprout, BookOpen, ChevronDown } from 'lucide-react';
import { poles } from '../data/data';
import useScrollReveal from '../hooks/useScrollReveal';
import ParticleCanvas from '../components/ParticleCanvas';
import ParallaxOrb from '../components/ParallaxOrb';
import StatsCounter from '../components/StatsCounter';

const DARK = '#0C1B2A';
const ORANGE = '#F97316';
const GREEN = '#10B981';

function Reveal({ children, delay = 0, className = '' }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(36px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const poleIcons = [
  <Cpu size={22} strokeWidth={1.5} />,
  <Leaf size={22} strokeWidth={1.5} />,
  <Sprout size={22} strokeWidth={1.5} />,
  <BookOpen size={22} strokeWidth={1.5} />,
];

const steps = [
  {
    num: '01',
    title: 'Candidature',
    desc: "Formez votre équipe, choisissez un pôle et soumettez votre idée avec un pitch oral de 5 à 10 min.",
    color: ORANGE,
    label: 'Phase 0 — Septembre',
  },
  {
    num: '02',
    title: 'Développement',
    desc: "Approfondissez votre concept avec le soutien des mentors et construisez un prototype solide.",
    color: '#7C3AED',
    label: 'Phase 1 — Oct. à Déc.',
  },
  {
    num: '03',
    title: 'Réalisation',
    desc: "Mettez votre projet en œuvre, testez-le sur le terrain et défendez-le lors de la grande finale.",
    color: GREEN,
    label: 'Phase 2 — Jan. à Avr.',
  },
];

const eligibilite = [
  { icon: <Award size={24} strokeWidth={1.5} />, title: 'Second cycle', desc: 'Seconde, Première, Terminale (FR) · Lower & Upper Sixth (EN)', color: ORANGE },
  { icon: <Users size={24} strokeWidth={1.5} />, title: 'Jusqu\'à 10 élèves', desc: 'Des équipes interdisciplinaires avec des profils variés.', color: '#7C3AED' },
  { icon: <Target size={24} strokeWidth={1.5} />, title: 'Interdisciplinaire', desc: 'Chaque équipe doit intégrer des élèves de filières différentes.', color: GREEN },
];

export default function Home() {
  return (
    <main>

      {/* ══════════════════════════════════════
          01 — HERO
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK, minHeight: 'calc(100vh - 65px)' }}
        className="relative overflow-hidden flex flex-col justify-between">

        {/* Canvas particules */}
        <ParticleCanvas count={100} />

        {/* Orbes parallax */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <ParallaxOrb color={`${ORANGE}18`}              size={620} top="-12%" right="-6%"   speed={0.20} />
          <ParallaxOrb color="rgba(124,58,237,0.10)"      size={500} bottom="8%" left="-8%"   speed={0.14} />
          <ParallaxOrb color={`${GREEN}10`}               size={340} top="35%"   left="28%"   speed={0.08} />
        </div>

        {/* Contenu central */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8 relative z-20">
          <div className="w-full max-w-[1280px] mx-auto">

            {/* Badge */}
            <div className="flex justify-center mb-10" style={{ animation: 'fadeIn 0.6s ease both' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'rgba(249,115,22,0.12)', color: ORANGE, border: '1px solid rgba(249,115,22,0.25)', backdropFilter: 'blur(8px)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
                Concours scolaire d'innovation — 1ère édition
              </div>
            </div>

            {/* Titre + bulle */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
              <div className="text-center" style={{ animation: 'fadeInUp 0.7s ease 0.2s both' }}>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
                  Innove.<br />Crée.<br />
                  <span style={{ color: ORANGE, textShadow: `0 0 60px ${ORANGE}50` }}>Transforme.</span>
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8" style={{ animation: 'fadeIn 0.7s ease 0.9s both' }}>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                    style={{ backgroundColor: ORANGE, boxShadow: `0 4px 20px ${ORANGE}45` }}>
                    Inscrire mon équipe <ArrowRight size={15} />
                  </Link>
                  <Link to="/participer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.14)' }}>
                    En savoir plus
                  </Link>
                </div>
              </div>

              {/* Bulle description */}
              <div className="max-w-xs w-full" style={{ animation: 'fadeInRight 0.8s ease 1s both' }}>
                <div className="rounded-2xl px-6 py-6"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)', backdropFilter: 'blur(16px)' }}>
                  <div className="w-8 h-0.5 rounded-full mb-5" style={{ backgroundColor: ORANGE }} />
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    InnovaSchool permet aux élèves du second cycle de{' '}
                    <strong className="text-white font-semibold">concevoir, développer et réaliser</strong>{' '}
                    des projets innovants autour de problématiques concrètes.
                  </p>
                  <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="grid grid-cols-2 gap-4">
                      {[{ v: '4', l: 'Pôles' }, { v: '3', l: 'Phases' }, { v: '10', l: 'Élèves max/équipe' }, { v: '1', l: 'Finale' }].map((s, i) => (
                        <div key={i}>
                          <div className="text-xl font-extrabold text-white leading-none">{s.v}</div>
                          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bas du hero */}
        <div className="relative z-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', animation: 'fadeIn 0.8s ease 1.5s both' }}>
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-5 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-6">
              {['Technologie', 'Environnement', 'Agriculture', 'Culture'].map((p, i) => (
                <span key={i} className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>{p}</span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 ml-auto" style={{ animation: 'bounceY 2s ease-in-out 2s infinite' }}>
              <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.18)' }}>Découvrir</span>
              <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.18)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS COUNTER
      ══════════════════════════════════════ */}
      <StatsCounter />

      {/* ══════════════════════════════════════
          02 — COMMENT ÇA MARCHE
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fafaf9', minHeight: '100vh' }} className="flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24">

          <Reveal className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Le parcours</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: DARK }}>
              Comment ça marche ?
            </h2>
            <p className="text-stone-400 max-w-md mx-auto text-sm leading-relaxed">
              De l'idée à la réalisation — un parcours progressif sur toute l'année scolaire.
            </p>
          </Reveal>

          {/* Cards steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="relative rounded-2xl p-8 h-full flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    backgroundColor: 'white',
                    border: `1.5px solid ${step.color}22`,
                    boxShadow: `0 2px 20px ${step.color}08`,
                  }}>
                  {/* Bande couleur haut */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full" style={{ backgroundColor: step.color }} />

                  <div className="flex items-center justify-between mb-6 pt-2">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white"
                      style={{ backgroundColor: step.color, boxShadow: `0 4px 16px ${step.color}50` }}>
                      {step.num}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: step.color + '12', color: step.color }}>
                      {step.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold mb-3" style={{ color: DARK }}>{step.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed flex-1">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500} className="text-center">
            <Link to="/participer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: DARK, boxShadow: '0 4px 20px rgba(12,27,42,0.2)' }}>
              Voir le calendrier complet <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          03 — LES 4 PÔLES
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: DARK, minHeight: '100vh' }} className="flex items-center relative overflow-hidden">

        <div className="pointer-events-none absolute inset-0">
          <div style={{
            position: 'absolute', top: '15%', right: '-8%',
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '5%', left: '-5%',
            width: 400, height: 400,
            background: `radial-gradient(circle, ${GREEN}08 0%, transparent 65%)`,
          }} />
        </div>

        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24 relative z-10">

          <Reveal className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Thématiques</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Les 4 pôles thématiques
            </h2>
            <p className="max-w-sm mx-auto text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Chaque équipe choisit un domaine et construit un projet autour d'un thème précis.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {poles.map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <div className="group rounded-2xl p-7 h-full flex flex-col cursor-default transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = p.accent + '12';
                    e.currentTarget.style.borderColor = p.accent + '40';
                    e.currentTarget.style.boxShadow = `0 8px 40px ${p.accent}15`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>

                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: p.accent + '20', color: p.accent }}>
                        {poleIcons[i]}
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: p.accent }}>
                        Pôle 0{p.id}
                      </span>
                    </div>
                    <ArrowRight size={15} style={{ color: 'rgba(255,255,255,0.15)', marginTop: 4 }} />
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-1.5">{p.title}</h3>
                  <p className="text-xs font-semibold mb-4" style={{ color: p.accent }}>{p.theme}</p>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{p.description}</p>

                  <div className="mt-5 pt-4 flex items-center justify-between"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{p.filiere}</span>
                    <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: p.accent }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={550} className="text-center">
            <Link to="/poles"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
              style={{ border: '1px solid rgba(255,255,255,0.14)' }}>
              Explorer tous les pôles <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          04 — ÉLIGIBILITÉ
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fafaf9', minHeight: '100vh' }} className="flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24">

          <Reveal className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Éligibilité</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: DARK }}>
              Qui peut participer ?
            </h2>
            <p className="text-stone-400 max-w-sm mx-auto text-sm leading-relaxed">
              Le concours est ouvert à tous les élèves du second cycle, francophones et anglophones.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {eligibilite.map((item, i) => (
              <Reveal key={i} delay={i * 140}>
                <div className="rounded-2xl p-8 text-center h-full flex flex-col items-center transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: 'white',
                    border: `1.5px solid ${item.color}20`,
                    boxShadow: `0 2px 16px ${item.color}08`,
                  }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: item.color + '14', color: item.color, boxShadow: `0 4px 20px ${item.color}20` }}>
                    {item.icon}
                  </div>
                  <h4 className="font-extrabold mb-3 text-base" style={{ color: DARK }}>{item.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                  <div className="mt-6 w-8 h-0.5 rounded-full" style={{ backgroundColor: item.color }} />
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA intégré */}
          <Reveal delay={500}>
            <div className="rounded-3xl p-12 text-center relative overflow-hidden"
              style={{ backgroundColor: DARK }}>
              <div className="pointer-events-none absolute inset-0">
                <div style={{
                  position: 'absolute', top: '-30%', right: '-10%',
                  width: 420, height: 420,
                  background: `radial-gradient(circle, ${ORANGE}20 0%, transparent 65%)`,
                }} />
                <div style={{
                  position: 'absolute', bottom: '-20%', left: '-5%',
                  width: 320, height: 320,
                  background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)',
                }} />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                  style={{ backgroundColor: 'rgba(249,115,22,0.14)', color: ORANGE, border: '1px solid rgba(249,115,22,0.24)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: ORANGE, display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
                  1ère édition — Inscriptions ouvertes
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                  Prêt à relever le défi ?
                </h3>
                <p className="max-w-sm mx-auto text-sm mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Inscrivez votre équipe et montrez que les élèves peuvent changer les choses.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                    style={{ backgroundColor: ORANGE, boxShadow: `0 6px 28px ${ORANGE}50` }}>
                    Inscrire mon équipe <ArrowRight size={15} />
                  </Link>
                  <Link to="/a-propos"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bouton flottant */}
      <div className="fixed bottom-6 right-6 z-50" style={{ animation: 'fadeInUp 0.6s ease 1.8s both' }}>
        <Link to="/participer"
          className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: ORANGE, boxShadow: `0 4px 24px ${ORANGE}60` }}>
          Comment participer <ArrowRight size={15} />
        </Link>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInRight { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes bounceY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        @keyframes pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </main>
  );
}

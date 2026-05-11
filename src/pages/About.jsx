import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Compass, BarChart2, Settings, GraduationCap, Scale, Users, Target, Award } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import ParticleCanvas from '../components/ParticleCanvas';
import ParallaxOrb from '../components/ParallaxOrb';

const DARK = '#0C1B2A';
const ORANGE = '#F97316';

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

const objectifs = [
  "Développer chez les élèves une culture d'innovation, de responsabilité et de résolution de problèmes.",
  "Faire émerger des projets utiles, ancrés dans des besoins réels et adaptés au contexte local.",
  "Créer un cadre d'apprentissage par projet, avec mentorat, accompagnement et évaluation progressive.",
  "Valoriser des compétences transversales : leadership, communication, organisation et créativité.",
  "Mettre en relation l'école, les partenaires, les mentors et le public autour d'initiatives concrètes.",
  "Faire du concours un dispositif reproductible et extensible à d'autres établissements.",
];

const architecture = [
  { icon: <Compass size={20} strokeWidth={1.5} />, title: 'Les pôles thématiques', desc: 'Orientent les projets vers quatre grands domaines jugés prioritaires.', color: ORANGE },
  { icon: <BarChart2 size={20} strokeWidth={1.5} />, title: 'Les phases du concours', desc: "Font évoluer les équipes de la simple idée vers une réalisation concrète.", color: '#10B981' },
  { icon: <Settings size={20} strokeWidth={1.5} />, title: 'Le comité', desc: 'Assure la gouvernance, la coordination, le financement et la communication.', color: '#7C3AED' },
  { icon: <GraduationCap size={20} strokeWidth={1.5} />, title: 'Les mentors', desc: 'Accompagnent les équipes dans la maturation et la structuration du projet.', color: '#1D4ED8' },
  { icon: <Scale size={20} strokeWidth={1.5} />, title: 'Le jury', desc: 'Évalue et sélectionne les projets selon des critères définis et progressifs.', color: '#D97706' },
  { icon: <Users size={20} strokeWidth={1.5} />, title: 'Le public', desc: 'Participe à la valorisation des projets lors de la finale avec un vote.', color: '#0EA5E9' },
];

export default function About() {
  return (
    <main>

      {/* ══ 01 — HERO ══ */}
      <section style={{ backgroundColor: DARK, minHeight: 'calc(100vh - 65px)' }}
        className="relative overflow-hidden flex flex-col justify-between">
        <ParticleCanvas count={80} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <ParallaxOrb color={`${ORANGE}14`}         size={560} top="-15%" right="-8%"  speed={0.20} />
          <ParallaxOrb color="rgba(124,58,237,0.10)" size={460} bottom="5%" left="-10%" speed={0.13} />
        </div>

        <div className="flex-1 flex items-center px-4 md:px-6 lg:px-8 relative z-20">
          <div className="mx-auto w-full max-w-[1280px]" style={{ animation: 'fadeInUp 0.7s ease 0.1s both' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ backgroundColor: 'rgba(249,115,22,0.12)', color: ORANGE, border: '1px solid rgba(249,115,22,0.25)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
              À propos
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-8 max-w-3xl">
              Un projet éducatif,<br />social et{' '}
              <span style={{ color: ORANGE, textShadow: `0 0 60px ${ORANGE}45` }}>stratégique.</span>
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              InnovaSchool transforme l'école en lieu d'initiative en donnant aux élèves les outils pour innover concrètement.
            </p>
          </div>
        </div>
        <div className="relative z-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', animation: 'fadeIn 0.8s ease 0.9s both' }}>
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-5 flex items-center justify-end">
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>Découvrir →</span>
          </div>
        </div>
      </section>

      {/* ══ 02 — VISION ══ */}
      <section style={{ backgroundColor: '#fafaf9', minHeight: '100vh' }} className="flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Notre vision</p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6" style={{ color: DARK }}>
                  Qu'est-ce qu'InnovaSchool ?
                </h2>
                <p className="text-stone-500 leading-relaxed mb-4 text-sm">
                  InnovaSchool est un concours scolaire d'innovation conçu comme un cadre structuré d'émergence, d'accompagnement et de mise en valeur de projets portés par des élèves.
                </p>
                <p className="text-stone-500 leading-relaxed mb-4 text-sm">
                  Le projet ne se limite pas à récompenser une idée originale — il installe une dynamique complète de réflexion, de conception, d'expérimentation et de réalisation autour de problématiques concrètes.
                </p>
                <p className="text-stone-500 leading-relaxed text-sm">
                  Le concours repose sur une conviction forte : les élèves sont des{' '}
                  <strong className="text-stone-700">acteurs capables d'identifier des problèmes réels</strong>, d'imaginer des solutions crédibles et de les défendre de manière structurée.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Target size={18} strokeWidth={1.5}/>, title: 'Mission claire', desc: "Stimuler l'intelligence créative des jeunes face à des enjeux concrets.", color: ORANGE },
                { icon: <GraduationCap size={18} strokeWidth={1.5}/>, title: 'Accompagnement', desc: 'Mentors, comité et jury pour guider chaque équipe.', color: '#7C3AED' },
                { icon: <BarChart2 size={18} strokeWidth={1.5}/>, title: 'Progression', desc: "Trois phases pour passer de l'idée à la réalisation.", color: '#10B981' },
                { icon: <Award size={18} strokeWidth={1.5}/>, title: 'Reconnaissance', desc: 'Une cérémonie finale pour valoriser les meilleurs projets.', color: '#1D4ED8' },
              ].map((card, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="rounded-2xl p-5 h-full transition-all hover:-translate-y-1 hover:shadow-lg"
                    style={{ backgroundColor: 'white', border: `1.5px solid ${card.color}20`, boxShadow: `0 2px 16px ${card.color}08` }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: card.color + '18', color: card.color }}>
                      {card.icon}
                    </div>
                    <h4 className="font-bold text-sm mb-1" style={{ color: DARK }}>{card.title}</h4>
                    <p className="text-xs text-stone-500 leading-relaxed">{card.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 03 — OBJECTIFS ══ */}
      <section style={{ backgroundColor: DARK, minHeight: '100vh' }} className="flex items-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div style={{ position: 'absolute', top: '10%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', bottom: '5%', left: '-5%', width: 400, height: 400, background: `radial-gradient(circle, ${ORANGE}08 0%, transparent 65%)` }} />
        </div>
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24 relative z-10">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Nos objectifs</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Pourquoi ce projet existe</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {objectifs.map((obj, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="flex items-start gap-4 rounded-2xl p-6 h-full transition-all hover:bg-white/[0.07] hover:-translate-y-0.5"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                  <div className="shrink-0 mt-0.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(16,185,129,0.20)' }}>
                      <CheckCircle size={15} style={{ color: '#10B981' }} />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{obj}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 04 — ARCHITECTURE ══ */}
      <section style={{ backgroundColor: '#fafaf9', minHeight: '100vh' }} className="flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Architecture</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: DARK }}>Comment le projet fonctionne</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {architecture.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="rounded-2xl p-7 h-full transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ backgroundColor: 'white', border: `1.5px solid ${item.color}20`, boxShadow: `0 2px 16px ${item.color}08` }}>
                  <div className="h-0.5 w-full rounded-full mb-6" style={{ background: `linear-gradient(to right, ${item.color}70, transparent)` }} />
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: item.color + '18', color: item.color }}>
                    {item.icon}
                  </div>
                  <h4 className="font-extrabold mb-2 text-sm" style={{ color: DARK }}>{item.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={650}>
            <div className="rounded-3xl p-12 text-center relative overflow-hidden" style={{ backgroundColor: DARK }}>
              <div className="pointer-events-none absolute inset-0">
                <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 400, height: 400, background: `radial-gradient(circle, ${ORANGE}20 0%, transparent 65%)` }} />
                <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)' }} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-extrabold text-white mb-3">Rejoignez l'aventure</h3>
                <p className="mb-7 text-sm max-w-sm mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Découvrez les pôles thématiques et commencez à construire votre projet.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/poles"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                    style={{ backgroundColor: ORANGE, boxShadow: `0 6px 24px ${ORANGE}45` }}>
                    Voir les pôles <ArrowRight size={14} />
                  </Link>
                  <Link to="/participer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    Comment participer
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </main>
  );
}

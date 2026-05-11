import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, Award, Users, Target } from 'lucide-react';
import { phases } from '../data/data';
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

const calendar = [
  { seq: 'Lancement / Phase 0', period: 'Septembre (sem. 3 & 4)', content: 'Présentation des 4 thèmes, formation des groupes, dépôt des candidatures et sélection de 2 groupes par pôle.' },
  { seq: 'Phase 1 — Développement', period: 'Octobre à décembre', content: 'Élaboration des dossiers avec les mentors — une rencontre mensuelle avec le comité.' },
  { seq: 'Passage vers la Phase 2', period: 'Fin décembre', content: 'Présentation et défense du cahier de charges — une équipe retenue par pôle.' },
  { seq: 'Phase 2 — Réalisation', period: 'Janvier à avril', content: 'Mise en œuvre du projet, accompagnement par les mentors et rencontres mensuelles.' },
  { seq: 'Cérémonie finale', period: "Fin d'année scolaire", content: 'Présentation publique des réalisations, vote du public et remise des prix.' },
];

const prereqs = [
  { icon: <Award size={22} strokeWidth={1.5} />, title: 'Second cycle uniquement', desc: 'Seconde, Première, Terminale (FR) · Lower & Upper Sixth (EN)', color: ORANGE },
  { icon: <Users size={22} strokeWidth={1.5} />, title: 'Jusqu\'à 10 élèves par équipe', desc: 'Pour assurer une répartition efficace des rôles et une organisation structurée.', color: '#10B981' },
  { icon: <Target size={22} strokeWidth={1.5} />, title: 'Interdisciplinarité obligatoire', desc: 'Les équipes doivent obligatoirement intégrer des élèves de différentes filières.', color: '#7C3AED' },
];

export default function Participer() {
  return (
    <main>

      {/* ══ 01 — HERO ══ */}
      <section style={{ backgroundColor: DARK, minHeight: 'calc(100vh - 65px)' }}
        className="relative overflow-hidden flex flex-col justify-between">
        <ParticleCanvas count={80} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <ParallaxOrb color={`${ORANGE}14`}         size={580} top="-10%" right="-5%"  speed={0.20} />
          <ParallaxOrb color="rgba(124,58,237,0.10)" size={480} bottom="8%" left="-8%"  speed={0.13} />
        </div>

        <div className="flex-1 flex items-center px-4 md:px-6 lg:px-8 relative z-20">
          <div className="mx-auto w-full max-w-[1280px]" style={{ animation: 'fadeInUp 0.7s ease 0.1s both' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ backgroundColor: 'rgba(249,115,22,0.12)', color: ORANGE, border: '1px solid rgba(249,115,22,0.25)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
              Participation
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-8 max-w-3xl">
              Comment<br />
              <span style={{ color: ORANGE, textShadow: `0 0 60px ${ORANGE}45` }}>participer ?</span>
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Un parcours progressif en 3 phases sur toute l'année scolaire — de l'idée à la réalisation concrète.
            </p>
          </div>
        </div>
        <div className="relative z-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', animation: 'fadeIn 0.8s ease 0.9s both' }}>
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-5 flex items-center justify-end">
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>Découvrir →</span>
          </div>
        </div>
      </section>

      {/* ══ 02 — PRÉREQUIS ══ */}
      <section style={{ backgroundColor: '#fafaf9', minHeight: '100vh' }} className="flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Prérequis</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: DARK }}>Qui peut participer ?</h2>
            <p className="text-stone-400 mt-4 max-w-sm mx-auto text-sm leading-relaxed">Le concours est ouvert à tous les élèves du second cycle.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {prereqs.map((item, i) => (
              <Reveal key={i} delay={i * 130}>
                <div className="rounded-2xl p-8 text-center h-full flex flex-col items-center transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ backgroundColor: 'white', border: `1.5px solid ${item.color}22`, boxShadow: `0 2px 16px ${item.color}08` }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: item.color + '18', color: item.color, boxShadow: `0 4px 20px ${item.color}20` }}>
                    {item.icon}
                  </div>
                  <h4 className="font-extrabold mb-2 text-sm" style={{ color: DARK }}>{item.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                  <div className="mt-5 w-8 h-0.5 rounded-full" style={{ backgroundColor: item.color }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 03 — LES 3 PHASES ══ */}
      <section style={{ backgroundColor: DARK, minHeight: '100vh' }} className="flex items-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div style={{ position: 'absolute', top: '5%', right: '-8%', width: 500, height: 500, background: `radial-gradient(circle, ${ORANGE}08 0%, transparent 65%)` }} />
          <div style={{ position: 'absolute', bottom: '5%', left: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)' }} />
        </div>
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24 relative z-10">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Le parcours</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Les 3 phases du concours</h2>
          </Reveal>
          <div className="space-y-5">
            {phases.map((phase, i) => (
              <Reveal key={i} delay={i * 130}>
                <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all hover:scale-[1.01]"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: `1px solid ${phase.color}30` }}>
                  {/* Numéro coloré */}
                  <div className="flex items-center justify-center p-8 md:w-44 shrink-0 relative"
                    style={{ backgroundColor: phase.color }}>
                    <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
                    <div className="text-center relative z-10">
                      <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Phase</div>
                      <div className="text-6xl font-extrabold text-white leading-none">{phase.num}</div>
                    </div>
                  </div>
                  {/* Contenu */}
                  <div className="p-7 flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-xl font-extrabold text-white">{phase.title}</h3>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ backgroundColor: phase.color + '25', color: phase.color }}>
                        {phase.subtitle}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-5 text-xs mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <span className="flex items-center gap-1.5"><Clock size={12} />{phase.period}</span>
                      <span className="flex items-center gap-1.5"><Star size={12} />{phase.points} points</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1.5">
                        {phase.content.map((c, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: phase.color }} />
                            {c}
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-xl p-4 flex items-start"
                        style={{ backgroundColor: phase.color + '15', border: `1px solid ${phase.color}30` }}>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: phase.color }}>Résultat</p>
                          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{phase.result}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 04 — CALENDRIER ══ */}
      <section style={{ backgroundColor: '#fafaf9', minHeight: '100vh' }} className="flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Calendrier</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: DARK }}>Déroulement sur l'année</h2>
          </Reveal>

          <div className="max-w-3xl mx-auto relative mb-14">
            {/* Ligne verticale */}
            <div className="absolute left-5 top-5 bottom-5 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, #e7e5e4 10%, #e7e5e4 90%, transparent)' }} />
            <div className="space-y-5">
              {calendar.map((item, i) => {
                const colors = [ORANGE, '#10B981', '#7C3AED', '#1D4ED8', '#D97706'];
                const c = colors[i % colors.length];
                return (
                  <Reveal key={i} delay={i * 100}>
                    <div className="flex gap-6 items-start">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 z-10"
                        style={{ backgroundColor: c, boxShadow: `0 4px 16px ${c}50` }}>
                        {i + 1}
                      </div>
                      <div className="rounded-2xl p-5 flex-1 transition-all hover:-translate-y-0.5 hover:shadow-md"
                        style={{ backgroundColor: 'white', border: `1.5px solid ${c}20`, boxShadow: `0 2px 12px ${c}08` }}>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-extrabold text-sm" style={{ color: DARK }}>{item.seq}</h4>
                          <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                            style={{ backgroundColor: c + '18', color: c }}>
                            {item.period}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={600}>
            <div className="rounded-3xl p-12 text-center relative overflow-hidden" style={{ backgroundColor: DARK }}>
              <div className="pointer-events-none absolute inset-0">
                <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: 380, height: 380, background: `radial-gradient(circle, ${ORANGE}22 0%, transparent 65%)` }} />
                <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)' }} />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                  style={{ backgroundColor: 'rgba(249,115,22,0.14)', color: ORANGE, border: '1px solid rgba(249,115,22,0.24)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: ORANGE, display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
                  Inscriptions ouvertes
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3">Prêt à vous lancer ?</h3>
                <p className="text-sm mb-7 max-w-sm mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Inscrivez votre équipe et commencez le parcours dès maintenant.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                    style={{ backgroundColor: ORANGE, boxShadow: `0 6px 24px ${ORANGE}45` }}>
                    Inscrire mon équipe <ArrowRight size={14} />
                  </Link>
                  <Link to="/comite"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    Le comité
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

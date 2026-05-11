import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { committee } from '../data/data';
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

export default function Comite() {
  return (
    <main>

      {/* ══ 01 — HERO ══ */}
      <section style={{ backgroundColor: DARK, minHeight: 'calc(100vh - 65px)' }}
        className="relative overflow-hidden flex flex-col justify-between">
        <ParticleCanvas count={80} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <ParallaxOrb color={`${ORANGE}14`}           size={560} top="-10%" right="-5%"  speed={0.20} />
          <ParallaxOrb color="rgba(16,185,129,0.08)"   size={460} bottom="5%" left="-8%"  speed={0.13} />
        </div>

        <div className="flex-1 flex items-center px-4 md:px-6 lg:px-8 relative z-20">
          <div className="mx-auto w-full max-w-[1280px]" style={{ animation: 'fadeInUp 0.7s ease 0.1s both' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ backgroundColor: 'rgba(249,115,22,0.12)', color: ORANGE, border: '1px solid rgba(249,115,22,0.25)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
              Organisation
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-8 max-w-3xl">
              Le comité<br />
              <span style={{ color: ORANGE, textShadow: `0 0 60px ${ORANGE}45` }}>InnovaSchool.</span>
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              5 cellules complémentaires assurent la gouvernance, la coordination et la réussite du concours.
            </p>
          </div>
        </div>
        <div className="relative z-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', animation: 'fadeIn 0.8s ease 0.9s both' }}>
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-5 flex items-center justify-end">
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>Découvrir →</span>
          </div>
        </div>
      </section>

      {/* ══ 02 — INTRO + CELLULES ══ */}
      <section style={{ backgroundColor: '#fafaf9', minHeight: '100vh' }} className="flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24">
          <Reveal className="mb-16">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Rôle du comité</p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6" style={{ color: DARK }}>
                Le noyau opérationnel
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                Le comité conçoit le cadre général, fixe les règles, organise les étapes, mobilise les ressources, coordonne les cellules, accompagne les équipes via les mentors et prépare la visibilité externe du projet.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {committee.map((cell, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl h-full"
                  style={{ backgroundColor: 'white', border: `1.5px solid ${cell.color}20`, boxShadow: `0 2px 20px ${cell.color}08` }}>
                  {/* Bande colorée */}
                  <div className="h-1" style={{ background: `linear-gradient(to right, ${cell.color}, ${cell.color}60)` }} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
                        style={{ backgroundColor: cell.color + '18', boxShadow: `0 2px 10px ${cell.color}20` }}>
                        {cell.icon}
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: cell.color }}>
                        {cell.cellule}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base mb-2" style={{ color: DARK }}>{cell.title}</h3>
                    <p className="text-xs text-stone-500 leading-relaxed mb-5">{cell.mission}</p>
                    <div className="pt-4" style={{ borderTop: `1px solid ${cell.color}18` }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: cell.color + 'AA' }}>Membres</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cell.membres.map((m, j) => (
                          <span key={j} className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{ backgroundColor: cell.color + '14', color: cell.color, border: `1px solid ${cell.color}25` }}>
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 03 — MENTORS ══ */}
      <section style={{ backgroundColor: DARK, minHeight: '100vh' }} className="flex items-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div style={{ position: 'absolute', top: '10%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 400, height: 400, background: `radial-gradient(circle, ${ORANGE}08 0%, transparent 65%)` }} />
        </div>
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24 relative z-10">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Accompagnement</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Le rôle des mentors</h2>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="rounded-2xl p-8 mb-8 text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <p className="leading-relaxed text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Les mentors aident les équipes à <strong className="text-white">clarifier leurs idées</strong>, éviter les incohérences, structurer leur méthode et préparer leurs soutenances. Leur rôle n'est pas de faire le projet à la place des élèves, mais de <strong className="text-white">maximiser la qualité des propositions</strong>.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { title: 'Clarifier les idées', desc: "Aider l'équipe à définir clairement sa vision et ses objectifs.", color: ORANGE },
                { title: 'Structurer la méthode', desc: 'Organiser le plan de travail et les étapes clés du projet.', color: '#10B981' },
                { title: 'Préparer les défenses', desc: 'Entraîner les équipes aux présentations devant le jury.', color: '#7C3AED' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 130}>
                  <div className="rounded-2xl p-6 h-full transition-all hover:-translate-y-1"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${item.color}30` }}>
                    <div className="w-8 h-0.5 rounded-full mb-4" style={{ backgroundColor: item.color }} />
                    <h4 className="font-extrabold text-white text-sm mb-2">{item.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={500}>
              <div className="rounded-3xl p-10 text-center relative overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="pointer-events-none absolute inset-0">
                  <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: 300, height: 300, background: `radial-gradient(circle, ${ORANGE}15 0%, transparent 65%)` }} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-extrabold text-white mb-3">Rejoindre le concours</h3>
                  <p className="text-sm mb-6 max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Inscrivez votre équipe pour bénéficier d'un accompagnement personnalisé.
                  </p>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                    style={{ backgroundColor: ORANGE, boxShadow: `0 4px 20px ${ORANGE}45` }}>
                    Inscrire mon équipe <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
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

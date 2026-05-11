import { useState } from 'react';
import { Send, CheckCircle, Award, Users, Target, Calendar, ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import ParticleCanvas from '../components/ParticleCanvas';
import ParallaxOrb from '../components/ParallaxOrb';

const DARK   = '#0C1B2A';
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

const infos = [
  { icon: <Calendar size={18} strokeWidth={1.5} />, title: "Date limite d'inscription", desc: 'Fin septembre — Phase 0',                    color: ORANGE   },
  { icon: <Users size={18} strokeWidth={1.5} />,   title: "Taille d'équipe",            desc: '10 élèves maximum, interdisciplinaires',      color: '#10B981' },
  { icon: <Award size={18} strokeWidth={1.5} />,   title: 'Niveau requis',              desc: 'Second cycle (Seconde à Terminale)',           color: '#7C3AED' },
  { icon: <Target size={18} strokeWidth={1.5} />,  title: '4 pôles disponibles',        desc: 'Technologie · Environnement · Agriculture · Culture', color: '#1D4ED8' },
];

/* ── Champ avec floating label ── */
function FloatingField({ label, name, type = 'text', value, onChange, required, placeholder = '' }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const elevated = focused || filled;

  const isValid   = filled && (type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  const isInvalid = filled && !isValid;

  const borderColor = isInvalid ? '#ef4444' : isValid ? '#10B981' : focused ? DARK : '#e7e5e4';
  const shadow      = focused ? (isInvalid ? '0 0 0 3px rgba(239,68,68,0.10)' : isValid ? '0 0 0 3px rgba(16,185,129,0.10)' : `0 0 0 3px ${DARK}08`) : 'none';

  return (
    <div style={{ position: 'relative', paddingTop: 10 }}>
      <label style={{
        position: 'absolute',
        left: 14,
        top: elevated ? 2 : 22,
        fontSize: elevated ? 10 : 13,
        fontWeight: elevated ? 600 : 400,
        color: focused ? (isInvalid ? '#ef4444' : isValid ? '#10B981' : DARK) : '#a8a29e',
        transition: 'all 0.2s ease',
        pointerEvents: 'none',
        backgroundColor: 'white',
        paddingInline: 2,
        borderRadius: 2,
        zIndex: 1,
      }}>
        {label}{required && ' *'}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={focused && !filled ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 12,
          padding: '10px 14px',
          fontSize: 14,
          outline: 'none',
          transition: 'all 0.2s ease',
          backgroundColor: filled ? 'white' : '#fafaf9',
          boxShadow: shadow,
        }}
      />
      {/* Icône validation */}
      {filled && (
        <span style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-10%)',
          fontSize: 13, color: isValid ? '#10B981' : '#ef4444',
          transition: 'color 0.2s ease',
        }}>
          {isValid ? '✓' : '✗'}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm]       = useState({ nom: '', email: '', etablissement: '', pole: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <main>

      {/* ══ 01 — HERO ══ */}
      <section style={{ backgroundColor: DARK, minHeight: 'calc(100vh - 65px)' }}
        className="relative overflow-hidden flex flex-col justify-between">
        <ParticleCanvas count={80} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <ParallaxOrb color={`${ORANGE}14`}         size={560} top="-10%" right="-5%"  speed={0.20} />
          <ParallaxOrb color="rgba(16,185,129,0.08)" size={460} bottom="5%" left="-8%"  speed={0.13} />
        </div>

        <div className="flex-1 flex items-center px-4 md:px-6 lg:px-8 relative z-20">
          <div className="mx-auto w-full max-w-[1280px]" style={{ animation: 'fadeInUp 0.7s ease 0.1s both' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ backgroundColor: 'rgba(249,115,22,0.12)', color: ORANGE, border: '1px solid rgba(249,115,22,0.25)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
              Inscription
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-8 max-w-3xl">
              Inscrivez<br />
              <span style={{ color: ORANGE, textShadow: `0 0 60px ${ORANGE}45` }}>votre équipe.</span>
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Remplissez le formulaire pour manifester votre intérêt et rejoindre InnovaSchool dès la 1ère édition.
            </p>
          </div>
        </div>
        <div className="relative z-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', animation: 'fadeIn 0.8s ease 0.9s both' }}>
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-5 flex items-center justify-end">
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>Formulaire →</span>
          </div>
        </div>
      </section>

      {/* ══ 02 — FORM + INFOS ══ */}
      <section style={{ backgroundColor: '#fafaf9', minHeight: '100vh' }} className="flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-14 items-start">

            {/* Infos */}
            <div>
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Informations</p>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight" style={{ color: DARK }}>Ce qu'il faut savoir</h2>
              </Reveal>
              <div className="space-y-3">
                {infos.map((item, i) => (
                  <Reveal key={i} delay={i * 100}>
                    <div className="flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                      style={{ backgroundColor: 'white', border: `1.5px solid ${item.color}20`, boxShadow: `0 2px 12px ${item.color}08` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: item.color + '18', color: item.color }}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm mb-0.5" style={{ color: DARK }}>{item.title}</h4>
                        <p className="text-xs text-stone-500">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={500}>
                <div className="mt-6 rounded-2xl p-5 flex items-center gap-4" style={{ backgroundColor: DARK }}>
                  <div className="flex-1">
                    <p className="text-white text-sm font-bold mb-1">Des questions ?</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Consultez la page "Comment participer" pour plus de détails.</p>
                  </div>
                  <a href="/participer"
                    className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: ORANGE }}>
                    <ArrowRight size={14} className="text-white" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Formulaire */}
            <Reveal delay={200}>
              <div className="bg-white rounded-2xl p-8"
                style={{ border: `1.5px solid rgba(12,27,42,0.10)`, boxShadow: `0 0 0 4px ${ORANGE}06, 0 8px 40px rgba(12,27,42,0.08)` }}>

                {sent ? (
                  <div className="text-center py-14">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ backgroundColor: '#10B98114' }}>
                      <CheckCircle size={40} style={{ color: '#10B981' }} />
                    </div>
                    <h3 className="text-xl font-extrabold mb-2" style={{ color: DARK }}>Message envoyé !</h3>
                    <p className="text-stone-400 text-sm leading-relaxed max-w-xs mx-auto">
                      Nous vous contacterons très bientôt. Merci pour votre intérêt pour InnovaSchool.
                    </p>
                    <div className="mt-8 w-12 h-0.5 rounded-full mx-auto" style={{ backgroundColor: '#10B981' }} />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="mb-2">
                      <h3 className="text-lg font-extrabold" style={{ color: DARK }}>Formulaire de candidature</h3>
                      <p className="text-xs text-stone-400 mt-1">Les champs marqués * sont obligatoires</p>
                    </div>

                    <FloatingField label="Nom & Prénom" name="nom"          type="text"  value={form.nom}          onChange={handleChange} required placeholder="Jean Dupont" />
                    <FloatingField label="Email"         name="email"        type="email" value={form.email}        onChange={handleChange} required placeholder="jean@email.com" />
                    <FloatingField label="Établissement" name="etablissement"type="text"  value={form.etablissement}onChange={handleChange} required placeholder="Nom de votre lycée" />

                    {/* Select pôle */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5">Pôle souhaité</label>
                      <select
                        name="pole"
                        value={form.pole}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          border: `1.5px solid ${form.pole ? '#10B981' : '#e7e5e4'}`,
                          borderRadius: 12,
                          padding: '10px 14px',
                          fontSize: 14,
                          outline: 'none',
                          backgroundColor: form.pole ? 'white' : '#fafaf9',
                          transition: 'border-color 0.2s ease',
                        }}>
                        <option value="">-- Sélectionnez un pôle --</option>
                        <option value="tech">Technologie &amp; Innovation</option>
                        <option value="env">Environnement &amp; Durabilité</option>
                        <option value="agri">Agriculture &amp; Développement</option>
                        <option value="cult">Culture, Histoire &amp; Langues</option>
                      </select>
                    </div>

                    {/* Textarea */}
                    <div style={{ position: 'relative', paddingTop: 10 }}>
                      <label style={{
                        position: 'absolute', left: 14,
                        top: form.message.length > 0 ? 2 : 22,
                        fontSize: form.message.length > 0 ? 10 : 13,
                        fontWeight: form.message.length > 0 ? 600 : 400,
                        color: '#a8a29e',
                        transition: 'all 0.2s ease',
                        pointerEvents: 'none',
                        backgroundColor: 'white',
                        paddingInline: 2,
                        zIndex: 1,
                      }}>
                        Message / Question
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        style={{
                          width: '100%',
                          border: `1.5px solid ${form.message ? '#10B981' : '#e7e5e4'}`,
                          borderRadius: 12,
                          padding: '10px 14px',
                          fontSize: 14,
                          outline: 'none',
                          resize: 'none',
                          backgroundColor: form.message ? 'white' : '#fafaf9',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={e => { e.target.style.borderColor = DARK; e.target.style.boxShadow = `0 0 0 3px ${DARK}08`; }}
                        onBlur={e => { e.target.style.borderColor = form.message ? '#10B981' : '#e7e5e4'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{ backgroundColor: loading ? '#64748b' : DARK, boxShadow: loading ? 'none' : '0 4px 20px rgba(12,27,42,0.25)', cursor: loading ? 'wait' : 'pointer' }}>
                      {loading ? (
                        <>
                          <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                          Envoi en cours...
                        </>
                      ) : (
                        <>Envoyer ma candidature <Send size={14} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes fadeInUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse     { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin      { to{transform:rotate(360deg)} }
      `}</style>
    </main>
  );
}

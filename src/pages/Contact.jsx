import { useState } from 'react';
import { CheckCircle, Award, Users, Target, Calendar, ArrowRight, ArrowLeft, Send, Cpu, Leaf, Sprout, BookOpen, User, Mail, Building, MessageSquare } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import ParticleCanvas from '../components/ParticleCanvas';
import ParallaxOrb from '../components/ParallaxOrb';

const DARK   = '#0C1B2A';
const ORANGE = '#F97316';

/* ── URL de ton Google Apps Script (à remplacer après configuration) ── */
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwRQVurNoTSY0wIvCby3sxC3SWESzUD37atBS9VCVDsbzfS4wO3-WTAikenZ4a_8Df4Bw/exec';

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
  { icon: <Calendar size={18} strokeWidth={1.5} />, title: "Date limite", desc: 'Fin septembre — Phase 0', color: ORANGE },
  { icon: <Users size={18} strokeWidth={1.5} />,   title: "Taille d'équipe", desc: '10 élèves maximum', color: '#10B981' },
  { icon: <Award size={18} strokeWidth={1.5} />,   title: 'Niveau requis', desc: 'Second cycle (Seconde à Terminale)', color: '#7C3AED' },
  { icon: <Target size={18} strokeWidth={1.5} />,  title: '4 pôles', desc: 'Techno · Environnement · Agriculture · Culture', color: '#1D4ED8' },
];

const poles = [
  { value: 'tech',  label: 'Technologie & Innovation',   icon: <Cpu size={20} strokeWidth={1.5} />,      color: '#1D4ED8' },
  { value: 'env',   label: 'Environnement & Durabilité', icon: <Leaf size={20} strokeWidth={1.5} />,     color: '#10B981' },
  { value: 'agri',  label: 'Agriculture & Développement',icon: <Sprout size={20} strokeWidth={1.5} />,   color: '#D97706' },
  { value: 'cult',  label: 'Culture, Histoire & Langues',icon: <BookOpen size={20} strokeWidth={1.5} />, color: '#7C3AED' },
];

/* ── Champ flottant ── */
function FloatingField({ label, name, type = 'text', value, onChange, required, placeholder = '', icon }) {
  const [focused, setFocused] = useState(false);
  const filled   = value.length > 0;
  const elevated = focused || filled;
  const isEmail  = type === 'email';
  const isValid  = filled && (!isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  const isInvalid= filled && !isValid;
  const border   = isInvalid ? '#ef4444' : isValid ? '#10B981' : focused ? DARK : '#e7e5e4';
  const shadow   = focused ? (isInvalid ? '0 0 0 3px rgba(239,68,68,0.10)' : isValid ? '0 0 0 3px rgba(16,185,129,0.10)' : `0 0 0 3px ${DARK}08`) : 'none';

  return (
    <div style={{ position: 'relative', paddingTop: 10 }}>
      <label style={{
        position: 'absolute', left: icon ? 40 : 14,
        top: elevated ? 2 : 24,
        fontSize: elevated ? 10 : 13,
        fontWeight: elevated ? 700 : 400,
        color: focused ? (isInvalid ? '#ef4444' : isValid ? '#10B981' : DARK) : '#a8a29e',
        transition: 'all 0.2s ease',
        pointerEvents: 'none',
        backgroundColor: 'white', paddingInline: 2, borderRadius: 2, zIndex: 1,
      }}>
        {label}{required && ' *'}
      </label>
      {icon && (
        <span style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(10%)',
          color: focused ? DARK : '#a8a29e', transition: 'color 0.2s ease',
        }}>
          {icon}
        </span>
      )}
      <input
        name={name} type={type} value={value} onChange={onChange} required={required}
        placeholder={focused && !filled ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', border: `1.5px solid ${border}`, borderRadius: 12,
          padding: `12px 40px 12px ${icon ? '40px' : '14px'}`,
          fontSize: 14, outline: 'none', transition: 'all 0.2s ease',
          backgroundColor: filled ? 'white' : '#fafaf9', boxShadow: shadow,
        }}
      />
      {filled && (
        <span style={{
          position: 'absolute', right: 14, top: '50%', transform: 'translateY(-20%)',
          fontSize: 13, color: isValid ? '#10B981' : '#ef4444',
        }}>
          {isValid ? '✓' : '✗'}
        </span>
      )}
    </div>
  );
}

/* ── Indicateur d'étapes ── */
function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center gap-2">
            <div style={{
              width: active ? 32 : 28, height: active ? 32 : 28,
              borderRadius: '50%',
              backgroundColor: done ? '#10B981' : active ? DARK : '#e7e5e4',
              color: done || active ? 'white' : '#a8a29e',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700,
              transition: 'all 0.3s ease',
              boxShadow: active ? `0 4px 12px ${DARK}30` : 'none',
            }}>
              {done ? '✓' : i + 1}
            </div>
            {i < total - 1 && (
              <div style={{
                width: 32, height: 2, borderRadius: 1,
                backgroundColor: done ? '#10B981' : '#e7e5e4',
                transition: 'background-color 0.3s ease',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Carte de pôle ── */
function PoleCard({ pole, selected, onClick }) {
  return (
    <button type="button" onClick={() => onClick(pole.value)}
      className="w-full text-left rounded-2xl p-4 transition-all hover:-translate-y-0.5"
      style={{
        border: `2px solid ${selected ? pole.color : '#e7e5e4'}`,
        backgroundColor: selected ? pole.color + '10' : 'white',
        boxShadow: selected ? `0 4px 16px ${pole.color}20` : '0 2px 8px rgba(0,0,0,0.04)',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
      }}>
      <div className="flex items-center gap-3">
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          backgroundColor: selected ? pole.color + '20' : '#f5f5f4',
          color: selected ? pole.color : '#a8a29e',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease',
        }}>
          {pole.icon}
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: selected ? pole.color : DARK, transition: 'color 0.2s ease' }}>
            {pole.label}
          </p>
        </div>
        {selected && (
          <div className="ml-auto">
            <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: pole.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: 11 }}>✓</span>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

export default function Contact() {
  const [step,    setStep]    = useState(0);
  const [dir,     setDir]     = useState(1);   // 1 = forward, -1 = backward
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [form,    setForm]    = useState({
    nom: '', email: '', etablissement: '', nombreEleves: '',
    pole: '', message: '',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const setPole      = v => setForm({ ...form, pole: v });

  const next = () => { setDir(1);  setStep(s => s + 1); };
  const prev = () => { setDir(-1); setStep(s => s - 1); };

  /* Validation par étape */
  const canNext0 = form.nom && form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.etablissement;
  const canNext1 = form.pole;

  /* Envoi vers Google Sheets */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode:   'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          date:          new Date().toLocaleString('fr-FR'),
          nom:           form.nom,
          email:         form.email,
          etablissement: form.etablissement,
          nombreEleves:  form.nombreEleves,
          pole:          poles.find(p => p.value === form.pole)?.label || form.pole,
          message:       form.message,
        }),
      });
    } catch (_) { /* no-cors ignore les erreurs CORS normalement */ }
    setLoading(false);
    setSent(true);
  };

  const selectedPole = poles.find(p => p.value === form.pole);

  /* ── Contenu des étapes ── */
  const steps = [

    /* Étape 1 — L'équipe */
    <div key="step0">
      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ORANGE }}>Étape 1 sur 3</p>
      <h3 className="text-lg font-extrabold mb-1" style={{ color: DARK }}>Votre équipe</h3>
      <p className="text-xs text-stone-400 mb-6">Informations sur le responsable de l'équipe</p>
      <div className="space-y-4">
        <FloatingField label="Nom & Prénom"  name="nom"          type="text"  value={form.nom}          onChange={handleChange} required placeholder="Jean Dupont"      icon={<User size={15} />} />
        <FloatingField label="Email"          name="email"        type="email" value={form.email}        onChange={handleChange} required placeholder="jean@email.com"   icon={<Mail size={15} />} />
        <FloatingField label="Établissement" name="etablissement" type="text"  value={form.etablissement}onChange={handleChange} required placeholder="Nom de votre lycée" icon={<Building size={15} />} />
        <div>
          <label className="block text-xs font-semibold text-stone-500 mb-1.5">Nombre d'élèves dans l'équipe</label>
          <select name="nombreEleves" value={form.nombreEleves} onChange={handleChange}
            style={{ width: '100%', border: `1.5px solid ${form.nombreEleves ? '#10B981' : '#e7e5e4'}`, borderRadius: 12, padding: '12px 14px', fontSize: 14, outline: 'none', backgroundColor: form.nombreEleves ? 'white' : '#fafaf9' }}>
            <option value="">-- Sélectionner --</option>
            {[5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} élèves</option>)}
          </select>
        </div>
      </div>
      <button onClick={next} disabled={!canNext0}
        className="w-full mt-6 py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        style={{ backgroundColor: canNext0 ? DARK : '#d6d3d1', cursor: canNext0 ? 'pointer' : 'not-allowed', boxShadow: canNext0 ? '0 4px 20px rgba(12,27,42,0.20)' : 'none' }}>
        Continuer <ArrowRight size={14} />
      </button>
    </div>,

    /* Étape 2 — Le projet */
    <div key="step1">
      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ORANGE }}>Étape 2 sur 3</p>
      <h3 className="text-lg font-extrabold mb-1" style={{ color: DARK }}>Votre projet</h3>
      <p className="text-xs text-stone-400 mb-6">Choisissez votre pôle et décrivez votre idée</p>
      <div className="space-y-3 mb-5">
        {poles.map(p => (
          <PoleCard key={p.value} pole={p} selected={form.pole === p.value} onClick={setPole} />
        ))}
      </div>
      <div style={{ position: 'relative', paddingTop: 10 }}>
        <label style={{
          position: 'absolute', left: 14,
          top: form.message ? 2 : 22,
          fontSize: form.message ? 10 : 13,
          fontWeight: form.message ? 700 : 400,
          color: '#a8a29e', transition: 'all 0.2s ease',
          pointerEvents: 'none', backgroundColor: 'white', paddingInline: 2, zIndex: 1,
        }}>
          Description de votre idée de projet
        </label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={3}
          onFocus={e => { e.target.style.borderColor = DARK; e.target.style.boxShadow = `0 0 0 3px ${DARK}08`; }}
          onBlur={e => { e.target.style.borderColor = form.message ? '#10B981' : '#e7e5e4'; e.target.style.boxShadow = 'none'; }}
          style={{ width: '100%', border: `1.5px solid ${form.message ? '#10B981' : '#e7e5e4'}`, borderRadius: 12, padding: '12px 14px', fontSize: 14, outline: 'none', resize: 'none', backgroundColor: form.message ? 'white' : '#fafaf9', transition: 'border-color 0.2s ease' }} />
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={prev}
          className="flex-none px-4 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all hover:bg-stone-100"
          style={{ color: DARK, border: '1.5px solid #e7e5e4' }}>
          <ArrowLeft size={14} /> Retour
        </button>
        <button onClick={next} disabled={!canNext1}
          className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: canNext1 ? DARK : '#d6d3d1', cursor: canNext1 ? 'pointer' : 'not-allowed', boxShadow: canNext1 ? '0 4px 20px rgba(12,27,42,0.20)' : 'none' }}>
          Continuer <ArrowRight size={14} />
        </button>
      </div>
    </div>,

    /* Étape 3 — Récapitulatif */
    <div key="step2">
      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ORANGE }}>Étape 3 sur 3</p>
      <h3 className="text-lg font-extrabold mb-1" style={{ color: DARK }}>Récapitulatif</h3>
      <p className="text-xs text-stone-400 mb-6">Vérifiez vos informations avant d'envoyer</p>

      <div className="space-y-3 mb-6">
        {/* Infos équipe */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: '#fafaf9', border: '1.5px solid #e7e5e4' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: DARK + '80' }}>L'équipe</p>
          <div className="space-y-2">
            {[
              { label: 'Responsable', value: form.nom },
              { label: 'Email',       value: form.email },
              { label: 'Lycée',       value: form.etablissement },
              { label: 'Effectif',    value: form.nombreEleves ? `${form.nombreEleves} élèves` : '—' },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-xs text-stone-400">{r.label}</span>
                <span className="text-xs font-semibold" style={{ color: DARK }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pôle */}
        {selectedPole && (
          <div className="rounded-2xl p-4 flex items-center gap-3"
            style={{ backgroundColor: selectedPole.color + '10', border: `1.5px solid ${selectedPole.color}30` }}>
            <div style={{ color: selectedPole.color }}>{selectedPole.icon}</div>
            <div>
              <p className="text-xs font-bold" style={{ color: selectedPole.color }}>Pôle choisi</p>
              <p className="text-sm font-extrabold" style={{ color: DARK }}>{selectedPole.label}</p>
            </div>
          </div>
        )}

        {/* Message */}
        {form.message && (
          <div className="rounded-2xl p-4" style={{ backgroundColor: '#fafaf9', border: '1.5px solid #e7e5e4' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: DARK + '80' }}>Idée de projet</p>
            <p className="text-xs text-stone-500 leading-relaxed">{form.message}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={prev}
          className="flex-none px-4 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all hover:bg-stone-100"
          style={{ color: DARK, border: '1.5px solid #e7e5e4' }}>
          <ArrowLeft size={14} /> Retour
        </button>
        <button onClick={handleSubmit} disabled={loading}
          className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: loading ? '#64748b' : ORANGE, boxShadow: loading ? 'none' : `0 4px 20px ${ORANGE}45`, cursor: loading ? 'wait' : 'pointer' }}>
          {loading ? (
            <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> Envoi...</>
          ) : (
            <>Envoyer ma candidature <Send size={14} /></>
          )}
        </button>
      </div>
    </div>,
  ];

  return (
    <main>

      {/* ══ HERO ══ */}
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
              Remplissez le formulaire en 3 étapes pour rejoindre InnovaSchool dès la 1ère édition.
            </p>
          </div>
        </div>
        <div className="relative z-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', animation: 'fadeIn 0.8s ease 0.9s both' }}>
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-5 flex items-center justify-end">
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>Formulaire →</span>
          </div>
        </div>
      </section>

      {/* ══ FORM + INFOS ══ */}
      <section style={{ backgroundColor: '#fafaf9', minHeight: '100vh' }} className="flex items-center">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-14 items-start">

            {/* Infos */}
            <div>
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>Informations</p>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight" style={{ color: DARK }}>Ce qu'il faut savoir</h2>
              </Reveal>
              <div className="space-y-3 mb-6">
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
              <Reveal delay={450}>
                <div className="rounded-2xl p-5 flex items-center gap-4" style={{ backgroundColor: DARK }}>
                  <div className="flex-1">
                    <p className="text-white text-sm font-bold mb-1">Des questions ?</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Consultez "Comment participer" pour plus de détails.</p>
                  </div>
                  <a href="/participer" className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: ORANGE }}>
                    <ArrowRight size={14} className="text-white" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Formulaire multi-step */}
            <Reveal delay={200}>
              <div className="bg-white rounded-3xl p-8"
                style={{ border: `1.5px solid rgba(12,27,42,0.10)`, boxShadow: `0 0 0 4px ${ORANGE}06, 0 8px 40px rgba(12,27,42,0.08)` }}>

                {sent ? (
                  /* ── Succès ── */
                  <div className="text-center py-10" style={{ animation: 'fadeInUp 0.5s ease both' }}>
                    <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ backgroundColor: '#10B98112', boxShadow: '0 0 0 8px rgba(16,185,129,0.06)' }}>
                      <CheckCircle size={44} style={{ color: '#10B981' }} />
                    </div>
                    <h3 className="text-2xl font-extrabold mb-2" style={{ color: DARK }}>Candidature envoyée !</h3>
                    <p className="text-stone-400 text-sm leading-relaxed max-w-xs mx-auto mb-6">
                      Nous avons bien reçu la candidature de <strong style={{ color: DARK }}>{form.nom}</strong>. Nous vous contacterons très bientôt.
                    </p>
                    {selectedPole && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
                        style={{ backgroundColor: selectedPole.color + '15', color: selectedPole.color, border: `1px solid ${selectedPole.color}30` }}>
                        {selectedPole.icon} {selectedPole.label}
                      </div>
                    )}
                    <div className="w-12 h-0.5 rounded-full mx-auto" style={{ backgroundColor: '#10B981' }} />
                  </div>
                ) : (
                  <>
                    <StepIndicator current={step} total={3} />
                    {/* Barre de progression */}
                    <div className="rounded-full mb-6 overflow-hidden" style={{ height: 3, backgroundColor: '#f5f5f4' }}>
                      <div style={{
                        height: '100%',
                        width: `${((step + 1) / 3) * 100}%`,
                        backgroundColor: ORANGE,
                        borderRadius: 4,
                        transition: 'width 0.4s ease',
                        boxShadow: `0 0 8px ${ORANGE}60`,
                      }} />
                    </div>
                    {/* Slide animé */}
                    <div key={step} style={{ animation: `slideIn${dir > 0 ? 'Right' : 'Left'} 0.35s ease both` }}>
                      {steps[step]}
                    </div>
                  </>
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
        @keyframes slideInRight { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInLeft  { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </main>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Target, Users, BarChart2, Award } from 'lucide-react';

const DARK   = '#0C1B2A';
const ORANGE = '#F97316';

const stats = [
  { icon: <Target size={22} strokeWidth={1.5} />,   value: 4,   suffix: '',    label: 'Pôles thématiques',  color: ORANGE },
  { icon: <Users size={22} strokeWidth={1.5} />,    value: 10,  suffix: ' max',label: 'Élèves par équipe',  color: '#10B981' },
  { icon: <BarChart2 size={22} strokeWidth={1.5} />,value: 3,   suffix: '',    label: 'Phases de concours', color: '#7C3AED' },
  { icon: <Award size={22} strokeWidth={1.5} />,    value: 1,   suffix: 'ère', label: 'Grande finale',       color: '#1D4ED8' },
];

function Counter({ target, suffix, duration = 1400 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      /* Ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsCounter() {
  return (
    <section style={{ backgroundColor: DARK }} className="relative overflow-hidden">
      {/* Ligne déco */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)' }} />

      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i}
              className="group rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg cursor-default"
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: `1px solid ${s.color}22` }}>

              {/* Icône */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: s.color + '20', color: s.color }}>
                {s.icon}
              </div>

              {/* Valeur */}
              <div className="text-4xl font-extrabold mb-1 tabular-nums"
                style={{ color: s.color, textShadow: `0 0 30px ${s.color}40` }}>
                <Counter target={s.value} suffix={s.suffix} duration={1200 + i * 150} />
              </div>

              {/* Label */}
              <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.40)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)' }} />
    </section>
  );
}

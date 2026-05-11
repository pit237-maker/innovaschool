import { useEffect, useRef } from 'react';

export default function ParticleCanvas({ count = 90 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let particles = [];
    let scrollY = 0;
    let mouse = { x: -9999, y: -9999 };

    /* ── Resize ── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Particules ── */
    const spawn = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x, y,
          ox: x, oy: y,                        // position d'origine
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r:  Math.random() * 1.6 + 0.8,
          // couleur : majority blanches, quelques-unes orangées
          orange: Math.random() < 0.25,
        });
      }
    };
    spawn();

    /* ── Scroll ── */
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Souris ── */
    const onMouse = e => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse = { x: -9999, y: -9999 }; };
    canvas.parentElement?.addEventListener('mousemove', onMouse);
    canvas.parentElement?.addEventListener('mouseleave', onLeave);

    /* ── Loop ── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollRatio = Math.min(scrollY / (canvas.height * 0.8), 1);
      const CONNECT_DIST = 130;
      const REPEL_DIST   = 110;
      const REPEL_FORCE  = 2.2;

      particles.forEach(p => {
        /* Mouvement de base */
        p.x += p.vx;
        p.y += p.vy - scrollRatio * 1.2;   // dérive vers le haut au scroll

        /* Répulsion souris */
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < REPEL_DIST && md > 0) {
          const f = ((REPEL_DIST - md) / REPEL_DIST) * REPEL_FORCE;
          p.x += (mdx / md) * f;
          p.y += (mdy / md) * f;
        }

        /* Wrap toroïdal */
        if (p.x < -10) p.x = canvas.width  + 10;
        if (p.x > canvas.width  + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        /* Opacité diminue avec le scroll */
        const alpha = (1 - scrollRatio * 0.8) * (p.orange ? 0.75 : 0.55);

        /* Point */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.orange
          ? `rgba(249,115,22,${alpha})`
          : `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      /* Lignes de connexion */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const strength = (1 - d / CONNECT_DIST) * (1 - scrollRatio * 0.9);
            const isOrange = particles[i].orange || particles[j].orange;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isOrange
              ? `rgba(249,115,22,${strength * 0.30})`
              : `rgba(255,255,255,${strength * 0.12})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      canvas.parentElement?.removeEventListener('mousemove', onMouse);
      canvas.parentElement?.removeEventListener('mouseleave', onLeave);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width:  '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

import { useEffect, useRef } from 'react';

/**
 * Orbe décoratif avec effet parallax au scroll.
 * À placer à l'intérieur d'un parent en `position: relative / absolute`.
 *
 * Props :
 *  color   – couleur CSS du dégradé radial (ex: "rgba(29,78,216,0.20)")
 *  size    – diamètre en px (défaut 500)
 *  speed   – intensité parallax, 0 = aucun, 0.25 = doux (défaut 0.2)
 *  top / left / right / bottom – positionnement CSS (string, ex: "-10%")
 */
export default function ParallaxOrb({
  color = 'rgba(249,115,22,0.15)',
  size = 500,
  speed = 0.2,
  top, left, right, bottom,
}) {
  const ref = useRef(null);

  useEffect(() => {
    let rafId;

    const update = () => {
      const el = ref.current;
      if (!el) return;
      // Cherche la section parente comme repère
      const section = el.closest('section') || el.parentElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionCenter  = rect.top  + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (viewportCenter - sectionCenter) * speed;
      el.style.transform = `translateY(${offset}px)`;
    };

    const handler = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handler, { passive: true });
    update(); // position initiale

    return () => {
      window.removeEventListener('scroll', handler);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  const pos = {};
  if (top    !== undefined) pos.top    = top;
  if (left   !== undefined) pos.left   = left;
  if (right  !== undefined) pos.right  = right;
  if (bottom !== undefined) pos.bottom = bottom;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        width:  size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        pointerEvents: 'none',
        willChange: 'transform',
        ...pos,
      }}
    />
  );
}

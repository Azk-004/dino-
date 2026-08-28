import { useEffect, useRef } from 'react';

/**
 * Progression de scroll globale (0 = haut de page, 1 = bas de page),
 * exposée comme une ref pour être lue à 60fps dans une boucle useFrame
 * sans déclencher de re-render React à chaque pixel scrollé.
 */
export function useScrollProgress() {
  const progressRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progressRef;
}

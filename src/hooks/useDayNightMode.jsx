import { createContext, useContext, useEffect, useState } from 'react';

// Petit contexte global pour le mode "matin / soir" du boulevard 3D.
// N'affecte que l'ambiance de la scène (lumières, ciel, brouillard) -
// les couleurs de marque (panneaux, texte, palette Tailwind) ne bougent pas.
const DayNightContext = createContext(null);

export function DayNightProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') return 'night';
    return localStorage.getItem('panotik-mode') === 'day' ? 'day' : 'night';
  });

  useEffect(() => {
    try {
      localStorage.setItem('panotik-mode', mode);
    } catch {
      // stockage indisponible (mode privé, quota…) : on ignore simplement
    }
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.mode = mode;
    }
  }, [mode]);

  const toggle = () => setMode((m) => (m === 'night' ? 'day' : 'night'));

  return <DayNightContext.Provider value={{ mode, toggle }}>{children}</DayNightContext.Provider>;
}

export function useDayNightMode() {
  const ctx = useContext(DayNightContext);
  if (!ctx) {
    throw new Error('useDayNightMode doit être utilisé à l’intérieur de <DayNightProvider>');
  }
  return ctx;
}

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

const ThemeContext = createContext(null);

const THEME_KEY = "pnt-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "night";
    } catch {
      return "night";
    }
  });
  const [transitioning, setTransitioning] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTransitioning(true);
    setTheme((t) => (t === "night" ? "day" : "night"));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setTransitioning(false), 1600);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ThemeContext.Provider value={{ theme, transitioning, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

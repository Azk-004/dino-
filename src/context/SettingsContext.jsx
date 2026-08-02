import { createContext, useContext, useEffect, useState, useCallback } from "react";

const SettingsContext = createContext(null);

const KEY = "pnt-settings";

const FONT_SIZES = { s: 1, m: 1.125, l: 1.3, xl: 1.45 };
const LINE_HEIGHTS = { compact: 1.55, normal: 1.8, relaxed: 2.1 };
const FONT_FAMILIES = {
  sans: "'Space Grotesk', system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  dyslexic: "'OpenDyslexic', 'Space Grotesk', system-ui, sans-serif",
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw
        ? { ...{ fontSize: "m", lineHeight: "normal", fontFamily: "sans" }, ...JSON.parse(raw) }
        : { fontSize: "m", lineHeight: "normal", fontFamily: "sans" };
    } catch {
      return { fontSize: "m", lineHeight: "normal", fontFamily: "sans" };
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--reader-size", FONT_SIZES[settings.fontSize]);
    root.style.setProperty("--reader-line", LINE_HEIGHTS[settings.lineHeight]);
    root.style.setProperty("--reader-font", FONT_FAMILIES[settings.fontFamily]);
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const set = useCallback((patch) => setSettings((s) => ({ ...s, ...patch })), []);

  return (
    <SettingsContext.Provider value={{ settings, set }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export { FONT_SIZES, LINE_HEIGHTS, FONT_FAMILIES };

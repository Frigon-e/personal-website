import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readCookieTheme(): Theme | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )theme=(light|dark)/);
  return match ? (match[1] as Theme) : null;
}

function writeCookieTheme(t: Theme) {
  try {
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `theme=${t}; Path=/; Max-Age=${oneYear}; SameSite=Lax`;
  } catch {}
}

function getPreferredTheme(): Theme {
  try {
    const cookie = readCookieTheme();
    if (cookie === "light" || cookie === "dark") return cookie;
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  if (typeof window !== "undefined" && window.matchMedia) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getPreferredTheme());

  const applyThemeClass = useCallback((t: Theme) => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      (root.style as any).colorScheme = 'dark';
    } else {
      root.classList.remove("dark");
      (root.style as any).colorScheme = 'light';
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem("theme", t); } catch {}
    writeCookieTheme(t);
    applyThemeClass(t);
  }, [applyThemeClass]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  useLayoutEffect(() => {
    applyThemeClass(theme);
  }, [theme, applyThemeClass]);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

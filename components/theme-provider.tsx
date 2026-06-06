"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ThemeContextValue = {
  dark: boolean;
  mounted: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = localStorage.getItem("theme");
    const initialDark = storedTheme ? storedTheme === "dark" : media.matches;
    const frame = window.requestAnimationFrame(() => {
      if (!mountedRef.current) return;
      setDark(initialDark);
      setMounted(true);
    });

    const handleSystemTheme = (event: MediaQueryListEvent) => {
      if (!mountedRef.current || localStorage.getItem("theme")) return;
      setDark(event.matches);
    };

    media.addEventListener("change", handleSystemTheme);
    return () => {
      mountedRef.current = false;
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", handleSystemTheme);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  return (
    <ThemeContext.Provider
      value={{ dark, mounted, toggleTheme: () => setDark((value) => !value) }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

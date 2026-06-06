"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { dark, mounted, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      disabled={!mounted}
      aria-label="تبديل المظهر"
      className={`grid size-10 place-items-center rounded-xl border border-ui surface transition hover:border-brand/50 disabled:cursor-wait ${className}`}
    >
      <span className={mounted ? "opacity-100" : "opacity-0"}>
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  );
}

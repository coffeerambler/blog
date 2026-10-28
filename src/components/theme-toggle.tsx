"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  try {
    localStorage.setItem("cr-theme", theme);
  } catch {
    /* ignore */
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  const toLight = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex size-8 items-center justify-center rounded-md text-cream/45 transition-colors hover:text-amber ${className}`}
      aria-label={toLight ? "Switch to light mode" : "Switch to dark mode"}
      title={toLight ? "Light mode" : "Dark mode"}
    >
      {toLight ? <Sun className="size-3.5" strokeWidth={1.75} /> : <Moon className="size-3.5" strokeWidth={1.75} />}
    </button>
  );
}

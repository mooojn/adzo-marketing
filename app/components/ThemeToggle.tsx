"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100/50 dark:bg-gray-800/50 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${theme === "dark" ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
            }`}
        >
          <Sun className="w-5 h-5 text-amber-500 fill-amber-500/10" />
        </div>
        <div
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${theme === "dark" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
        >
          <Moon className="w-5 h-5 text-indigo-400 fill-indigo-400/10" />
        </div>
      </div>

      {/* Background Glow */}
      <span className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
    </button>
  );
}

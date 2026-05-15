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

  const toggleTheme = (e: React.MouseEvent) => {
    const isDark = theme === "dark";
    const newTheme = isDark ? "light" : "dark";

    // Fallback for browsers that don't support view transitions
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            theme === "dark" ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <Sun className="w-5 h-5 text-amber-500 fill-amber-500/10" />
        </div>
        <div
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            theme === "dark" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
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

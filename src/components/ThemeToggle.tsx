"use client";

import { useTheme } from "next-themes";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`group relative inline-flex h-7 w-[52px] shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isDark ? "border-border bg-secondary" : "border-foreground/20 bg-muted"
      } ${className}`}
    >
      <span
        className={`pointer-events-none block h-5 w-5 rounded-full shadow-md transition-transform duration-200 ${
          isDark ? "translate-x-[26px]" : "translate-x-[3px]"
        }`}
        style={{
          background: "linear-gradient(135deg, hsl(220 70% 55%), hsl(270 60% 55%))",
        }}
      />
    </button>
  );
};

export default ThemeToggle;

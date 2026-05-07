"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={setTheme.bind(null, theme === "dark" ? "light" : "dark")}
      className="
    p-2 rounded-md border border-outline-variant
    hover:bg-surface-high transition text-on-surface
  "
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

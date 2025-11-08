"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="cursor-pointer w-[70px] h-[30px] rounded-[15px] bg-[var(--color-secondary)] relative shadow-[0_0_8px_rgba(0,0,0,0.25),inset_0_2px_5px_rgba(0,0,0,0.25)] transition-all duration-300"
    >
      <span
        className={`absolute top-[4px] left-[4px] w-[22px] h-[22px] flex items-center justify-center rounded-full bg-white transition-all duration-300 ${
          isDark ? "translate-x-[40px] text-[#1e3a8a]" : "text-[#9EA12D]"
        }`}
      >
        {isDark ? <Moon size={16} className="animate-pulse" /> : <Sun size={16} className="animate-pulse" />}
      </span>
    </button>
  );
}

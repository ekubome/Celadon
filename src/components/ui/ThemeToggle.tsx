"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { siteConfig } from "@/lib/config";

type Theme = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(siteConfig.theme.storageKey) as Theme;
    if (stored) {
      setTheme(stored);
    } else {
      setTheme(siteConfig.theme.defaultTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let effectiveTheme: "light" | "dark";
    if (theme === "system") {
      effectiveTheme = systemDark ? "dark" : "light";
    } else {
      effectiveTheme = theme;
    }

    if (effectiveTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem(siteConfig.theme.storageKey, theme);

    // Dispatch custom event for components like Comments
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: { theme: effectiveTheme } })
    );
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        const root = document.documentElement;
        if (mediaQuery.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
        window.dispatchEvent(
          new CustomEvent("theme-change", {
            detail: { theme: mediaQuery.matches ? "dark" : "light" },
          })
        );
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <button className="p-2 text-gray-500 rounded-full" aria-label="主题切换">
        <Monitor className="w-5 h-5" />
      </button>
    );
  }

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-5 h-5" />;
      case "dark":
        return <Moon className="w-5 h-5" />;
      case "system":
        return <Monitor className="w-5 h-5" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "浅色模式";
      case "dark":
        return "深色模式";
      case "system":
        return "跟随系统";
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
}

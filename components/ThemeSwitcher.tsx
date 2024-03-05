"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import { MoonLightModeIcon, MoonDarkModeIcon } from "./Icons";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="flex items-center gap-2 py-2 transition-all hover:font-semibold"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "theme",
            theme === "dark" ? "light" : "dark",
          );
        }
      }}
      aria-pressed={theme === "dark"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <MoonLightModeIcon /> : <MoonDarkModeIcon />}
      <span aria-hidden>Dark Mode</span>
    </button>
  );
};

export default ThemeSwitcher;

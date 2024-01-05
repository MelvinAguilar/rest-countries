"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import { MoonLightModeIcon, MoonDarkModeIcon } from "./Icons";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="interactive flex items-center gap-2 px-4 py-2 shadow-lg"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "theme",
            theme === "dark" ? "light" : "dark",
          );
        }
      }}
    >
      {theme === "dark" ? <MoonLightModeIcon /> : <MoonDarkModeIcon />}
      <span>Dark Mode</span>
    </button>
  );
};

export default ThemeSwitcher;

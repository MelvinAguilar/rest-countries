"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import { MoonIcon } from "./Icons";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const keyProps = theme === "dark" ? { fill: "#fff" } : {};

  return (
    <button
      className="flex items-center gap-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <MoonIcon width={16} height={16} {...keyProps} />
      <span>Dark Mode</span>
    </button>
  );
};

export default ThemeSwitcher;

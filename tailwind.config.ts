import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0px 0px 7px 2px rgba(0, 0, 0, 0.03)",
        searchbar: "0px 2px 9px 0px rgba(0, 0, 0, 0.05)",
      },
      backgroundColor: {
        dark: "#202C36",
        "dark-secondary": "#2B3844",
        light: "#fff",
      },
    },
  },
  plugins: [],
};
export default config;

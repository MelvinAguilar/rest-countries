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
      screens: {
        xs: "30rem",
        sm: "40rem",
        md: "48rem",
        lg: "64rem",
        xl: "80rem",
      },
      fontFamily: {
        sans: ["var(--font-nunito-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0rem 0rem 0.4375rem 0.125rem rgba(0, 0, 0, 0.03)",
        searchbar: "0rem 0.125rem 0.5625rem 0rem rgba(0, 0, 0, 0.05)",
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

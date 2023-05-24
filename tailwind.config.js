/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      purple: "#8257e6",
      purple100: "#7465d4",
      white: "#FFF",
      gray900: "#121214",
      gray800: "#202024",
      gray300: "#c4c4cc",
      gray100: "#e1e1e6",

      green500: "#00875f",
      green300: "#00b37e",
      green200: "#1ea483",
      black600: "rgba(0,0,0,0.6)",
    },
    maxWidth: {
      shopScreen: "calc(100vw - ((100vw - 1180px) / 2 ))",
    },
    minHeight: {
      shopScreen: 656,
    },
    fontSize: {
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem",
    },
    translate: {
      outWindow: "110%",
      inWindow: "0%",
    },
    extend: {},
  },
  plugins: [],
};

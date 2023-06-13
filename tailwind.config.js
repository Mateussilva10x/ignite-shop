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
    extend: {
      fontSize: {
        md: "1.125rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      maxWidth: {
        shopScreen: "calc(100vw - ((100vw - 1180px) / 2 ))",
        successScreen: 130,
      },
      minHeight: {
        successScreen: 145,
        shopScreen: 656,
      },
      height: {
        product: "656px",
      },
      translate: {
        outWindow: "110%",
        inWindow: "0%",
      },
      gridTemplateColumns: {
        shop: "1fr 1fr",
      },
    },
  },
  plugins: [],
};

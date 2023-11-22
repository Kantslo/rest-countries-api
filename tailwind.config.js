/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        nunito: "nunito",
      },
    },
  },
  plugins: [],
};

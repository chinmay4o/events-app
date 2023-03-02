/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      mymd: "900px",
      lg: "1024px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Montserrat", "Open-Sans", "sans-serif"],
    },
    fontSize: {
      sm: "12px",
      base: "16px",
      xl: "30px",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      ringOffsetWidth: {
        3: "0px",
        6: "0px",
        10: "0px",
      },
      screens: {
        mymd: "900px",
      },
      spacing: {
        // 20px
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        sm: "10px",
        // "4xl": "2rem",
      },
      colors: {
        primary: { DEFAULT: "#A55EEA", dark: "#273444" },
        secondary: { DEFAULT: "#ff49db", dark: "#273444" },
        transparent: "transparent",
        current: "currentColor",
        // white:
        //off-white:
        // success:
        // warning:
        danger: { DEFAULT: "#E74C3C" },
        // primary-bg:
      },
      boxShadow: {
        sm: "0px 2px 4px 0px rgba(11,10, 55, 0.15)",
        lg: "0px 2px 4px 0px rgba(18,16, 99, 0.06)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar-hide")],
};

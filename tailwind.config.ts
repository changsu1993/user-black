import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./src/**/*.{ts,tsx}",
  ],
  plugins:[
    require('flowbite/plugin')
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        accent: "#28A7E1",
        danger: "#F35C5C",
        red: "#FF0000",
        secondary: "#ACACAC",
        dark: "#141414",
        dark33: "#333",
        dark3C: "#3A3A3C",
        "dark-gray": "#4A4E57",
        d9gray: "#D9D9D9",
        d1gray: "#D1D1D1",
        "9egray": "#93979E",
        c8gray: "#C8C8C8",
        f6gray: "#F1F3F6",
        f1gray: "#F1F1F1",
        "5dgray": "#4B505D",
        b7gray: "#B7B7B7",
        fagray: "#FAFAFA",
        a1gray: "#A1A1A1",
        abgray: "#A3A6AB",
      },
      screens: {
        md: "892px",
        md2: "1010px",
        sm2: "380px",
        phone: "540px",
        phone2: "450px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideIn: "slideIn 0.5s ease-in-out forwards",
        slideOut: "slideOut 0.5s ease-in-out forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
};
export default config;

import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      spacing: {
        "admin-sidebar": "var(--admin-sidebar-width)",
        screenMinusNavbar: "calc(100dvh - 90px)",
      },
    },
  },
  plugins: [nextui()],
};

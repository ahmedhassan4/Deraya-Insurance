import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: colors.white,

        foreground: colors.gray[600],

        muted: colors.gray[200],

        primary: {
          lighter: colors.gray[200],
          DEFAULT: "#B5BE34",
          dark: colors.gray[950],
          foreground: colors.white,
        },

        secondary: {
          lighter: colors.indigo[200],
          DEFAULT: colors.indigo[500],
          dark: colors.indigo[700],
          foreground: colors.white,
        },

        red: {
          lighter: colors.rose[200],
          DEFAULT: colors.rose[500],
          dark: colors.rose[700],
        },

        orange: {
          lighter: colors.amber[200],
          DEFAULT: colors.amber[500],
          dark: colors.amber[700],
        },

        blue: {
          lighter: colors.sky[200],
          DEFAULT: colors.sky[500],
          dark: colors.sky[700],
        },

        green: {
          lighter: colors.emerald[200],
          DEFAULT: colors.emerald[500],
          dark: colors.emerald[700],
        },
      },
    },
  },
  plugins: [forms],
} satisfies Config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          dark: '#000000',
        },
        foreground: {
          light: '#000000',
          dark: '#ffffff',
        },
        screens: {
          'xs': {'max': '550px'},
        },
      },
      backgroundColor: {
        primary: 'rgb(var(--color-background))',
      },
      textColor: {
        primary: 'rgb(var(--color-foreground))',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite'
      }
    },
  },
  plugins: [],
} satisfies Config;

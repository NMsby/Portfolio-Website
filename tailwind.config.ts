import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Our custom color scheme
        primary: "var(--color-primary)",      // Deep Purple
        secondary: "var(--color-secondary)",  // Indigo Purple
        accent: "var(--color-accent)",        // Dusty Mauve
        interactive: "var(--color-interactive)", // Warm Rose
        background: "var(--color-background)", // Soft Cream

        // Keep existing colors if needed
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // Our typography configuration
        primary: ["var(--font-primary)", ...fontFamily.sans],
        secondary: ["var(--font-secondary)", ...fontFamily.sans],
      },
      fontSize: {
        // Custom font sizes if needed
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
    },
  },
  plugins: [],
} satisfies Config;
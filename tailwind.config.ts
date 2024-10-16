/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media", // Enable dark mode by adding the "dark" class
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
        slideUp: "slideUp 0.5s ease-in-out forwards",
      },
      boxShadow: {
        "custom-light": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0 4px 6px rgba(255, 255, 255, 0.8)", // Stronger shadow for dark mode
      },
      colors: {
        border: "var(--border)", // CSS variable for borders
        input: "var(--input)", // CSS variable for input backgrounds
        ring: "var(--ring)", // CSS variable for rings
        background: {
          DEFAULT: "var(--background)", // Default background (light mode)
          dark: "var(--background-dark)", // Background in dark mode
        },
        foreground: {
          DEFAULT: "var(--foreground)", // Default text color (light mode)
          dark: "var(--foreground-dark)", // Text color in dark mode
        },
        primary: {
          DEFAULT: "var(--primary)", // Primary color (orange)
          foreground: "var(--primary-foreground)", // Text on primary (light/dark)
        },
        secondary: {
          DEFAULT: "var(--secondary)", // Secondary color (light grey)
          foreground: "var(--secondary-foreground)", // Text on secondary (light/dark)
        },
        destructive: {
          DEFAULT: "var(--destructive)", // Destructive color (red)
          foreground: "var(--destructive-foreground)", // Text on destructive actions
        },
        muted: {
          DEFAULT: "var(--muted)", // Muted elements color
          foreground: "var(--muted-foreground)", // Text on muted elements
        },
        accent: {
          DEFAULT: "var(--accent)", // Accent color (orange)
          foreground: "var(--accent-foreground)", // Text on accent elements
        },
        popover: {
          DEFAULT: "var(--popover)", // Popover background
          foreground: "var(--popover-foreground)", // Text on popover
        },
        card: {
          DEFAULT: "var(--card)", // Card background
          foreground: "var(--card-foreground)", // Text on cards
        },
      },
      borderRadius: {
        lg: "var(--radius)", // Use CSS variable for border-radius
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

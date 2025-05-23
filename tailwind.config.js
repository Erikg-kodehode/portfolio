/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        'blue-25': '#f5f8ff',
        'green-white': '#e6ffe6', // Subtle green-tinted white for dark mode
        'slate': {
          50: '#f8f9fb', // Softer white for light mode
          100: '#f1f3f8', // Less bright background
        },
      },
      backgroundColor: {
        'dark-gradient-start': '#1a1f2e',
        'dark-gradient-end': '#111827',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}

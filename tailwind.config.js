/** @type {import('tailwindcss').Config} */
module.exports = {
          content: [
            './app/**/*.{js,ts,jsx,tsx,mdx}',
            './components/**/*.{js,ts,jsx,tsx,mdx}',
            './features/**/*.{js,ts,jsx,tsx,mdx}'
          ],
  darkMode: 'class',
  theme: {
    extend: {
              boxShadow: {
                'glow-sm': '0 0 4px rgba(59, 130, 246, 0.5)',
                'theme': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'theme-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)'
              },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'skill-dot': 'skillDot 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.9) rotate(-20deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0)' },
        },
        skillDot: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      colors: {
        'blue-25': '#f5f8ff',
        'slate': {
          50: '#f8f9fb',
          100: '#f1f3f8',
        },
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

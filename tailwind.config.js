/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['var(--font-handwriting)', 'cursive'],
      },
      animation: {
        'flash': 'flash 4s ease-in-out forwards',
        'fadeToBlack': 'fadeToBlack 1.5s ease-out forwards',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
      keyframes: {
        'flash': {
          '0%': {opacity: '0'},
          '15%': {opacity: '1'},
          '85%': {opacity: '1'},
          '100%': {opacity: '0'},
        },
        'fadeToBlack': {
          '0%': {opacity: '1'},
          '100%': {opacity: '0'},
        },
        'pulse-slow': {
          '0%, 100%': {opacity: '1'},
          '50%': {opacity: '0.6'},
        },
      },
    },
  },
  plugins: [],
};

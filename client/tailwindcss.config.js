//** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { inter: ['Inter', 'sans-serif'] },
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e0b85a',
          dark: '#a8883c',
        },
        surface: '#111111',
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-dark': '#2c4a1d',
        'forest-medium': '#4a6741',
        'forest-light': '#94a88d',
        'dust-brown': '#a69076',
        'soil-dark': '#5c4033',
      },
    },
  },
  plugins: [],
}
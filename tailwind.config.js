/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#404040',
          black: '#1a1a1a',
          pink: '#d97676',
          'pink-hover': '#c86767',
          maroon: '#7d1a29',
          ivory: '#faf8f5',
          cream: '#fbf6f3',
          border: '#e5e5e5',
          gold: '#cba135',
          sale: '#d97676'
        }
      },
      fontFamily: {
        heading: ['"Tenor Sans"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif']
      },
      letterSpacing: {
        widest: '.2em',
        luxury: '.12em',
      }
    },
  },
  plugins: [],
}

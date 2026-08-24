/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: '#0B5D4B',
          dark: '#063B32',
          gold: '#D4B56A',
          white: '#FFFFFF',
          text: '#071F1A',
        },
      },
      boxShadow: {
        soft: '0 20px 50px rgba(7,31,26,0.10)',
      },
    },
  },
  plugins: [],
}


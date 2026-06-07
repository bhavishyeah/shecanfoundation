/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#f8f1e8',
          surface: '#fff8f1',
          ink: '#312620',
          muted: '#7f6b60',
          line: '#e6d4c5',
          accent: '#FF592C',
          accentDark: '#e84a1d',
          soft: '#ffe0d6',
          success: '#5f7d5a',
        },
        brandDark: {
          bg: '#181311',
          surface: '#221b18',
          ink: '#f4e9df',
          muted: '#c2aa9b',
          line: '#3a2d27',
          accent: '#FF592C',
          accentDark: '#ff744e',
          soft: '#2d221d',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 30px rgba(90, 42, 20, 0.10)',
      },
    },
  },
  plugins: [],
}
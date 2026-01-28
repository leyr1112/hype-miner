/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'polymarket': {
          'bg': '#0a0a0a',
          'card': '#141414',
          'border': '#1f1f1f',
          'text': '#ffffff',
          'text-secondary': '#a0a0a0',
          'accent': '#00d4ff',
          'accent-hover': '#00b8e6',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

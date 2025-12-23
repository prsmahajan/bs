/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink': '#071225',
        'navy': '#0B1B3A',
        'accent': '#00A651',
        'accent2': '#2BD576',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      backdropBlur: {
        'glass': '24px',
      },
    },
  },
  plugins: [],
}

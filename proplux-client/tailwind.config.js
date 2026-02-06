/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f0f0f",
        gold: "#D4AF37",
        platinum: "#E5E4E2",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        fancy: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};

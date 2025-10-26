// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'fall-bg': '#fdf8f0',
        'fall-text': '#5a3e2b',
        'amber-glow': '#d4a76a',
      },
      fontFamily: {
        caveat: ["'Caveat'", 'cursive'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
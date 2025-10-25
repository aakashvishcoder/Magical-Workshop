// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'fall-bg': '#fdf9f3', // warm parchment
        'fall-text': '#5a3e2b', // rich brown
        'amber-glow': '#d4a76a',
        'spark-gold': '#e6b84d',
      },
      fontFamily: {
        caveat: ["'Caveat'", 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(212, 167, 106, 0.3)',
      }
    },
  },
  plugins: [],
};
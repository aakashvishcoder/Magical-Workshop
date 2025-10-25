module.exports = {
  content: ["./index.html", "./src/**/*.{js, ts, jsx, tsx}"],
  theme: {
    extend: {
      colors: {
        'fall-bg': '#fdf9f3',
        'fall-text': '#5a3e2b',
        'amber-glow': "#d4a76a",
        'spark-glow': '#e6b84d',
      },
      fontFamily: {
        caveat: ["'Caveat'", 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 12px rgba(212, 167, 106, 0.6)',
        'spark': '0 0 15px rgba(230, 184, 77, 0.8)',
      }
    },
  },
  plugins: [],
};

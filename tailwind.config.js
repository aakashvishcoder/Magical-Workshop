module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'fall-bg': '#fdf8f0',
        'summer-bg': "#e0f7d4",
        'fall-text': '#5a3e2b',
      },
      fontFamily: {
        caveat: ["'Caveat'", 'cursive'],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightGray: '#D9D9D9',
        normalGray: '#8A8A8A',
        darkGray: '#575757',
      },
    },
  },
  plugins: [],
}

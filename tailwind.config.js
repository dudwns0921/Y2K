/** @type {import('tailwindcss').Config} */

const HEADER_HEIGHT = '112px'

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        header: HEADER_HEIGHT,
      },
      padding: {
        header: HEADER_HEIGHT,
      },
      colors: {
        lightGray: '#D9D9D9',
        normalGray: '#8A8A8A',
        darkGray: '#575757',
      },
      animation: {
        'pulse-reduce': 'pulse-reduce 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-reduce': {
          '0%, 100%': {
            opacity: 1,
            transform: 'scaleX(1)',
            'transform-origin': 'left',
          },
          '50%': { opacity: 0.5, transform: 'ScaleX(0.7)' },
        },
      },
    },
  },
  plugins: [],
}

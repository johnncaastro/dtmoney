/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    screens: {
      'mobile': '360px',
      'laptop': '720px',
      'desktop': '1024px',
    },
    colors: {
      'purple-300': '#6933ff',
      'purple-500': '#5429cc',
      'gray-100': '#e5e5e5',
      'gray-200': '#d7d7d7',
      'gray-300': '#969cb3',
      'gray-500': '#363f5f',
      'white': '#fff',
      'modal-overlay': 'rgba(0, 0, 0, 0.5)',
      'deposit': 'rgba(18, 164, 84, 0.2)',
      'withdraw': 'rgba(230, 46, 77, 0.2)',
      'green': '#33cc95',
      'red': '#e52e4d',
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
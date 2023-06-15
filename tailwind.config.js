/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./main.js",
    "./data.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'dirtmcgerk': '#421f2c',
        'hillbillies': '#283a9a',
      },
    },
  },
  plugins: [],
}
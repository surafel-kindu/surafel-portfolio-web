/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      // Legacy palette (kept for details/resume pages)
       'custom-bg-dark':'#070415',
       'darker-1': '#1a202e',
       'darker-2': '#384765',
       'darker-tr': '#00000011',
       'black-50': '#00000099',
       'black-0': '#00000000',
       'light-1': '#F1F1E6',
       'yellow-1': '#EED180',
       'orange-light':'#ffd559',
       'orange-dark':'#ff6f57',
      // New light-theme palette (reference-image inspired)
       'cream': '#F4F1EA',
       'cream-2': '#EDEAE0',
       'ink': '#16150F',
       'ink-soft': '#4A473D',
       'lime-pop': '#D9F24F',
       'orange-pop': '#E8622C',
       'violet-pop': '#8B7CF6'
      },
      fontFamily: {
        roboto: "'roboto', sans",
        display: "'Archivo', sans-serif",
        body: "'Roboto', sans-serif"
      },
      boxShadow: {
        'bento': '0 24px 70px -35px rgba(22,21,15,0.35)',
        'chip': '0 12px 30px -14px rgba(22,21,15,0.35)'
      }
    },
  },
  plugins: [],
}

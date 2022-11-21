/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'pastel-yellow': '#FFFFEA'
      },
      borderWidth: {
        '5': '5px',
        '10': '10px'
      },
      maxWidth: {
        '2xs': '16rem',
        '3xs': '12rem'
      },
      width: {
        '1/8': '12.5%'
      },
      height: {
        '1/8': '12.5%',
        '3/8': '37.5%',
      },
      spacing: {
        '1/8': '12.5%',
        '3/8': '37.5%',
        '5/8': '62.5%'
      },
      rotate: {
        '30': '30deg',
        '60': '60deg'
      }
    },
  },
  plugins: [],
}

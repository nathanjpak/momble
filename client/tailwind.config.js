/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        '2/1': '2 / 1'
      },
      screens: {
        'smartphone': '385px'
      },
      colors: {
        'pastel-yellow': '#FFFFEA'
      },
      borderRadius: {
        'mustache-left': '100% 0% 100% 0% / 100% 0% 100% 0%',
        'mustache-right' : '0% 100% 0% 100% / 0% 100% 0% 100% '
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
        '1/32': '3.125%',
        '1/16': '6.25%',
        '1/8': '12.5%'
      },
      height: {
        '1/32': '3.125%',
        '1/16': '6.25%',
        '1/8': '12.5%',
        '3/8': '37.5%',
      },
      spacing: {
        '1/8': '12.5%',
        '1/5': '20%',
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

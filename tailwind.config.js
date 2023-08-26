/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Add your custom font name here
        body1: ['Roboto Slab', 'serif'], 
        logo: ['Pacifico', 'cursive'],
        body: ['Roboto', 'sans-serif'],// The 'sans' fallback font will be used if YourCustomFont is unavailable
      },
      colors: {
        // Add your primary color here
        primary: '#DE1B55',
        secondary: '#F67A92',
        pink: '#B5678E',
        light: '#EEC6E0' // Replace '#ff0000' with your desired primary color value
      },
    },
  },
  plugins: [],
}


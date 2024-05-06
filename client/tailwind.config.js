/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5CE1E6',
        secondary:'#BCBEFA', // Define the primary color
      }
    },
  },
  plugins: [],
}


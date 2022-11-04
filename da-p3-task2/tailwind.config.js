//** @type {import{'tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'mobile' : '320px',
    },
    extend: {},
  },
  plugins: [],
} 

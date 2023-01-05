/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './app/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
        colors: {
          'primary': '#1E40AF',
          'secondary': '#10B981',
          'background': '#252525',
        },
      listStyleType: {
        square: 'square',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/ui/**/*.{js,ts,jsx,tsx}',
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
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {colors: {
      green: '#00FF00',
      yellow: '#FFFF00',
    },
    fontFamily:{
      lora:"'Dancing Script', cursive",
    }
    },
  },
  plugins: [],
}



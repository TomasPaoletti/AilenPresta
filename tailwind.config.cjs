/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        slideinleft:{
          '0%': { transform: 'translateX(-80%)' },
          '10%': { transform: 'translateX(-70%)' },
          '20%': { transform: 'translateX(-60%)' },
          '30%': { transform: 'translateX(-40%)' },
          '40%': { transform: 'translateX(-20%)' },
          '50%': { transform: 'translateX(-10%)' },
          '60%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(0%)' },
        },slideinrigth:{
          '0%': { transform: 'translateX(80%)' },
          '10%': { transform: 'translateX(70%)' },
          '20%': { transform: 'translateX(60%)' },
          '30%': { transform: 'translateX(40%)' },
          '40%': { transform: 'translateX(20%)' },
          '50%': { transform: 'translateX(10%)' },
          '60%': { transform: 'translateX(5%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      animation:{
        'slideinleft-message': 'slideinleft 1s linear ',
        'slideinrigth-message': 'slideinrigth 1s linear '
      }
    },
  },
  plugins: [],
}

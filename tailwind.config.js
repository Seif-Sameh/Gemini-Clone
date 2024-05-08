/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors:{
        'darkGray': '#131314',
        'lightGray': '#1e1f20',
        'darkWhite': '#f1f4f9',
        'darkHover': '#2e2f30',
        'lightHover': '#e9eef2',
      },
      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }  
        }
      },
      animation: {
        slidein: "slidein 4s ease-in-out 2000ms",
        typing: "typing 1s steps(20)"
      },
    },
  },
  plugins: [
  ],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/screens/onboarding/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        generalBold: ["generalBold"],
        generalLight: ["generalLight"],
        generalMedium: ["generalMedium"],
        generalRegular: ["generalRegular"],
        generalSemibold: ["generalSemibold"],
      },
      colors: {
        text: {
          1: "#141414",
          2: "#596070",
          3: "#8A8A8A",
          4: "#343433",
          5: "#878787",
          6: "#F12F15",
          7: "#F17015",
        },
        bg: {
          2: "#F6F6F6",
          3: "#00C978",
          4: "#1B2638",
          5: "#FFAF00",
        },
        border: {
          1: "#EDEDED",
          2: "#ECECEC",
        },
      },
    },
  },

  plugins: [],
};

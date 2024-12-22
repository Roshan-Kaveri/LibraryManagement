module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greenish: "#169180", 
        blueish: "#EFFAFC", 
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

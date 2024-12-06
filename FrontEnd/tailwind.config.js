module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greenish: "#169180", // Frequently used green color
        blueish: "#EFFAFC", // Frequently used light blue color
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#348023",
        read: "#fef6f1",
        online: "#3ccb0e",
        busy: "#f14820",
        grey: "#898381",
      },
    },
  },
  plugins: [],
};

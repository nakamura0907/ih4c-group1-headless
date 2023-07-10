/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      back: "#E7FFE3",
      white: "#FFF",
      start: "#FFD700",
    },
    boxShadow: { box: "4px 5px 6px #888" },
  },
  plugins: [],
};

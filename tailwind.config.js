/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [[require("daisyui")]],
  daisyui: {
    styled: true,
    themes: true,
    rtl: false, 
  },
};

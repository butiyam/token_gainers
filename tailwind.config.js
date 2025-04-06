/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:"#9B59FF"
      },
      fontFamily: {
        poppins: ["Poppins", "serif"],
      },
      boxShadow: {
        "nrtx-hover": "0px 0px 100px 0px #8B5CF680 inset",
      }
    },
  },
  plugins: [],
};

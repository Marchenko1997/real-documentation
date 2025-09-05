/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#B4C6EE",
          400: "#417BFF",
          500: "#3371FF",
        },
        red: {
          400: "#DD4F56",
          500: "#DC4349",
        },
        dark: {
          100: "#09111F",
          200: "#0B1527",
          300: "#0F1C34",
          350: "#12213B",
          400: "#27344D",
          500: "#2E3D5B",
        },
      },
      backgroundImage: {
        doc: "url(/assets/images/doc.png)",
        modal: "url(/assets/images/modal.png)",
      },
    },
  },
  plugins: [],
};

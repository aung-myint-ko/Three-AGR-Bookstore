/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        banner1: "url('/images/banner1.png')",
        banner2: "url('/images/banner2.jpg')",
        banner3: "url('/images/banner3.jpg')",
      },
      fontFamily: {
        lato: ["var(--font-nunito)"],
        josefin: ["var(--font-josefin-sans)"],
        roboto: ["var(--font-roboto-mono)"],
        itim: ["var(--font-itim)"],
      },
      colors: {
        "c-gray": "#F9FAFB",
        "c-gray2": "#D9D9D9",
        "c-gray-pale": "#08284210",
        "c-blue": "#082842",
        "c-blue2": "#07437C",
        "c-yellow": "#FFA800",
        "c-yellow2": "#C68507",
        "c-success": "#61D345",
        "c-error": "#FF0000",
      },
      keyframes: {
        slideIn: {
          from: {
            transform: "translateX(20px)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        slideUp: {
          from: {
            transform: "translateY(0px)",
          },
          to: {
            transform: "translateY(20px)",
          },
        },
      },
      animation: {
        "slideIn-toast": "slideIn 150ms linear",
        "slideUp-toast": "slideUp 150ms linear",
      },
    },
  },
  plugins: [],
};

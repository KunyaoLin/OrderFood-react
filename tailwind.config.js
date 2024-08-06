/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#dbe6f1",
        },
      },
      maxHeight: {
        custom: "600px",
        cart: "370px",
        order: "600px",
      },
      width: {
        side: "122px",
        cart: "650px",
        order: "450px",
      },
      height: {
        order: "550px",
      },
      animation: {
        bounce: "bounce 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-md": {
          textShadow: "4px 4px 6px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-lg": {
          textShadow: "6px 6px 8px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-xl": {
          textShadow: "8px 8px 10px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

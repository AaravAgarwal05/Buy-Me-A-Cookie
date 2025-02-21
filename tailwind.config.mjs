/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-background": "#212131",
      },
      spacing: {
        "uib-size": "var(--uib-size, 150px)",
      },
      transitionTimingFunction: {
        "uib-transition": "ease 0.5s",
      },
      opacity: {
        "uib-bg-opacity": "var(--uib-bg-opacity, 0.1)",
      },
      animation: {
        travel: "travel var(--uib-speed, 1.4s) linear infinite",
      },
      keyframes: {
        travel: {
          "0%": { "stroke-dashoffset": "0" },
          "100%": { "stroke-dashoffset": "-100" },
        },
      },
    },
  },
  plugins: [],
};

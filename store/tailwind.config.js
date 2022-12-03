/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      "xxs": ['11px', { letterSpacing: "1px" }],
      "xs": ['12px', { letterSpacing: "1px" }],
      "sm": ['13px', { letterSpacing: "1px" }],
      "base": ['14px', { letterSpacing: "1px" }],
      "xl": ['16px', { letterSpacing: "1px" }],
      "2xl": ['24px', { letterSpacing: "1px" }],
      "3xl": ['32px', { letterSpacing: "1px" }],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1040px',
      'xl': '1280px',
      '2xl': '1500px',
    },
    container: {
      center: true,
      screens: {
        "2xl": "1500px"
      },
    },
    extend: {
      animation: {
        shine: "shine .6s",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
      },
      aspectRatio: {
        '5/3': '5 / 3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

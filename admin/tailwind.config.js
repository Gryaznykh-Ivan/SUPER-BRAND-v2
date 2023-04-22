module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
      colors: {
        "main-bg": "#f6f6f7"
      },
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
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
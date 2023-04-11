/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontSize: {
            "xs": ['10px'],
            "sm": ['12px'],
            "base": ['14px'],
            "md": ['14px'],
            "lg": ['20px'],
            "xl": ['24px']
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
        },
        container: {
            center: true
        },
        extend: {
            colors: {
                'line-divider': '#DDDDDD',
                'inactive-button': '#D9D9D9',
                'text-gray': '#6E6E6E',
                'main-green': '#4CAF50',
                'main-gray': '#FAFAFA',
                'main-red': '#D91A21',
                'main-blue': '#595AD3',
            },
            aspectRatio: {
                '5/3': '5 / 3',
            }
        },
    },
    plugins: [],
}


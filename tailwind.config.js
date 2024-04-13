const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./content/**/*.{mdx,md}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Rubik', ...defaultTheme.fontFamily.sans],
            },
            screens: {
                'print' : {'raw' : 'print'}
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),

    ],
}

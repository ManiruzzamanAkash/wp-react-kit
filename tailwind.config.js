/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    media: false,
    theme: {
        extend: {
            minWidth: {
                36: '9rem',
                44: '11rem',
                56: '14rem',
                60: '15rem',
                80: '20rem',
            },
            screens: {
                xs: '480px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            colors: {
                primary: '#1c64f2',
                'primary-dark': '#1a56db',
                'primary-lite': '#1972f5',

                success: '#319F45',
                'success-dark': '#27AE60',
                'success-darker': '#00A88A',
                'success-lite': '#DDFFE7',
                'success-liter': '#C9FEB7',

                error: '#E2808A',
                'error-dark': '#BD081C',
                'error-lite': '#F1CCD7',

                warning: '#F08D07',
                'warning-lite': '#FFF1E5',
                'warning-liter': '#FFE9A8',

                black: '#1D2327',

                gray: '#DDDDDD',
                'gray-lite': '#E0E0E0',
                'gray-liter': '#F5F5F5',
                'gray-dark': '#787878',
            },
        },
        variants: {
            extend: {
                opacity: ['disabled'],
            },
        },
    },
    plugins: [],
};

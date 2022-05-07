module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#fec63e',
        },
      },
      borderRadius: {
        md: '4px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stockifyPurple: '#52489C',
        stockifyLogoColor: '#ffdb99',
      },
      backgroundImage: {
        logoBlack: "url('../public/logoTransparent.png')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  variants: {
    extend: {
      backgroundSize: ['hover'],
    },
  },
  darkMode: 'class',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
};

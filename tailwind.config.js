/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        100: '#E8F9FD',
        200: '#79DAE8',
        300: '#0AA1DD',
        400: '#2155CD',
      },
      secondary: {
        100: '#FCFEFF',
        200: '#ECECEC',
        300: '#9E9E9E',
      },
      danger: {
        100: '#FFE5E5',
        200: '#D40000',
      },
      success: {
        100: '#D8FFDA',
        200: '#11D400',
      },
      requested: {
        100: '#ECECEC',
        200: '#6A6A6A',
      }
    },
    extend: {},
  },
  plugins: [],
};

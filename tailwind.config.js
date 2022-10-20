/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    // themes: [
    //   {
    //     mytheme: {
    //       primary: '#B2B2B2',
    //       secondary: '#D926A9',
    //       accent: '#1FB2A6',
    //       neutral: '#191D24',
    //       'base-100': '#2A303C',
    //       info: '#3ABFF8',
    //       success: '#36D399',
    //       warning: '#FBBD23',
    //       error: '#F87272',
    //     },
    //   },
    // ],
  },
}

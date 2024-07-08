const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
          "home-hero-pattern": "url('/src/assets/EscribenBackdrop.png')",
      },
      textShadow: {
          sm: '0 1px 2px var(--tw-shadow-color)',
          DEFAULT: '0 2px 4px var(--tw-shadow-color)',
          lg: '0 8px 16px var(--tw-shadow-color)',
      },
      colors: {
        'custom-coal': '#3F3D56',
        'custom-zinc': '#D9D9D9',
        'custom-gray': '#1D2225',
        'custom-cyan': '#00BFA6'
      },
      fontFamily: {
        'antonio': ['Antonio', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities({
        '.text-shadow': (value) => ({
          textShadow: value,
        }),
      }, { values: theme('textShadow') })
    })
  ],
}

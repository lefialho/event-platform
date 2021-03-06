/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin-fast .5s ease-in-out infinite',
      },
      keyframes: {
        'spin-fast': {
         to: { transform: 'rotate(360deg)' },
        }
      },
      backgroundImage: {
        blur: 'url(/public/img/blur-bg.png)'
      },
      fontFamily: {
        sans: 'Roboto, sans-serif', // Indica pro tailwind que a fonte padrão deve ser a Roboto
      },
      colors: {
        green: {
          300: '#00B37E',
          500: '#00875F',
          700: '#015F43',
        },
        blue: {
          500: '#81D8F7',
        },
        orange: {
          500: '#FBA94C',
        },
        red: {
          500: '#F75A68',
        },
        gray: {
          100: '#E1E1E6',
          200: '#C4C4CC',
          300: '#8D8D99',
          500: '#323238',
          600: '#29292E',
          700: '#121214',
          900: '#09090A'
        }
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

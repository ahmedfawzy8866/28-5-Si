/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          ivory: '#F4F0E8',
        },
        branding: {
          navy: '#071422',
        },
        map: {
          blue: '#1E88D9',
        },
        gold: {
          start: '#C8961A',
          end: '#E9C176',
        }
      },
      backgroundImage: {
        'luxury-gold-gradient': 'linear-gradient(to right, #C8961A, #E9C176)',
      }
    },
  },
  plugins: [],
}

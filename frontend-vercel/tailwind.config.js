/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sbr: {
          ivory: '#F4F0E8',     // Soft, clean background neutral tone
          navy: '#071422',      // Luxury editorial typography primary structure
          navyLight: '#0A1A3A', // CRM sidebar layout node panels 
          blue: '#1E88D9',      // Active vector geospatial pin indicators & sync counters
          gold: {
            light: '#F5E070',   // Metallic gold gradient start color token
            base: '#C8961A',    // Premium action highlight anchor / CTAs
            dark: '#987734',    // Luxury brand framing text accents
          }
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Cinzel', 'Playfair Display', 'serif'],
        sans: ['Jost', 'Inter', 'IBM Plex Sans Arabic', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      scale: { '101': '1.01', '102': '1.02' },
      perspective: { '1500': '1500px' }
    },
  },
  plugins: [],
};

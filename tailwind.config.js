/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        palette: {
          salmon: '#FE938C',
          sand: '#E6B89C',
          wheat: '#EAD2AC',
          steel: '#9CAFB7',
          cerulean: '#4281A4',
          ink: '#172631',
          muted: '#52636d',
          paper: '#FFFAF3',
          surface: '#F7EFE4',
          line: '#DDC8B4',
          blueSoft: '#E5F0F4',
          salmonSoft: '#FFE6E0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

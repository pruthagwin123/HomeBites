/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff8ef',
          100: '#ffe9cd',
          200: '#ffd3a3',
          500: '#f97316',
          600: '#ea580c'
        },
        cream: {
          100: '#fff7e8',
          200: '#ffedcf'
        },
        emerald: {
          50: '#ecfdf4',
          100: '#d1fae5',
          600: '#059669',
          700: '#047857'
        }
      },
      backgroundImage: {
        'warm-surface':
          'radial-gradient(circle at top right, rgba(254, 215, 170, 0.35), transparent 45%), radial-gradient(circle at bottom left, rgba(167, 243, 208, 0.3), transparent 40%), linear-gradient(180deg, #fffdf8 0%, #fff7ed 100%)'
      }
    }
  },
  plugins: []
};

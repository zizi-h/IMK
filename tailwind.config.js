/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pink': '#FFC0CB',
        'light-pink': '#FFE4E8',
        'blue': '#87CEEB',
        'light-blue': '#B0E0E6',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'dancing': ['Dancing Script', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px #FFE4E8, 0 0 10px #FFC0CB, 0 0 15px #B0E0E6'
          },
          '50%': {
            boxShadow: '0 0 10px #FFE4E8, 0 0 20px #FFC0CB, 0 0 30px #B0E0E6'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      backdropBlur: {
        'lg': '10px',
      },
    },
  },
  plugins: [],
}
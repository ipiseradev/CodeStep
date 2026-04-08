/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#000000', // True Black
          900: '#0a0a0a',
          800: '#111111', // Card background
          750: '#161616',
          700: '#222222',
          600: '#333333',
        },
        primary: {
          400: '#f0ff00',
          500: '#e2fb18', // Volt Nike
          600: '#c8e000',
          700: '#afc400',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'shimmer': 'shimmer 3s infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        }
      }
    },
  },
  plugins: [],
}

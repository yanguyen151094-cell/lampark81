import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDFAF6',
        'cream-dark': '#F5EFE4',
        brown: {
          DEFAULT: '#2C1A0E',
          light: '#6B4226',
          medium: '#8B5E3C',
        },
        gold: {
          DEFAULT: '#C8965A',
          light: '#E0B882',
          dark: '#A67A3E',
        },
        muse: {
          green: '#1C2B1E',
          'green-light': '#2E4430',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

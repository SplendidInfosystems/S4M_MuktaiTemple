/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{html,ts}",

  ],
  theme: {
    extend: {
      keyframes: {
    'typewriter': {
      '0%': { width: '0' },
      '100%': { width: '100%' },
    },
    'fade-in-up': {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    'zoom-in': {
      '0%': { transform: 'scale(0.8)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
  },
  animation: {
    'typewriter': 'typewriter 3s steps(40) 1s forwards',
    'fade-in-up': 'fade-in-up 1s ease-out forwards',
    'zoom-in': 'zoom-in 1s ease-out forwards',
    'bounce-slow': 'bounce 3s infinite',
  },
      colors: {
        // Add your custom color here
        'my-custom-color': 'bg-red-500',
      },
    },
  },
  plugins: [],
}


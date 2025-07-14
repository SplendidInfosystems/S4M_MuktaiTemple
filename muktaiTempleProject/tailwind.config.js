/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{html,ts}",

  ],
  theme: {
    extend: {
      colors: {
        // Add your custom color here
        'my-custom-color': 'bg-red-500',
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors
        primary: {
          DEFAULT: '#6366F1', // indigo-600
          dark: '#4F46E5',    // indigo-700 
        },
      },
    },
  },
  plugins: [],
} 
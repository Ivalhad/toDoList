/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6', // Biru
        'secondary': '#60a5fa', // Biru muda
        'light': '#f9fafb', // Putih keabuan
      },
    },
  },
  plugins: [],
}
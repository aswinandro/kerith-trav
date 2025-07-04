/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // <== IMPORTANT!
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(14, 90%, 53%)",
      },
    },
  },
  plugins: [],
}

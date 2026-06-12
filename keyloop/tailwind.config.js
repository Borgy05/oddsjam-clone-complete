/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: "#0a0a0d",
        bar: "#1c1c1e",
        icon: "#d8d8da",
      },
    },
  },
  plugins: [],
};

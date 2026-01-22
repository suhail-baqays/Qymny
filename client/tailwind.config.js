/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // let tailwind work on theses files
  ],
  theme: {
    extend: {},    // add my static style if i have one to apllay it to hole prject
  },
  plugins: [],     // add any authour plugins from laibrary to use it 
}
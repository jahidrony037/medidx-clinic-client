/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      'first-color':'#47ccc8',
      'second-color':'#2d3663',
      'red':"red",
    }
  },
  plugins: [
    require('daisyui'),
  ],
}

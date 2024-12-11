/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container:{
        center: true,
        padding:"1.25rem"
      }
    },
  },
  plugins: [],
});


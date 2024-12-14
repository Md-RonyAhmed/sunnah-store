/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
<<<<<<< HEAD
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marqueeBack: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        marqueeBack: "marqueeBack 25s linear infinite",
      },
=======
>>>>>>> master
      container: {
        center: true,
        padding: "1.25rem",
      },
<<<<<<< HEAD
=======
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(-100%)" },
      },
    },
    animation: {
      marquee: "marquee 10s linear infinite",
>>>>>>> master
    },
  },
  plugins: [],
});

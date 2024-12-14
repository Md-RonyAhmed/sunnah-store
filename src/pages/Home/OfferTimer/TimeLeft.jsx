import { Link } from "react-router-dom";

const TimeLeft = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-green-500 to-green-600 rounded shadow-lg h-40 flex flex-col justify-center">
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden h-full flex items-center">
        <div className="whitespace-nowrap text-white font-bold text-xl animate-marquee">
          The offer has started! Grab now 🎉 Exclusive Offer!{" "}
          <span className="font-mono bg-orange-300 px-2 rounded text-gray-800 inline-block mx-2">
            FIRST20
          </span>
          and more...
        </div>
      </div>

      {/* Action Button */}
      <div className="absolute bottom-3 right-3">
        <Link to="/products">
          <button className="text-white px-4 py-2 rounded-md shadow-md bg-gray-800 hover:bg-gray-700 transition">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TimeLeft;

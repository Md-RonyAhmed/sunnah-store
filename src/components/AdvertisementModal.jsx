import { Link } from "react-router-dom";

const AdvertisementModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-white to-gray-100 p-10 rounded-xl shadow-2xl max-w-xl w-full">
        <button
          className="absolute -top-10 -right-10 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-2 shadow-md animate-bounce"
          onClick={() => setShowModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          🎉 Exclusive Offer!
        </h2>
        <h3 className="text-2xl mt-6 font-extrabold text-gray-800 mb-6 text-center animate-pulse">
          Don’t miss out! Your dream deal awaits! 🚀
        </h3>

        <p className="text-gray-600 text-center mb-8 text-lg">
          Enjoy <span className="font-bold text-pink-500">20% off</span> on your
          first purchase. Use code:{" "}
          <span className="font-mono bg-gray-200 px-3 py-1 rounded text-gray-800">
            FIRST20
          </span>
        </p>

        <div className="flex justify-center gap-6">
          <Link to={"/products"}>
            <button className="bg-[#00BF63] text-white px-8 py-3 rounded-lg shadow-lg hover:scale-105 transform transition-all">
              Shop Now
            </button>
          </Link>

          <button
            className="bg-gray-200 text-gray-600 px-8 py-3 rounded-lg hover:bg-gray-300"
            onClick={() => {
              // localStorage.removeItem("modal")
              setShowModal(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementModal;

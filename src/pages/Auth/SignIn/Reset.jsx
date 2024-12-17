import { Link } from "react-router-dom";

const Reset = () => {
  return (
    <div className="flex flex-col p-8 justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your email address below and we will send you a link to reset
          your password.
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email address"
          />
          <button className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300 ease-in-out">
            Send Password Reset Email
          </button>
        </div>
        <p className="text-center text-gray-600 mt-6">
          Didn&apos;t signin yet?{" "}
          <Link
            to="/signin"
            className="text-green-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
        <p className="text-center text-gray-600 mt-2">
          <Link to="/" className="text-green-600 font-medium hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Reset;

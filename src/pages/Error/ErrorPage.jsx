import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="mt-4 text-lg text-gray-700">Something went wrong.</p>
      <p className="mt-2 text-gray-500">Please try again later.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-green-500 rounded-md shadow hover:bg-green-700 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};
export default ErrorPage;

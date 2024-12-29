import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const location = useLocation();
  const orderData = location?.state?.orderData;

  if (!orderData) {
    return (
      <div className="mt-44 mb-6 text-center">
        <p>No order information found.</p>
        <Link to="/sunnah-store/cart" className="text-primary hover:underline">
          Return to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-44 mb-6 mx-auto max-w-3xl px-4">
      <Helmet>
        <title>Order Success | Sunnah Store</title>
      </Helmet>

      {/* Invoice Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Order Success Message */}
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h2>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Link
          to="/sunnah-store/invoice"
          state={{ orderData }}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center gap-2"
        >
          Go to Invoice
        </Link>
        <Link
          to="/books"
          className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;

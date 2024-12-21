import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { Helmet } from "react-helmet-async";
import { FaCheckCircle, FaBox, FaTruck, FaMoneyBillWave } from "react-icons/fa";

const OrderSuccess = () => {
  const location = useLocation();
  const { removeAllFromCart } = useContext(CartContext);
  const orderData = location.state?.orderData;

  useEffect(() => {
    // কার্ট খালি করুন কারণ অর্ডার সফল হয়েছে
    removeAllFromCart();
  }, [removeAllFromCart]);

  if (!orderData) {
    return (
      <div className="mt-44 mb-6 text-center">
        <p>No order information found.</p>
        <Link to="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-44 mb-6 mx-auto max-w-3xl px-4">
      <Helmet>
        <title>Order Success | Sunnah Store</title>
      </Helmet>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Success Header */}
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600">
            Thank you for shopping with Sunnah Store
          </p>
        </div>

        {/* Order Details */}
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">#{orderData.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium">৳ {orderData.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">Cash on Delivery</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Delivering to:</p>
                <p className="font-medium">{orderData.name}</p>
                <p className="text-gray-800">{orderData.address}</p>
                <p className="text-gray-800">{orderData.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Estimated Delivery:</p>
                <p className="font-medium">3-5 Business Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cash on Delivery Instructions */}
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h3 className="flex items-center text-lg font-semibold mb-3">
            <FaMoneyBillWave className="text-yellow-600 mr-2" />
            Cash on Delivery Instructions
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <FaBox className="text-yellow-600 mt-1 mr-2" />
              <span>Please keep the exact amount ready for payment</span>
            </li>
            <li className="flex items-start">
              <FaTruck className="text-yellow-600 mt-1 mr-2" />
              <span>
                Our delivery partner will contact you before delivery
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 text-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition duration-300 text-center"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 
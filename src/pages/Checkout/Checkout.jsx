import { Helmet } from "react-helmet-async";
import { useContext, useState, useEffect } from "react";
import { CartContext, shipping } from "../../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheckAlt } from "react-icons/fa";

const Checkout = () => {
  const { cartItems, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/sunnah-store/cart");
    }
  }, [cartItems, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
  };

  return (
    <div className="mt-44 mb-6 mx-auto max-w-7xl px-4">
      <Helmet>
        <title>Sunnah Store | Checkout</title>
      </Helmet>

      {/* Checkout Steps */}
      {/* <div className="flex justify-center items-center mb-8">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col items-center">
            <div className="bg-primary text-white p-3 rounded-full">
              <FaShoppingBag size={20} />
            </div>
            <p className="mt-2 text-sm font-medium">Cart</p>
          </div>
          <div className="h-1 w-16 bg-primary"></div>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-white p-3 rounded-full">
              <FaTruck size={20} />
            </div>
            <p className="mt-2 text-sm font-medium">Shipping</p>
          </div>
          <div className="h-1 w-16 bg-primary"></div>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-white p-3 rounded-full">
              <FaMoneyCheckAlt size={20} />
            </div>
            <p className="mt-2 text-sm font-medium">Payment</p>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Shipping Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Notes about your order, e.g. special notes for delivery"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Order Summary
            </h3>
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Your cart is empty!</p>
                <Link
                  to="/products"
                  className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div>
                <div className="max-h-64 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />

                        <div className="ml-4">
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                          <p className="font-medium text-primary mt-1">
                            <span className="text-gray-500 text-sm">
                              Price:{" "}
                            </span>
                            ৳ {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600 font-bold">
                    <p>Subtotal</p>
                    <p>৳ {getTotalPrice() - shipping}</p>
                  </div>
                  <div className="flex justify-between text-gray-600 font-bold">
                    <p>Shipping</p>
                    <p>৳ {shipping}</p>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-800 border-t border-gray-200 pt-3">
                    <p>Total</p>
                    <p className="text-primary">৳ {getTotalPrice()}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-primary text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center space-x-2"
                >
                  <FaMoneyCheckAlt size={20} />
                  <span>Place Order</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

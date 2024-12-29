import { Helmet } from "react-helmet-async";
import { useContext, useState, useEffect } from "react";
import { CartContext, shipping } from "../../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import GoBack from "../../components/Shared/GoBack";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import Swal from "sweetalert2";

const Checkout = () => {
  const axiosPrivateInstance = usePrivateAxios();
  const { cartItems, getTotalPrice, removeAllFromCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // If no items in cart, redirect to Cart page
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/sunnah-store/cart");
    }
  }, [cartItems, navigate]);

  // Basic shipping form data
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    note: "",
  });

  // Payment method state
  // "cod" for Cash on Delivery, or "online" for Online Payment
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Track validation errors
  const [errors, setErrors] = useState({});

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset error message as user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /**
   * Validate form fields; return an object of errors.
   * If the object is empty, no errors found.
   */
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    // Phone validation (simple example)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else {
      // example: must be at least 10 digits
      if (formData.phone.trim().length < 11) {
        newErrors.phone = "Phone number must be at least 11 digits.";
      }
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Shipping address is required.";
    }

    // Payment Method validation
    if (!paymentMethod) {
      newErrors.paymentMethod = "Payment method is required.";
    }

    return newErrors;
  };

  // Called when clicking "Place Order"
  const handlePlaceOrder = async () => {
    try {
      // Validate the form
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Build order data
      const orderData = {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        note: formData.note,
        paymentMethod,
        totalAmount: getTotalPrice(),
        items: cartItems,
        orderDate: new Date().toISOString(),
        status: "pending", // You can add order status
        estimatedDelivery: "3 to 5 days"
      };

      // Send order to database
      const response = await axiosPrivateInstance.post("orders", orderData);
      console.log(response);
      if (response?.data?.success) {
        const orderConfirmation = {
          ...orderData,
          orderId: response?.data?.order?._id,
        };

        removeAllFromCart();
        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text: "Your order has been placed successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        // Then navigate to success page
        navigate("/sunnah-store/order-success", {
          state: {
            orderData: orderConfirmation,
          },
          replace: true, // prevents going back to checkout page
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // Error alert
      await Swal.fire({
        icon: "error",
        title: "Order Failed!",
        text: "Failed to place your order. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#10B981", // green-500 color
      });
    }
  };

  return (
    <div className="mt-5 mb-6 mx-auto max-w-7xl px-4">
      <Helmet>
        <title>Sunnah Store | Checkout</title>
      </Helmet>

      <div className="mt-40 mb-6 w-fit">
        <GoBack />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Shipping Information
            </h2>
            <form className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    readOnly
                    defaultValue={formData.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-primary focus:border-transparent
                      transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    defaultValue={formData.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-primary focus:border-transparent
                      transition-all duration-300"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-primary focus:border-transparent
                    transition-all duration-300"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-primary focus:border-transparent
                    transition-all duration-300"
                  placeholder="Enter your full address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              {/* Note (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-primary focus:border-transparent
                    transition-all duration-300"
                  placeholder="Notes about your order, e.g. special notes for delivery"
                />
              </div>

              {/* Payment Options */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Online Payment</span>
                  </label>
                </div>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.paymentMethod}
                  </p>
                )}
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
                  onClick={handlePlaceOrder}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center space-x-2 mt-4"
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

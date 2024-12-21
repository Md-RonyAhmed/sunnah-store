import { useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { Helmet } from "react-helmet-async";
import { FaCheckCircle, FaMoneyBillWave, FaFileDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const OrderSuccess = () => {
  const location = useLocation();
  const { removeAllFromCart } = useContext(CartContext);
  const orderData = location?.state?.orderData;

  const invoiceRef = useRef(null);

  useEffect(() => {
    // কার্ট খালি করুন কারণ অর্ডার সফল হয়েছে
    removeAllFromCart();
  }, [removeAllFromCart]);

  const generateInvoice = async () => {
    const invoice = invoiceRef.current;
    const canvas = await html2canvas(invoice);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`invoice-${orderData.orderId}.pdf`);
  };

  if (!orderData) {
    return (
      <div className="mt-44 mb-6 text-center">
        <p>No order information found.</p>
        <Link to="/books" className="text-primary hover:underline">
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

      {/* Invoice Content */}
      <div ref={invoiceRef} className="bg-white p-6 rounded-lg shadow-lg">
        {/* Store Logo and Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Sunnah Store</h1>
          <p className="text-gray-600">Invoice</p>
        </div>

        {/* Order Success Message */}
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h2>
        </div>

        {/* Invoice Details */}
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Invoice To:</h3>
              <p className="text-gray-800">{orderData.name}</p>
              <p className="text-gray-800">{orderData.address}</p>
              <p className="text-gray-800">{orderData.phone}</p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-gray-700">Order Info:</h3>
              <p className="text-gray-800">Order ID: #{orderData.orderId}</p>
              <p className="text-gray-800">
                Date: {new Date(orderData.orderDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Order Items:</h3>
          <div className="space-y-2">
            {orderData.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">৳ {item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Subtotal:</span>
            <span>৳ {orderData.totalAmount - 55}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Shipping:</span>
            <span>৳ 55</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">৳ {orderData.totalAmount}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-6 bg-yellow-50 p-4 rounded">
          <div className="flex items-center">
            <FaMoneyBillWave className="text-yellow-600 mr-2" />
            <span className="font-medium">
              Payment Method: Cash on Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={generateInvoice}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center gap-2"
        >
          <FaFileDownload />
          Download Invoice
        </button>
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

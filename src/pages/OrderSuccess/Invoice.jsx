import { useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  FaFileDownload,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { shipping } from "../../contexts/CartContext";

const Invoice = () => {
  const location = useLocation();
  const orderData = location?.state?.orderData;
  const invoiceRef = useRef(null);

  // Payment method display helper
  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case "cod":
        return {
          text: "Cash on Delivery",
          icon: <FaMoneyBillWave className="text-yellow-600 mr-2" />,
        };
      case "online":
        return {
          text: "Online Payment",
          icon: <FaMoneyCheckAlt className="text-green-600 mr-2" />,
        };
      default:
        return {
          text: "Cash on Delivery",
          icon: <FaMoneyBillWave className="text-yellow-600 mr-2" />,
        };
    }
  };
  // ... generateInvoice function ...
  const paymentMethod = getPaymentMethodDisplay(orderData?.paymentMethod);

  const generateInvoice = async () => {
    const invoice = invoiceRef.current;

    // Set specific dimensions for better quality
    const pdfWidth = 595; // Standard A4 width in points
    const pdfHeight = 842; // Standard A4 height in points

    const canvas = await html2canvas(invoice, {
      backgroundColor: "#ffffff",
      scale: 2, // Increase scale for better quality
      useCORS: true,
      logging: false,
      width: invoice.offsetWidth,
      height: invoice.offsetHeight,
    });

    // Calculate ratio to fit content properly
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 20; // Add some top margin

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );

    pdf.save(`invoice-${orderData.orderId}.pdf`);
  };

  if (!orderData) {
    return (
      <div className="mt-5 mb-6 text-center">
        <p>No invoice information found.</p>
        <Link to="/sunnah-store/cart" className="text-primary hover:underline">
          Return to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-5 mb-6 mx-auto max-w-3xl px-4">
      {/* Invoice Content */}
      <div ref={invoiceRef} className="bg-white p-6 rounded-lg shadow-lg">
        {/* Store Logo and Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Sunnah Store</h1>
          <p className="text-gray-600">Invoice</p>
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
              <p className="text-gray-800">Order ID: {orderData.orderId}</p>
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
            <span>৳ {orderData.totalAmount - shipping}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Shipping:</span>
            <span>৳ {shipping}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">৳ {orderData.totalAmount}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div
          className={`mt-6 p-4 rounded ${
            orderData.paymentMethod === "online"
              ? "bg-green-50"
              : "bg-yellow-50"
          }`}
        >
          <div className="flex items-center">
            {paymentMethod.icon}
            <span className="font-medium">
              Payment Method: {paymentMethod.text}
            </span>
          </div>
          {orderData.paymentMethod === "cod" && (
            <p className="text-sm text-gray-600 mt-2">
              Please keep the exact amount of ৳{orderData.totalAmount} ready for
              delivery.
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
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

export default Invoice;

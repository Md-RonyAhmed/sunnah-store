import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useContext(CartContext);

   const totalQuantity = cartItems.reduce(
     (total, item) => total + item.quantity,
     0
   );

  return (
    <div className="mt-48 mb-6 p-6 bg-white shadow-lg rounded-lg">
      <Helmet>
        <title>Sunnah Store | Cart</title>
      </Helmet>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://www.rokomari.com/static/200/images/icon_empty_cart.png"
            alt="empty-cart"
          />
          <p className="text-3xl text-red-900 font-bold ">
            Your cart is empty!
          </p>
          <p className="text-lg text-gray-600 ">
            Looks like you haven&apos;t made order yet.
          </p>
          <button className=" bg-primary text-white py-1 px-4 mt-2 rounded-lg hover:bg-green-600 transition duration-300">
            <Link to={"/products"}>Continue to Shopping</Link>{" "}
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4  justify-between">
          <section className="w-full md:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded mr-4"
                  />
                  <div>
                    <span className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </span>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
                      >
                        -
                      </button>
                      <span className="mx-2 text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-800 ml-4">
                    ৳ {item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <RiDeleteBin2Fill size={24} />
                  </button>
                </div>
              </div>
            ))}
          </section>
          <section className=" bg-gray-100 p-4 rounded-lg shadow-md mb-4 w-full md:w-1/3 h-fit ">
            <h2 className="text-2xl border-gray-400 border-b pb-2">
              Checkout Summary
            </h2>

            <div className="flex justify-between items-center gap-4 mt-4 pb-2 font-bold text-sm text-gray-800 border-gray-400 border-b border-dashed">
              <p> Subtotal ({totalQuantity} items): </p>

              <p className="text-green-600">৳ {getTotalPrice()}</p>
            </div>
            <div className="flex justify-between items-center gap-4 mt-4 pb-2 font-bold text-sm text-gray-800 border-gray-400 border-b border-dashed">
              <p> Shipping Charges: </p>

              <p className="text-green-600">৳ {getTotalPrice()}</p>
            </div>
            <div className="flex justify-between items-center gap-4 mt-4 pb-2 font-bold text-sm text-gray-800 border-gray-400 border-b border-dashed">
              <p> Total Price: </p>

              <p className="text-green-600">৳ {getTotalPrice()}</p>
            </div>

            <div className="mt-6">
              <button className=" bg-primary text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 transition duration-300">
                Proceed to Checkout ({totalQuantity})
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Cart;

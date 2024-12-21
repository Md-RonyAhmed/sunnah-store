import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { CartContext, shipping } from "../../contexts/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdAdd, MdRemove, MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    removeAllFromCart,
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
            Looks like you haven&apos;t add any products in cart.
          </p>
          <button className=" bg-primary text-white py-2 px-4 mt-2 rounded-lg hover:bg-green-600 transition duration-300">
            <Link to={"/products"}>Continue to Shopping</Link>{" "}
          </button>
        </div>
      ) : (
        <div>
          <button
            className="flex items-center gap-2 mb-3 text-red-400 hover:underline hover:underline-offset-2 cursor-pointer hover:text-red-300 w-fit"
            onClick={removeAllFromCart}
          >
            Clear Cart
            <span>
              <MdRemoveShoppingCart color="red" className="size-5" />
            </span>
          </button>
          <div className="flex flex-col md:flex-row gap-4  justify-between">
            <section className="w-full md:w-2/3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-md mb-4 relative"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded mr-4"
                    />
                    <div>
                      <div className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </div>
                      <div className="text-lg font-semibold text-primary">
                        ৳ {item.price * item.quantity}
                      </div>
                      <div className="flex items-center mt-2 gap-3">
                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 transition duration-300"
                        >
                          <MdRemove />
                        </button>
                        <span className="text-lg font-semibold text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item._id)}
                          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 transition duration-300"
                        >
                          <MdAdd />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition duration-300 bg-red-100 rounded-full px-1 py-1 ml-4 absolute right-2 bottom-1/2 translate-y-1/2"
                  >
                    <RiDeleteBin6Line size={24} />
                  </button>
                </div>
              ))}
            </section>
            <section className="bg-gray-50 p-4 rounded-lg shadow-md mb-4 w-full md:w-1/3 h-fit ">
              <h2 className="text-2xl border-gray-400 border-b pb-2">
                Checkout Summary
              </h2>

              <div className="flex justify-between items-center gap-4 mt-4 pb-2 font-bold text-sm text-gray-800 border-gray-400 border-b border-dashed">
                <p> Subtotal ({totalQuantity} items): </p>

                <p className="text-primary">৳ {getTotalPrice() - shipping}</p>
              </div>
              <div className="flex justify-between items-center gap-4 mt-4 pb-2 font-bold text-sm text-gray-800 border-gray-400 border-b border-dashed">
                <p> Shipping Charge: </p>

                <p className="text-primary">৳ {shipping}</p>
              </div>
              <div className="flex justify-between items-center gap-4 mt-4 pb-2 font-bold text-lg text-gray-800 border-gray-400 border-b border-dashed">
                <p> Total Price: </p>

                <p className="text-primary">৳ {getTotalPrice()}</p>
              </div>

              <div className="mt-6">
                <button className=" bg-primary text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 transition duration-300">
                  Proceed to Checkout ({totalQuantity})
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

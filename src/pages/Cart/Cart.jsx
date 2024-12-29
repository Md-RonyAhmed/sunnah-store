import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { CartContext, shipping } from "../../contexts/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdAdd, MdRemove, MdRemoveShoppingCart } from "react-icons/md";
import GoBack from "../../components/Shared/GoBack";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    removeAllFromCart,
    totalQuantity,
  } = useContext(CartContext);

  return (
    <>
      <div className="mt-56 md:mt-44 mb-6 w-fit">
        <GoBack />
      </div>
      
      <div className="mb-6 p-0 md:p-6 bg-white md:shadow-md rounded-lg">
        <Helmet>
          <title>Sunnah Store | Cart</title>
        </Helmet>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src="https://www.rokomari.com/static/200/images/icon_empty_cart.png"
              alt="empty-cart"
              className="w-32 h-32"
            />
            <p className="text-3xl text-red-900 font-bold ">
              Your cart is empty!
            </p>
            <p className="text-lg text-gray-600 ">
              Looks like you haven&apos;t added any products to the cart.
            </p>
            <button className="bg-primary text-white py-2 px-4 mt-2 rounded-lg hover:bg-green-600 transition duration-300">
              <Link to={"/products"}>Continue Shopping</Link>
            </button>
          </div>
        ) : (
          <div>
            {/* Clear cart */}
            <button
              className="flex items-center gap-2 mb-3 text-red-400 hover:underline hover:underline-offset-2 cursor-pointer hover:text-red-300 w-fit"
              onClick={removeAllFromCart}
            >
              Clear Cart
              <span>
                <MdRemoveShoppingCart color="red" className="size-5" />
              </span>
            </button>


            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <section className="w-full lg:w-2/3">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-50 py-4 px-4 rounded-lg shadow-md mb-4 relative transition-transform duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-contain rounded-md"
                      />
                      <div>
                        <Link to={`/product/${item._id}`}>
                          <div className="text-lg font-semibold text-gray-800 hover:text-primary transition duration-200">
                            {item.name}
                          </div>
                        </Link>
                        <div className="text-lg font-semibold text-primary">
                          ৳ {item.price}
                        </div>
                        <div className="flex items-center mt-2 gap-3">
                          <button
                            onClick={() => decreaseQuantity(item._id)}
                            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 transition duration-300 rounded"
                          >
                            <MdRemove />
                          </button>
                          <span className="text-lg font-semibold text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item._id)}
                            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 transition duration-300 rounded"
                          >
                            <MdAdd />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 transition duration-300 bg-red-100 rounded-full px-1 py-1 ml-8 absolute right-4 bottom-8 md:bottom-1/2 translate-y-1/2"
                    >
                      <RiDeleteBin6Line size={24} />
                    </button>
                  </div>
                ))}
              </section>
              <section className="bg-gray-50 px-6 py-10 rounded-lg shadow-md mb-4 w-full lg:w-1/3 h-fit">
                <h2 className="text-2xl border-gray-400 border-b pb-2">
                  Checkout Summary
                </h2>

                <div className="flex justify-between items-center gap-4 mt-4 pb-2 font-bold text-sm text-gray-800 border-gray-400 border-b border-dashed">
                  <p>Subtotal ({totalQuantity} items):</p>
                  <p className="text-primary">৳ {getTotalPrice() - shipping}</p>
                </div>
                <div className="flex justify-between items-center gap-4 mt-4 pb-2 font-bold text-sm text-gray-800 border-gray-400 border-b border-dashed">
                  <p>Shipping Charge:</p>
                  <p className="text-primary">৳ {shipping}</p>
                </div>
                <div className="flex justify-between items-center gap-4 mt-4 pb-2 font-bold text-lg text-gray-800 border-gray-400 border-b border-dashed">
                  <p>Total Price:</p>
                  <p className="text-primary">৳ {getTotalPrice()}</p>
                </div>

                <div className="mt-6">
                  <Link
                    to={"/sunnah-store/checkout"}
                    className="bg-primary text-white py-3 px-4 rounded-lg w-full hover:bg-green-600 transition duration-300"
                  >
                    Proceed to Checkout ({totalQuantity})
                  </Link>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

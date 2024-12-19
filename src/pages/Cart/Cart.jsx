import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { RiDeleteBin2Fill } from "react-icons/ri";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getTotalPrice } = useContext(CartContext);

  return (
    <div className="mt-48 mb-6 p-6 bg-white shadow-lg rounded-lg">
      <Helmet>
        <title>Sunnah Store | Cart</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
                <div>
                  <span className="text-lg font-semibold text-gray-800">{item.name}</span>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => decreaseQuantity(item._id)} 
                      className="px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
                    >
                      -
                    </button>
                    <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
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
                <span className="text-lg font-semibold text-gray-800 ml-4">৳ {item.price * item.quantity}</span>
                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="ml-4 text-red-500 hover:text-red-700 transition duration-300"
                >
                  <RiDeleteBin2Fill size={24}/>
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 font-bold text-xl text-gray-800">
            Total Price: <span className="text-green-600">৳ {getTotalPrice()}</span>
          </div>
        </div>
      )}
      <div className="mt-6">
        <button className=" bg-primary text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

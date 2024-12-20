import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";

function Wishlist() {
  const { wishlistItems, setwishlistItems, addToCart } =
    useContext(CartContext);

  const removeFromWishlist = (id) => {
    setwishlistItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };

  return (
    <>
      <div className="max-w-full mt-40 mx-auto p-4 bg-gray-100 rounded-lg shadow">
        <Helmet>
          <title>Sunnah Store | Wish List</title>
        </Helmet>

        <h1 className="text-3xl mb-6 mt-4 text-center font-semibold">
          Wishlist
        </h1>
        {wishlistItems.length > 0 ? (
          <div>
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="flex-col md:flex-row flex items-center justify-between p-4 bg-white mb-4 rounded-lg shadow-sm"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded-md"
                />

                {/* Product Details */}
                <div className="flex-1 px-4">
                  <h2 className="text-lg font-medium text-gray-800 truncate flex-col flex md:flex-row items-center gap-4">
                    {item.name}
                    <Typography className="text-sm">
                      {item.status ? (
                        <span className="text-primary bg-gray-200 py-1 px-2.5 rounded-2xl">
                          In stock
                        </span>
                      ) : (
                        <span className="text-red-600 bg-gray-200 py-1 px-2.5 rounded-2xl">
                          Out of stock
                        </span>
                      )}
                    </Typography>
                  </h2>
                  <p className="text-lg font-bold text-red-600 mt-2">
                    ৳ {item.price}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end space-y-3 mr-2">
                  {/* Add to Cart */}
                  <div className="relative group inline-block">
                    <button
                      className={`p-2 text-white rounded shadow-md flex items-center justify-center ${
                        item.status
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-500 cursor-not-allowed"
                      }`}
                      aria-label="Add to Cart"
                      disabled={!item.status}
                      onClick={() => addToCart(item)}
                    >
                      <FaShoppingCart />
                    </button>

                    {/* Custom Tooltip */}
                    <span
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 
                   px-2 py-1 bg-primary text-white text-sm rounded 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                    >
                      {" "}
                      Add to Cart
                    </span>
                  </div>

                  {/* Remove from Cart */}
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="text-red-500 text-md hover:underline"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">Your wishlist is empty.</p>
        )}
      </div>
    </>
  );
}

export default Wishlist;

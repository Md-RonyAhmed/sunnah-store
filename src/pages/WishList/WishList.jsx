import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";
import { WishlistContext } from "../../contexts/WishlistContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import GoBack from "../../components/Shared/GoBack";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <div className="my-6 w-full px-0">
        <GoBack />
      </div>

      <div className="max-w-full mx-auto p-4 bg-white md:bg-gray-50 rounded-lg shadow-none md:shadow">
        <Helmet>
          <title>Sunnah Store | Wish List</title>
        </Helmet>

        <h1 className="text-2xl md:text-3xl mb-6 mt-4 text-center font-semibold">
          Wishlist
        </h1>
        {wishlistItems.length > 0 ? (
          <div>
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#FAFAFA] md:bg-white mb-4 rounded-lg shadow-md"
              >
                {/* Image and Details */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-md"
                  />

                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <Link to={`/product/${item._id}`}>
                      <div className="text-lg md:text-xl font-semibold text-gray-800 hover:text-primary transition duration-200 truncate">
                        {item.name}
                      </div>
                    </Link>
                    <Typography className="text-sm mt-2">
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
                    <p className="text-lg font-bold text-primary mt-2">
                      ৳ {item.price}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col items-center justify-center mt-4 md:mt-0 gap-2">
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
                      onClick={() => {
                        addToCart(item);
                        removeFromWishlist(item._id);
                      }}
                    >
                      <FaShoppingCart />
                    </button>
                    <span
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                    >
                      Add to Cart
                    </span>
                  </div>

                  {/* Remove from Wishlist */}
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="text-red-500 hover:text-red-700 transition duration-300 bg-red-100 rounded-full px-2 py-2"
                  >
                    <RiDeleteBin6Line size={20} />
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

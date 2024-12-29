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
      <div className="mt-5 mb-6 w-fit">
        <GoBack />
      </div>
      <div className="max-w-full mx-auto p-4 bg-gray-50 rounded-lg shadow">
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
                  <div className="text-lg font-medium text-gray-800 truncate flex-col flex md:flex-row items-center gap-4">
                    <Link to={`/product/${item._id}`}>
                      <div className="text-lg font-semibold text-gray-800 hover:text-primary transition duration-200">
                        {item.name}
                      </div>
                    </Link>
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
                  </div>
                  <p className="text-lg font-bold text-primary mt-2">
                    ৳ {item.price}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end justify-center space-y-3 mr-2">
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

                  {/* Remove from Wishlist*/}
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="text-red-500 hover:text-red-700 transition duration-300 bg-red-100 rounded-full px-1 py-1"
                  >
                    <RiDeleteBin6Line size={24} />
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

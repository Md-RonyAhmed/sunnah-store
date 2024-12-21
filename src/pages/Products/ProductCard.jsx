import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Rating } from "@smastrom/react-rating";
import { useContext } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";

const ProductCard = ({ product }) => {
  const { _id, image, name, price, individualRating, status } = product || {};

  const { addToCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const isWishlisted = wishlistItems.find((item) => item._id === _id);

  return (
    <Card className="relative border hover:shadow-lg transition-shadow duration-300">
      {/* Wishlist Icon */}
      <button
        className="absolute top-3 right-3 p-2 z-30 bg-white/80 rounded-full shadow hover:bg-white transition"
        aria-label="Add to Wishlist"
        onClick={() => addToWishlist(product)}
      >
        <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-700"} />
        {/* একবার বাটন ক্লিক করলে wishlist এ প্রোডাক্টটা অ্যাড হয়ে যাবে, পুনরায় এই বাটন ক্লিক করলে wishlist থেকে রিমোভ হয়ে যাবে, অনেকটা toggle এর মতো */}

        {/* যেকল কার্ডের প্রোডাক্ট wishlist এ অ্যাড হয়েছে সেকল কার্ডের <FaHeart/> আইকনের কালার রেড হবে, সেকল কার্ডের প্রোডাক্ট wishlist এ এড করা হয়নাই তাদের আইকন grey কালার হবে */}
      </button>

      <Link to={`/product/${_id}`}>
        <CardHeader
          floated={false}
          shadow={false}
          className="flex justify-center items-center h-48 bg-gray-50 cursor-pointer"
        >
          <img
            src={image}
            alt={name}
            className="object-contain h-full w-auto transition-transform duration-200 hover:scale-105"
          />
        </CardHeader>
      </Link>

      {/* Price Badge */}
      <span className="absolute top-3 left-3 bg-white/90 text-primary font-semibold px-3 py-1 rounded-full text-sm shadow">
        ৳ {price}
      </span>

      <CardBody className="py-4 px-4 flex-grow space-y-3">
        <div className="flex items-center gap-2 mt-2">
          {/* Star Rating */}
          <Rating value={individualRating} readOnly style={{ maxWidth: 100 }} />
          {/* Show numeric rating */}
          <Typography className="text-sm text-gray-600">
            {individualRating.toFixed(1)}/5
          </Typography>
        </div>
        <Typography className="font-semibold text-gray-800 line-clamp-2">
          {name}
        </Typography>
        <Typography className="text-sm">
          {status ? (
            <span className="text-primary bg-gray-200 py-1 px-2.5 rounded-2xl">
              In stock
            </span>
          ) : (
            <span className="text-red-600 bg-gray-200 py-1 px-2.5 rounded-2xl">
              Out of stock
            </span>
          )}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 pb-4 px-4 flex flex-1 items-center justify-between space-x-3">
        {/* See Details Button */}
        <Link to={`/product/${_id}`} className="flex-1">
          <Button
            variant="outlined"
            color="green"
            fullWidth
            className="flex items-center justify-center gap-2 border-green-500 text-green-500 hover:bg-green-50"
          >
            See Details
            <FaArrowRightLong />
          </Button>
        </Link>

        <div className="relative group inline-block">
          <button
            className={`p-2 text-white rounded shadow-md flex items-center justify-center ${
              status
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            aria-label="Add to Cart"
            disabled={!status}
            onClick={() => {
              addToCart(product);
              removeFromWishlist(product._id);
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
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

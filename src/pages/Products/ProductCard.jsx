import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Rating } from "@smastrom/react-rating";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, image, name, price, individualRating } = product || {};

  return (
    <Card className="relative border hover:shadow-lg transition-shadow duration-300">
      {/* Wishlist Icon */}
      <button
        className="absolute top-3 right-3 p-2 z-30 bg-white/80 rounded-full shadow hover:bg-white transition"
        aria-label="Add to Wishlist"
      >
        <FaHeart className="text-red-500" />
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
          {product?.status ? (
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

        {/* Add to Cart Button */}
        <Link to={"/cart"}>
          <button
            className={`p-2 text-white rounded shadow-md flex items-center justify-center ${
              product?.status
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            aria-label="Add to Cart"
            disabled={!product?.status}
          >
            <FaShoppingCart />
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

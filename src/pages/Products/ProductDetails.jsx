import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Shared/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://sunnah-store-server-azure.vercel.app/product/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  // Safely handle product and keyFeatures
  const {
    image,
    name,
    description,
    category,
    price,
    individualRating,
    averageRating,
    keyFeatures = {},
  } = product || {};

  return (
    <div className="flex relative justify-center items-center mt-44 py-10 px-4">
      <Card className="relative border p-6 shadow-lg w-full max-w-6xl lg:flex-row bg-white">
        <CardHeader
          shadow={false}
          floated={false}
          className="flex-1 flex justify-center items-center shadow-sm"
        >
          <img
            src={image}
            alt={name}
            className="w-80 object-contain transition-transform duration-200 hover:scale-105"
          />
        </CardHeader>
        <CardBody className="flex-1 lg:ml-8 p-0 pt-6 lg:pt-0 lg:p-6">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-4 text-2xl sm:text-3xl font-bold"
          >
            {name}
          </Typography>
          <Typography className="absolute top-4 right-5 mb-4 text-lg">
            {product?.status ? (
              <span className="text-primary bg-gray-200 py-1 px-2.5 rounded">
                In stock
              </span>
            ) : (
              <span className="text-red-600 bg-gray-200 py-1 px-2.5 rounded">
                Out of stock
              </span>
            )}
          </Typography>

          <Typography color="gray" className="mb-4 text-sm sm:text-base">
            {description}
          </Typography>
          {/* Dynamic Key Features */}
          <div className="mb-2 space-y-2">
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Key Features:
            </Typography>
            {Object.entries(keyFeatures).length > 0 ? (
              Object.entries(keyFeatures).map(([featureKey, featureValue]) => (
                <Typography
                  key={featureKey}
                  variant="h6"
                  color="gray"
                  className="flex items-center text-sm sm:text-base"
                >
                  <span className="capitalize mr-2">{featureKey}:</span>{" "}
                  <span className="text-green-500 font-medium">
                    {featureValue}
                  </span>
                </Typography>
              ))
            ) : (
              <Typography color="gray" className="text-sm">
                No specific key features available.
              </Typography>
            )}
          </div>

          <Typography
            variant="h6"
            color="gray"
            className="mb-2 text-sm sm:text-base"
          >
            Category:{" "}
            <span className="text-green-500 font-medium">{category}</span>
          </Typography>

          <div className="mb-2 space-y-2">
            <Typography color="gray" className="text-sm sm:text-base font-bold">
              Individual Rating:{" "}
              <span className="text-green-500 font-medium">
                {individualRating}
              </span>
            </Typography>
            <Typography color="gray" className="text-sm sm:text-base font-bold">
              Average Rating:{" "}
              <span className="text-green-500 font-medium">
                {averageRating}
              </span>
            </Typography>
          </div>

          <Typography
            color="blue-gray"
            variant="h4"
            className="mb-2 font-normal text-lg sm:text-2xl"
          >
            Price:{" "}
            <span className="text-green-500 font-semibold">৳ {price}</span>
          </Typography>
          <Typography className="text-xs text-gray-400 mb-4">
            *Shipping and taxes extra
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="md"
              variant="outlined"
              className="border-green-500 text-green-500 hover:bg-green-50 transition duration-500"
            >
              Add to Wishlist
            </Button>
            <Link to={"/cart"}>
              <button
                className={`py-3 px-6 rounded-lg text-white uppercase text-sm ${
                  product?.status
                    ? "bg-green-600 hover:bg-green-400 cursor-pointer"
                    : "cursor-not-allowed bg-gray-400"
                }`}
                disabled={!product?.status}
              >
                Add to Cart
              </button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductDetails;

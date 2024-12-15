import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Shared/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
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
    //
  }, [id]);
  /**
   * {
    "_id": "675ac0e7c9f4a578ad85e377",
    "image": "https://example.com/images/book2.jpg",
    "name": "Python for Data Science",
    "category": "Books",
    "sub-category": "",
    "status": true,
    "price": 3200,
    "description": "A beginner's guide to Python in data science.",
    "keyFeatures": {
        "author": "Jane Smith",
        "pages": 350
    },
    "individualRating": 4.7,
    "averageRating": 4.6,
    "reviews": []
}
   */
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center items-center mt-44 py-10 ">
      <Card className="relative border p-6 shadow-lg sm:w-11/12 lg:flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 flex-1  justify-center items-center flex bg-transparent shadow-sm"
        >
          <img
            src={product?.image}
            alt={product?.name}
            className="w-80 object-cover"
          />
        </CardHeader>
        <CardBody className=" p-0 pt-6 lg:p-6 flex-1">
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-4 text-xl sm:text-3xl "
          >
            {product?.name}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            {product?.description}
          </Typography>
          <Typography variant="h6" color="gray" className="">
            Brand:{" "}
            <span className="text-green-400">
              {product?.keyFeatures?.brand}
            </span>
          </Typography>
          <Typography variant="h6" color="gray" className="">
            Model:{" "}
            <span className="text-green-400">
              {product?.keyFeatures?.model}
            </span>
          </Typography>
          <Typography variant="h6" color="gray" className="mb-4">
            Category:{" "}
            <span className="text-green-400">{product?.category}</span>
          </Typography>
          <Typography color="gray" className="mb-3 font-normal">
            Individual Rating:
            <span className="text-green-400 ">
              {" "}
              {product?.individualRating}
            </span>
          </Typography>
          <Typography color="gray" className="mb-3 font-normal">
            Average Rating:
            <span className="text-green-400 "> {product?.averageRating}</span>
          </Typography>

          <Typography color="gray" variant="h3" className=" font-normal">
            <span className="text-green-400">৳ {product?.price}</span>
          </Typography>
          <Typography className="text-xs mb-3">
            *Shipping and taxes extra
          </Typography>
          <div className="flex gap-4 flex-col sm:flex-row flex-1">
            <Button
              size="md"
              variant=""
              className="border-primary border bg-transparent text-primary hover:bg-primary hover:text-white transition duration-500"
            >
              Add to Wishlist
            </Button>
            <Button size="md" className="bg-primary">
              Add to Cart
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductDetails;

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, image, name, price } = product || {};

  return (
    <Card
      shadow={false}
      className=" hover:shadow-xl transition duration-300 relative border "
    >
      <CardHeader shadow={false} floated={false} className="">
        <img src={image} alt={name} className=" object-cover" />
      </CardHeader>
      <CardBody className="flex-grow py-3 px-4">
        <Typography className="font-medium">{name}</Typography>
        <Typography className="font-medium border absolute top-3 left-3 p-1 rounded-md px-2 bg-gray-50 text-primary ">
          ${price}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex-1 px-4">
        <Link to={`/product/${_id}`}>
          <Button
            ripple={false}
            fullWidth={true}
            className="2 bg-primary/10 text-primary shadow-none hover:shadow-none border flex  justify-center items-center gap-3"
          >
            See Details <FaArrowRightLong />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

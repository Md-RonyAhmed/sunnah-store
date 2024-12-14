import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";

const Products = () => {
  const {
    data: { data: products },
  } = useLoaderData();
  
  return (
    <div className="my-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;

import { useLoaderData, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductsPagination from "./ProductsPagination";

const Products = () => {
  const {
    data: { data: products },
  } = useLoaderData();

  const { key } = useParams();

  return (
    <div className="mt-28">
      <h1 className="text-2xl border-b-4 border-[#00BF63] w-fit capitalize">
        {key
          ? key === "groceries"
            ? "groceries & foods"
            : key
          : "all products"}{" "}
        ({products.length})
      </h1>
      <div className="mb-8 mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="mx-auto mb-6">
        <ProductsPagination />
      </div>
    </div>
  );
};

export default Products;

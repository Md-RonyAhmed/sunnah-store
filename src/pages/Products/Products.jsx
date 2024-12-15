import { useLoaderData, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductsPagination from "./ProductsPagination";
import { useState, useEffect } from "react";
import FilterSection from "./Filtering/FilterSection";
import { Switch } from "@material-tailwind/react";

const Products = () => {
  const {
    data: { data: products },
  } = useLoaderData();

  const [sortBy, setSortBy] = useState(0);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [inStock, setInStock] = useState(false);

  const { key } = useParams();

  // Sorting
  useEffect(() => {
    let sorted = [...products];
    switch (sortBy) {
      case 1: // Price: Low to High
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 2: // Price: High to Low
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 3: // Rating
        sorted.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 4: // Top Sales
        sorted.sort((a, b) => b.individualRating - a.individualRating);
        break;
      default:
        // 0 : restore raw array (products)
        break;
    }
    // Filter by stock if inStock is true
    if (inStock) {
      sorted = sorted.filter((product) => product.status === true);
    }
    setSortedProducts(sorted);
  }, [sortBy, products, inStock]);

  return (
    <div className="mt-28">
      <FilterSection setSortBy={setSortBy} />

      <div className="flex items-center justify-between mt-3">
        <h1 className="text-2xl border-b-4 border-primary w-fit capitalize">
          {key
            ? key === "groceries"
              ? "groceries & foods"
              : key
            : "all products"}{" "}
          ({sortedProducts.length})
        </h1>

        <div className="flex items-center space-x-2 mt-3">
          <Switch
            id="in-stock"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          <label htmlFor="in-stock" className="text-primary">
            In stock
          </label>
        </div>
      </div>

      <div className="mb-8 mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {sortedProducts.map((product) => (
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

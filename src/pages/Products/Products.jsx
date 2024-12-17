import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductsPagination from "./ProductsPagination";
import { useState, useEffect } from "react";
import FilterSection from "./Filtering/FilterSection";
import { Switch } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Shared/Loading";

const Products = () => {
  const { key } = useParams();
  const [sortBy, setSortBy] = useState(0);

  const [inStock, setInStock] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: key ? ["products", key] : ["products"],
    queryFn: async () => {
      let url = "https://sunnah-store-server-azure.vercel.app/products";
      if (key) {
        url = `https://sunnah-store-server-azure.vercel.app/products/${key}`;
      }
      const res = await axios.get(url);
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const [sortedProducts, setSortedProducts] = useState([]);

  // Sorting
  useEffect(() => {
    if (!products) return;
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

  if (isLoading/* || (sortedProducts.length === 0 && products.length > 0)*/) {
    // handle waiting time with a loading screen when program is running to set data properly!
    return <Loading />;
  }
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
        {sortedProducts?.map((product) => (
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

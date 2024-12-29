/* eslint-disable react-refresh/only-export-components */
import { NavLink, useParams, Navigate, Link } from "react-router-dom";
import Loading from "../../../components/Shared/Loading";
import { Button } from "@material-tailwind/react";
import ProductCard from "../../Products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import usePublicAxios from "../../../hooks/usePublicAxios";

// Sample product data (to be replaced with actual data, ideally coming from an API or a prop)
export const categoryData = [
  { catName: "Books", path: "/books" },
  { catName: "Electronics", path: "/electronics" },
  { catName: "Sunnah", path: "/sunnah" },
  { catName: "Groceries & Foods", path: "/groceries" },
  { catName: "Clothing", path: "/clothing" },
  { catName: "Offers", path: "/offers" },
  { catName: "Others", path: "/others" },
];

function Categories() {
  const { key } = useParams(); // Get the dynamic key from the URL
  const [limit] = useState(5);

  const axiosPublicInstance = usePublicAxios();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", key],
    queryFn: async () => {
      const res = await axiosPublicInstance.get(
        `products/${key}?limit=${limit}`
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const category = categoryData.find((cat) => cat.path === `/${key}`); // Match the key with a category

  // Redirect to /books if no key is provided
  if (!key) {
    return <Navigate to="/books" replace />;
  }

  // The error will be thrown and caught by the errorElement in the router.jsx app.
  if (!category) {
    throw new Error("Invalid key");
  }

  // Filter products based on the selected category
  const filteredProducts = products || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-300 mt-8">
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {categoryData.map((category) => (
            <NavLink
              key={category.path}
              to={category.path}
              className={({ isActive }) =>
                `px-4 py-2 text-sm sm:text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-green-500 font-bold border-b-4 border-green-500"
                    : "text-gray-700 hover:text-green-500"
                }`
              }
            >
              {category?.catName && category?.catName === "Sunnah"
                ? "Sunnah Products"
                : category?.catName}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Categories content */}
      <div className="p-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          {category?.catName && category?.catName === "Sunnah"
            ? "Sunnah Products"
            : category?.catName}
        </h2>
        {/* Products list */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 px-4">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No Products Available
              </h3>
              <p className="text-gray-500 text-center">
                We couldn&apos;t find any products matching this category.
              </p>
            </div>
          )}
        </div>
        {filteredProducts && (
          <Link to={`/products/${key}`}>
            {" "}
            <Button className="bg-primary mt-6">Load More</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Categories;

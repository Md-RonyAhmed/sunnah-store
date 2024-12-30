import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductsPagination from "./ProductsPagination";
import { useState, useEffect } from "react";
import FilterSection from "./Filtering/FilterSection";
import { Switch } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Shared/Loading";
import { Helmet } from "react-helmet-async";
import noProducts from "../../../src/assets/images/no.png";
import usePublicAxios from "../../hooks/usePublicAxios";

export const maxPrice = 100000;

const Products = () => {
  const { key } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [sortBy, setSortBy] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [price, setPrice] = useState([0, maxPrice]); // Price Range Filter Array
  const [sortedProducts, setSortedProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]); // Initialize empty sub category array
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const axiosPublicInstance = usePublicAxios();

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", key, search, currentPage],
    queryFn: async () => {
      let url = `products?page=${currentPage}&limit=${limit}`;

      if (search) {
        url += `&search=${search}`;
      }

      if (key) {
        url = `products/${key}?page=${currentPage}&limit=${limit}`;
        if (search) {
          url += `&search=${search}`;
        }
      }

      const res = await axiosPublicInstance.get(url);

      setTotalPages(res.data.pagination.totalPages);

      return res.data.data;
    },
    staleTime: 1000,
  });

  useEffect(() => {
    if (!productsData) return;

    let filtered = [...productsData];

    // Price Range Filtering
    if (price && price.length === 2) {
      const [minPrice, maxPrice] = price;
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    // Sorting
    switch (sortBy) {
      case 1: // Price: Low to High
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 2: // Price: High to Low
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 3: // Rating
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 4: // Top Sales
        filtered.sort((a, b) => b.individualRating - a.individualRating);
        break;
      default:
        break;
    }

    // In Stock Filter
    if (inStock) {
      filtered = filtered.filter((product) => product.status === true);
    }

    // Build subCategories for the UI
    if (key) {
      const newSubs = [];
      filtered.forEach((product) => {
        const sc = product["sub-category"];
        if (sc && !newSubs.includes(sc)) {
          newSubs.push(sc);
        }
      });
      setSubCategories(newSubs);
    } else {
      setSubCategories([]);
    }

    // Now filter by selectedSubCategory
    if (selectedSubCategory) {
      filtered = filtered.filter(
        (p) =>
          p["sub-category"] &&
          p["sub-category"].toLowerCase() === selectedSubCategory.toLowerCase()
      );
    }

    setSortedProducts(filtered);
  }, [productsData, sortBy, inStock, price, key, selectedSubCategory]);

  // Update title with total count
  let title = "";
  if (search) {
    title = `Search results for "${search}" (${sortedProducts?.length || 0})`;
  } else if (key) {
    const displayMap = {
      groceries: "Groceries & Foods",
      sunnah: "Sunnah Products",
    };
    const displayKey = displayMap[key.toLowerCase()] || key;
    title = `${displayKey}`;
  } else {
    title = `All Products`;
  }

  return (
    <div className="pt-5">
      <Helmet>
        <title>Sunnah Store | Products</title>
      </Helmet>

      <FilterSection
        filterProps={{
          sortBy,
          setSortBy,
          search,
          price,
          setPrice,
          subCategories,
          selectedSubCategory,
          setSelectedSubCategory,
        }}
      />

      <div className="flex items-center justify-between mt-3">
        <div className="flex w-1/2 justify-between items-center gap-5">
          <div>
            <h1 className="text-2xl border-b-4 border-primary w-fit capitalize">
              {title}
            </h1>
          </div>
        </div>

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

      {isLoading ? (
        <Loading />
      ) : (
        <div className="mb-8 mt-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center pb-20 px-4">
              <img
                src={noProducts}
                alt="No products found"
                className="mb-6 opacity-60"
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No Products Available
              </h3>
              <p className="text-gray-500 text-center">
                We couldn&apos;t find any products matching your criteria.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Only show pagination if there are products */}

      {!search && totalPages > 1 && (
        <div className="mx-auto mb-6">
          <ProductsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Products;

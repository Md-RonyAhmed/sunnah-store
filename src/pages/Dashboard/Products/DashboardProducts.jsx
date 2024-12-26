import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AddProductForm from "./Forms/AddProductForm";
import usePublicAxios from "../../../hooks/usePublicAxios";
import Loading from "../../../components/Shared/Loading";

const ManageProducts = () => {
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [features, setFeatures] = useState([]);
  const axiosInstance = usePublicAxios();

  // Fetch categories and subcategories
  const { data: categories, isLoading } = useQuery({
    queryKey: ["dashCatInfo"],
    queryFn: async () => {
      const res = await axiosInstance.get("category");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Handle category selection
  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    setSelectedCat(categoryName);
    setSelectedSubCat(""); // Reset subcategory
    setFeatures([]); // Reset features
  };

  // Handle sub-category selection
  const handleSubCategoryChange = (e) => {
    const subCategoryName = e.target.value;
    setSelectedSubCat(subCategoryName);

    // Find features for the selected subcategory
    const selectedCategory = categories.find(
      (cat) => cat.catName === selectedCat
    );
    const selectedSubCategory = selectedCategory?.subCats.find(
      (subCat) => subCat.subCatName === subCategoryName
    );
    setFeatures(selectedSubCategory?.keyFeatures || []);
  };

  // Get subcategories for the selected category
  const subCategories =
    categories?.find((cat) => cat.catName === selectedCat)?.subCats || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto bg-gray-100 shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-2xl font-semibold text-primary text-center mb-6">
        Add New Product
      </h2>

      {/* Category Dropdown */}
      <div className="relative">
        <label
          htmlFor="categories"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <select
          id="categories"
          className="block w-full px-4 py-2 text-sm border rounded-lg shadow-sm bg-white border-gray-300 text-gray-700 focus:outline-none"
          onChange={handleCategoryChange}
          value={selectedCat}
        >
          <option value="">Select Category</option>
          {categories?.map((category) => (
            <option key={category._id} value={category.catName}>
              {category.catName}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-Category Dropdown */}
      {subCategories.length > 0 && (
        <div className="relative mt-4">
          <label
            htmlFor="subcategories"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sub-Category
          </label>
          <select
            id="subcategories"
            className="block w-full px-4 py-2 text-sm border rounded-lg shadow-sm bg-white border-gray-300 text-gray-700 focus:outline-none"
            onChange={handleSubCategoryChange}
            value={selectedSubCat}
          >
            <option value="">Select Sub-Category</option>
            {subCategories.map((subCat) => (
              <option key={subCat.subCatName} value={subCat.subCatName}>
                {subCat.subCatName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Add Product Form */}
      <div className="mt-8">
        {selectedCat ? (
          subCategories.length > 0 && !selectedSubCat ? (
            <div className="flex flex-col items-center justify-center h-40 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
              <p className="text-gray-600 text-lg">
                Please select a{" "}
                <span className="text-orange-400">sub-category</span> to
                continue adding a product.
              </p>
            </div>
          ) : (
            <AddProductForm
              category={selectedCat}
              subCategory={selectedSubCat}
              features={features} // Pass features as props
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-40 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg">
              Please select a <span className="text-red-400">category</span> to
              continue adding a product.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;

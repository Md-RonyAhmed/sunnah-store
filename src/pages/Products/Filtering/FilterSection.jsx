import { useNavigate, useParams } from "react-router-dom";
import { categoryData } from "../../Home/categories/Categories";

const FilterSection = ({ setSortBy }) => {
  const navigate = useNavigate();
  const { key } = useParams();
  // Options for sorting
  const sortOptions = [
    { id: 0, label: "Select Sorting Option" },
    { id: 1, label: "Price: Low to High" },
    { id: 2, label: "Price: High to Low" },
    { id: 3, label: "Rating" },
    { id: 4, label: "Top Sales" },
  ];

  // Handle sorting selection change
  const handleSortChange = (e) => {
    const selectedValue = parseInt(e.target.value);
    setSortBy(selectedValue);
  };

  // Handle category selection change
  const handleCategoryChange = (e) => {
    const selectedPath = e.target.value;
    // Redirect to the selected category
    navigate(`/products${selectedPath}`);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-start gap-2 items-center pb-4 mb-4 bg-white rounded-lg space-y-3 lg:space-y-0">
      <h3 className="text-xl">Filter Items</h3>

      {/* Sorting Dropdown */}
      <div className="relative">
        <select
          id="sortBy"
          className="block w-full px-4 py-2 text-sm border rounded-lg shadow-sm bg-white border-gray-300 text-gray-700 focus:outline-none"
          onChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category Dropdown */}
      <div className="relative">
        <select
          id="categories"
          className="block w-full px-4 py-2 text-sm border rounded-lg shadow-sm bg-white border-gray-300 text-gray-700 focus:outline-none"
          onChange={handleCategoryChange}
          value={`/${key}`}
        >
          <option value="">Select Category</option>
          {categoryData.map((category) => (
            <option key={category.path} value={category.path}>
              {category.catName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSection;

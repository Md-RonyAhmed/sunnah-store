import { useNavigate, useParams } from "react-router-dom";
import { categoryData } from "../../Home/categories/Categories";
import { Box, Slider } from "@mui/material";
import { useState } from "react";
import { maxPrice } from "../Products";

const FilterSection = ({filterProps:{sortBy, setSortBy, search, price, setPrice}}) => {
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

  // Handle slider price change (temporary state for smooth interaction)
  const [tempPrice, setTempPrice] = useState(price);

  // Update temp price while scrolling
  const handleTempChange = (event, newPrice) => {
    setTempPrice(newPrice);
  };

  // debounce timer state
  const [debounceTimer, setDebounceTimer] = useState(null);
  // Update actual price after user finishes scrolling + debounce timer
  const handlePriceChangeCommitted = (event, newPrice) => {
    // Clear previous debounce timer if exists
    if (debounceTimer) clearTimeout(debounceTimer);

    // Set a new debounce timer to update the price after a delay
    const newTimer = setTimeout(() => {
      setPrice(newPrice);
      //console.log("New - Min", newPrice[0],"max", newPrice[1]);
    }, 1000); // 1-second debounce delay

    // Store the new timer ID in state to manage future timeouts
    setDebounceTimer(newTimer);
  };

  // Function to display the price text
  const priceText = (price) => {
    return `${price}`;
  };

  return (
    <div className="flex flex-col lg:flex-row justify-start gap-2 items-center pb-4 mb-4 bg-white rounded-lg space-y-3 lg:space-y-0">
      <h3 className="text-xl">Filter Items</h3>

      {/* Category Dropdown */}
      {!search && (
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
      )}

      {/* Sorting Dropdown */}
      <div className="relative">
        <select
          id="sortBy"
          className="block w-full px-4 py-2 text-sm border rounded-lg shadow-sm bg-white border-gray-300 text-gray-700 focus:outline-none"
          onChange={handleSortChange}
          value={sortBy}
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Slider */}
      <div className="mx-5">
        <Box sx={{ width: 250 }}>
          <div className="flex justify-center text-sm text-gray-700 ">
            <span>Select Price Range</span>
          </div>
          <Slider
            getAriaLabel={() => "Price range"}
            value={tempPrice} // Temporary value for smooth interaction
            onChange={handleTempChange} // Update temporary value on scroll
            onChangeCommitted={handlePriceChangeCommitted} // Update actual price when done
            valueLabelDisplay="auto"
            getAriaValueText={priceText}
            min={0} // Set minimum price
            max={maxPrice} // Set maximum price
            sx={{
              color: "#00bf63", // Equivalent to bg-green-700
              "& .MuiSlider-thumb": {
                backgroundColor: "#00bf63", // Thumb color
              },
              "& .MuiSlider-track": {
                backgroundColor: "#00bf63", // Track color
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#a7f3d0", // Rail color (lighter green for contrast)
              },
            }}
          />
          <div className="flex justify-between text-sm text-gray-700 ">
            <span>Min: {tempPrice[0]}</span>
            <span>Max: {tempPrice[1]}</span>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default FilterSection;

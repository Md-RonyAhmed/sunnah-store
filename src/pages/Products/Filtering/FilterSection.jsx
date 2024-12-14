const FilterSection = ({ setSortBy }) => {
  // Options for sorting
  const sortOptions = [
    { id: 0, label: "Select Sorting Option" },
    { id: 1, label: "Price: Low to High" },
    { id: 2, label: "Price: High to Low" },
    { id: 3, label: "Rating" },
    { id: 4, label: "Top Sales" },
  ];

  // Handle selection change
  const handleChange = (e) => {
    const selectedValue = parseInt(e.target.value); // Get selected integer value
    setSortBy(selectedValue); // Trigger the sorting function
    console.log(selectedValue);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center border-b pb-2 bg-white rounded-lg ">
      <h3 className="text-lg ">Filter Items</h3>
      <div className="relative">
        <label htmlFor="sortBy" className="sr-only">
          Sort By
        </label>
        <select
          id="sortBy"
          className="block w-full px-4 py-2 text-sm border rounded-lg shadow-sm bg-white border-gray-300 text-gray-700 focus:outline-none"
          onChange={handleChange}
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSection;

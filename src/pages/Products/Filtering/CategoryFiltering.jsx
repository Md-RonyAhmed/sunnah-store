
const CategoryFilter = ({ onSelectedCategory }) => {
  const categories = ["All", "Books", "Electronics", "Groceries & Foods", "Clothing", "Offers", "Others"];

  return (
    <div className="relative group">
      {/* Dropdown Trigger */}
      <div className="w-48 px-4 py-2 bg-white border rounded shadow-md text-gray-700 font-bold flex justify-between items-center cursor-pointer">
        <span>Categories</span>
        <span className="transform transition-transform group-hover:rotate-180 text-green-500">
          &#x25B2; {/* Upward triangle, rotate on hover */}
        </span>
      </div>

      {/* Dropdown Menu */}
      <ul className="absolute hidden group-hover:block bg-white border rounded shadow-lg  w-48 z-50">
        {categories.map((category, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-primary cursor-pointer"
            onClick={() => onSelectedCategory(category === "All" ? "" : category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;

import { useState, useRef, useEffect } from "react";

const CategoryFilter = ({ onSelectedCategory }) => {
  const categories = [
    "All",
    "Books",
    "Electronics",
    "Groceries & Foods",
    "Clothing",
    "Offers",
    "Others",
  ];

  const [selected, setSelected] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (category) => {
    setSelected(category);
    onSelectedCategory(category === "All" ? "" : category);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <div
        className="w-48 px-4 py-2 bg-white border rounded text-gray-700 font-bold flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>{selected}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-green-500`}
        >
          &#x25B2;
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute bg-white border rounded shadow-lg w-48 z-50 mt-1">
          {categories.map((category, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
              onClick={() => handleSelect(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryFilter;

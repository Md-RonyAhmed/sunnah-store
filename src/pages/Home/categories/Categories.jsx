import { NavLink, useParams, Navigate } from "react-router-dom";

function Categories() {
  /*
  Note: Sir, The "Products" tab can be removed from the navbar as the "Categories" section now handles product navigation dynamically.
  */
  const categoryData = [
    {
      catName: "Books",
      path: "/books",
    },
    {
      catName: "Electronics",
      path: "/electronics",
    },
    {
      catName: "Groceries & Fruits",
      path: "/groceries",
    },
    {
      catName: "Clothing",
      path: "/clothing",
    },
    {
      catName: "Offers",
      path: "/offers",
    },
    {
      catName: "Others",
      path: "/others",
    },
  ];

  const { key } = useParams(); // Get the dynamic key from the URL
  const category = categoryData.find((cat) => cat.path === `/${key}`); // Match the key with a category

  // Redirect to /books if no key is provided
  if (!key) {
    return <Navigate to="/books" replace />;
  }

  // The error will be thrown and caught by the errorElement in the router.jsx app.
  if (!category) {
    throw new Error("Invalid key");
  }

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-300 mt-2">
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
              {category.catName}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Categories content */}
      <div className="p-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          {category?.catName}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Here you can find all items related to {category?.catName}.
        </p>

        <div className="mt-4">
          <p className="text-sm sm:text-base">
            Items will be displayed here...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Categories;

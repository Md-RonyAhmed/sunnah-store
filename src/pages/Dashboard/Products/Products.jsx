import { useState } from "react";
import { subCats } from "../../../utils/staticSubCats";
import { categoryData } from "../../Home/categories/Categories";
import { SubCategories } from "./SubCategories";
import { TabPanel, Tabs, TabsBody } from "@material-tailwind/react";
import AddProductForm from "./Forms/AddProductForm";

const ManageProducts = () => {
  const [selectedCat, setSelectedCat] = useState("");

  // Handle category selection change
  const handleCategoryChange = (e) => {
    let selectedPath = e.target.value;
    if (selectedPath && selectedPath === "Sunnah") {
      selectedPath = "Sunnah Products";
    }
    setSelectedCat(selectedPath);
  };

  const subCategories = subCats[selectedCat] || []; // Get the subcategories for the selected category

  return (
    <>
      {/* Category Dropdown */}
      <h1 className="text-2xl font-semibold text-primary pb-5">Add Products</h1>

      <div className="relative">
        <select
          id="categories"
          className="block w-full px-4 py-2 text-sm border rounded-lg shadow-sm bg-white border-gray-300 text-gray-700 focus:outline-none"
          onChange={handleCategoryChange}
          value={selectedCat}
        >
          <option value="">Select Category</option>
          {categoryData.map((category) => (
            <option key={category.catName} value={category.catName}>
              {category?.catName && category?.catName === "Sunnah"
                ? "Sunnah Products"
                : category?.catName}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-Category Dropdown */}
      {/* Static category from  "../../../utils/staticSubCats";*/}
      {/* {subCategories.length > 0 && (
        <div className="relative mt-4">
          {/* <SubCategories subCategories={subCategories} /> /}
          <select className="block w-full px-4 py-2 text-sm border rounded-lg shadow-sm bg-white border-gray-300 text-gray-700 focus:outline-none">
            <option value="">Select Sub-Category</option>
            {subCategories.map((scat) => (
              <option key={scat} value={scat}>
                {scat}
              </option>
            ))}
          </select>
        </div>
      )} */}
      <div className="mt-5">
        <Tabs value="html">
          {subCategories.length > 0 && (
            <SubCategories subCategories={subCategories} />
          )}
          <TabsBody>
            {subCategories.map((sc) => (
              <TabPanel key={sc} value={sc}>
                {sc}
                <h1>Hello</h1>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>

      <div className="container">
        <AddProductForm/>
      </div>
    </>
  );
};

export default ManageProducts;

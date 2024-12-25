import { useState } from "react";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productImage: null,
    price: "",
    description: "",
    averageRating: "",
    keyFeatures: ["", "", ""], // Fixed 3 fields for key features
  });

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.keyFeatures];
    updatedFeatures[index] = value;
    setFormData({ ...formData, keyFeatures: updatedFeatures });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Product added successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto mt-2">
      
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              accept="image/*"
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              required
            />
          </div>
          
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <label
              htmlFor="averageRating"
              className="block text-sm font-medium text-gray-700"
            >
              Average Rating
            </label>
            <input
              type="number"
              id="averageRating"
              name="averageRating"
              value={formData.averageRating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              placeholder="Enter average rating (0-5)"
              required
            />
          </div>
        </div>

        {/* Key Features */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Key Features
          </label>
          <div className="grid grid-cols-3 gap-4">
            {formData.keyFeatures.map((feature, index) => (
              <input
                key={index}
                name={`${index === 1 ? "weight" : index === 2 ? "origin" : "quality"}`}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="mt-2 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                placeholder={`${index === 1 ? "weight" : index === 2 ? "origin" : "quality"}`}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 text-white font-medium shadow-lg hover:bg-primary/80 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;

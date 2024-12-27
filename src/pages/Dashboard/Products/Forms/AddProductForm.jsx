import { useState } from "react";
import usePrivateAxios from "../../../../hooks/usePrivateAxios";

const emptyForm = (category = "", subCategory = "", features = []) => ({
  productName: "", // The name of the product
  productImage: null, // The uploaded product image
  price: "", // The price of the product
  description: "", // The description of the product
  averageRating: "", // The average customer rating (0-5)
  keyFeatures: features.reduce(
    // Initialize keyFeatures as an object with feature names as keys and empty strings as values
    (acc, feature) => ({ ...acc, [feature]: "" }),
    {}
  ),
  category: category, // The category of the product
  subCategory: subCategory, // The subcategory of the product
});

const AddProductForm = ({ category, subCategory, features }) => {
  // State to manage the form data
  const [formData, setFormData] = useState(() =>
    emptyForm(category, subCategory, features)
  );

  // State to manage the submission state of the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Axios instance for authenticated requests
  const axiosPrivateInstance = usePrivateAxios();

  /**
   * Updates the value of a specific feature in the keyFeatures object.
   * @param {string} feature - The name of the feature to update.
   * @param {string} value - The new value for the feature.
   */

  const handleFeatureChange = (feature, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      keyFeatures: {
        ...prevFormData.keyFeatures,
        [feature]: value,
      },
    }));
    // console.log("checking....", formData); // Debugging: Log the updated formData
  };

  /**
   * Handles changes to the form inputs and updates the corresponding state.
   */
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value, // Handle file uploads separately
    });
  };

  /**
   * Handles form submission by sending form data to the backend.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Set submission state to true
    console.log("Submitting form data:", formData); // Debugging: Log form data being submitted

    try {
      // Send a POST request to the "add-product" endpoint
      const response = await axiosPrivateInstance.post("add-product", formData);
      if (response.data.success) {
        alert("Product added successfully!"); // Notify user of success
        setFormData(emptyForm(category, subCategory, features)); // Reset the form
      } else {
        alert("Failed to add product: " + response.data.message); // Notify user of failure
      }
    } catch (error) {
      console.error("Error adding product:", error); // Log any errors
      alert("An error occurred while adding the product."); // Notify user of error
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  /* Uncomment to allow adding more key features dynamically
  const handleAddFeature = () => {
    if (formData.keyFeatures.length < 6) {
      setFormData({
        ...formData,
        keyFeatures: [...formData.keyFeatures, ""],
      });
    } else {
      alert("You can only add up to 6 key features.");
    }
  };
  */

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
            {features.map((feature) => (
              <input
                key={feature}
                type="text"
                value={formData.keyFeatures[feature] || ""}
                onChange={(e) => handleFeatureChange(feature, e.target.value)}
                className="mt-2 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                placeholder={`Enter ${feature}`}
              />
            ))}
          </div>

          {/* Uncomment to allow adding more features dynamically
          <button
            type="button"
            onClick={handleAddFeature}
            className="mt-4 text-blue-600 hover:underline font-medium"
          >
            Add More Features
          </button>
          */}
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
            disabled={isSubmitting}
            className={`w-full rounded-lg bg-primary py-3 text-white font-medium shadow-lg hover:bg-primary/80 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;

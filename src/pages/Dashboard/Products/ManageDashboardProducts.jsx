import { useContext, useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../../contexts/AuthContext";
import usePrivateAxios from "../../../hooks/usePrivateAxios";

const ManageDashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosPrivateInstance = usePrivateAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPrivateInstance.get(
          `products/all?email=${user?.email}`
        );
        if (response.data.status) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [axiosPrivateInstance, user?.email]);

  const handleDelete = async (id) => {
    try {
      // await axiosPrivateInstance.delete(`product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="mt-32">
      <Typography variant="h4" className="text-center mb-6">
        Manage Products
      </Typography>
      <Card className="p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border-b p-4 text-left">Product Name</th>
              <th className="border-b p-4 text-left">Category</th>
              <th className="border-b p-4 text-left">Price</th>
              <th className="border-b p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ _id, name, category, price }) => (
              <tr key={_id}>
                <td className="border-b p-4">{name}</td>
                <td className="border-b p-4">{category}</td>
                <td className="border-b p-4">{price}</td>
                <td className="border-b p-4">
                  <Button
                    variant="outlined"
                    color="red"
                    onClick={() => handleDelete(_id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ManageDashboardProducts;

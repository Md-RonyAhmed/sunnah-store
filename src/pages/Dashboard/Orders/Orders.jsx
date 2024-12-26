import { DocumentIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect, useContext } from "react";
import usePrivateAxios from "../../../hooks/usePrivateAxios";
import { AuthContext } from "../../../contexts/AuthContext";

const TABLE_HEAD = [
  {
    head: "Invoice ID",
  },
  {
    head: "Customer Email",
  },
  {
    head: "Amount",
  },
  {
    head: "Order Issued",
  },
  {
    head: "Status",
  },
  {
    head: "Payment Method",
  },
  {
    head: "Total Items",
  },
  {
    head: "View or Download",
  },
  {
    head: "Actions",
  },
];

const Orders = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const axiosPrivateInstance = usePrivateAxios();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosPrivateInstance.get(
          `orders?email=${user?.email}`
        );
        if (response.data.success) {
          setRows(response.data.data); // অর্ডার ডেটা সেট করুন
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [axiosPrivateInstance, user?.email]);

  // Function to handle row deletion
  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Handle search term change and filter rows
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter rows based on the search term
  const filteredRows = rows.filter(
    (row) =>
      row._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.totalAmount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.orderDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="h-full w-full overflow-scroll ">
      <CardHeader
        floated={false}
        shadow={false}
        className="mb-2 rounded-none p-2"
      >
        <div>
          <h1 className="mt-32 text-black text-3xl text-center">
            Orders Invoice
          </h1>
        </div>
        <div className="w-full md:w-96  mt-6">
          <Input
            className=" focus:text-primary"
            label="Search Invoice"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </CardHeader>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map(({ head }) => (
              <th key={head} className="border-b border-gray-300 p-4">
                <div className="flex items-center gap-1">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold text-primary"
                  >
                    {head}
                  </Typography>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map(
            (
              { _id, email, totalAmount, orderDate, status, paymentMethod,items },
              index
            ) => {
              const isLast = index === filteredRows.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

              return (
                <tr key={_id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {_id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {totalAmount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {orderDate}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {status}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {paymentMethod==="cod"?"Cash on delivery": "Online Payment"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {items.length}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-2">
                      <IconButton variant="text" size="sm">
                        <DocumentIcon className="h-4 w-4 text-gray-900" />
                      </IconButton>
                      <IconButton variant="text" size="sm">
                        <ArrowDownTrayIcon
                          strokeWidth={3}
                          className="h-4 w-4 text-gray-900"
                        />
                      </IconButton>
                    </div>
                  </td>
                  <td className={classes}>
                    <IconButton
                      variant="text"
                      size="sm"
                      onClick={() => handleDelete(_id)}
                    >
                      <TrashIcon className="h-4 w-4 text-red-600" />
                    </IconButton>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
};
export default Orders;

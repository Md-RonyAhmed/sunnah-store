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
import { useState } from "react";
 
// Function to generate a random invoice ID
const generateRandomInvoiceId = () => {
  const prefixes = ["#MS-", "#RV-", "#QW-"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
  return randomPrefix + randomNumber;
};


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
    head: "Issued",
  },
  {
    head: "Payment Date",
  },
  {
    head: "Payment Method",
  },
  {
    head: " View or Download",
  },
  {
    head: "Actions", 
  },
];
 
const TABLE_ROWS = [
  {
    id: generateRandomInvoiceId(),
    email: "demo@gmail.com",
    amount: "$14,000",
    issued: "31 Jan 2024",
    date: "31 Feb 2024",
    paymentMethod:"Cash On Delivery"
  },
  {
    id: generateRandomInvoiceId(),
    email: "demo@gmail.com",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
    paymentMethod:"Cash On Delivery"
  },
  {
    id: generateRandomInvoiceId(),
    email: "demo@gmail.com",
    amount: "$20,000",
    issued: "12 Jan 2024",
    date: "12 Feb 2024",
    paymentMethod:"Cash On Delivery"
  },
  {
    id: generateRandomInvoiceId(),
    email: "demo@gmail.com",
    amount: "$5,600",
    issued: "10 Jan 2024",
    date: "10 Feb 2024",
    paymentMethod:"Cash On Delivery"
  },
  {
    id: generateRandomInvoiceId(),
    email: "demo@gmail.com",
    amount: "$5,600",
    issued: "10 Jan 2024",
    date: "10 Feb 2024",
    paymentMethod:"Cash On Delivery"
  },
];
 
const Orders = () =>  {

  const [rows, setRows] = useState(TABLE_ROWS); 
  const [searchTerm, setSearchTerm] = useState(""); 

  // Function to handle row deletion
  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id)); 
  };

   // Handle search term change and filter rows
   const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

   // Filter rows based on the search term
   const filteredRows = rows.filter(
    (row) =>
      row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.issued.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <h1 className="mt-32 text-black text-3xl text-center">Orders Invoice</h1>
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
            {TABLE_HEAD.map(({ head}) => (
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
            ({ id, email, amount, issued, date, paymentMethod }, index) => {
              const isLast = index === filteredRows.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";
 
              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex items-center gap-1">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {id}
                      </Typography>
                    </div>
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
                      {amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {issued}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {paymentMethod}
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
                  <IconButton variant="text" size="sm" onClick={() => handleDelete(id)}>
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </IconButton>
                </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </Card>
  );
}
export default Orders

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, Typography } from "@material-tailwind/react";

const data = [
  { name: "Jan", users: 4000, orders: 2400 },
  { name: "Feb", users: 3000, orders: 1398 },
  { name: "Mar", users: 2000, orders: 9800 },
  { name: "Apr", users: 2780, orders: 3908 },
  { name: "May", users: 1890, orders: 4800 },
  { name: "Jun", users: 2390, orders: 3800 },
  { name: "Jul", users: 3490, orders: 4300 },
];

const DashboardHome = () => {
  return (
    <div className="mt-32 text-2xl text-center">
      <Typography variant="h4" className="mb-6">Dashboard Home</Typography>
      
      <Card className="p-4 mb-6">
        <Typography variant="h5">User and Order Statistics</Typography>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
          <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
        </LineChart>
      </Card>

      {/* Add more cards or components for additional stats */}
      <Card className="p-4">
        <Typography variant="h5">Additional Statistics</Typography>
        {/* You can add more statistics here */}
      </Card>
    </div>
  );
};

export default DashboardHome;

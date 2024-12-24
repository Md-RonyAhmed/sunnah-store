import { FaHome, FaBox, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-gray-100 h-screen flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Sunnah Store</h2>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          <li className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
            <FaHome />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
            <FaBox />
            <span>Products</span>
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
            <FaUsers />
            <span>Users</span>
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
            <FaChartBar />
            <span>Analytics</span>
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
            <FaCog />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Link to={'/sunnah-store/profile'} className="flex items-center gap-3 p-2 w-full hover:bg-gray-700 rounded">
          <IoMdArrowRoundBack />
          <span>Back to Profile</span>
        </Link>
        <button className="flex items-center gap-3 p-2 w-full hover:bg-gray-700 rounded">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const TopBar = () => {
  return (
    <div className="bg-gray-100 p-4 flex items-center justify-between border-b border-gray-300">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {/* <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Search
        </button>
      </div> */}
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="p-6 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold text-lg">Total Sales</h3>
          <p className="text-2xl mt-2">$12,345</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold text-lg">New Orders</h3>
          <p className="text-2xl mt-2">76</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold text-lg">Users</h3>
          <p className="text-2xl mt-2">1,234</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold text-lg">Products</h3>
          <p className="text-2xl mt-2">456</p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <MainContent />
      </div>
    </div>
  );
};

export default AdminDashboard;

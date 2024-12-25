// src/components/Dashboard/Sidebar.jsx

import { NavLink } from "react-router-dom";
import {
  MdHome,
  MdShoppingCart,
  MdInventory,
  MdPeople,
  MdSettings,
  MdExitToApp,
} from "react-icons/md";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`${
        isOpen ? "block" : "hidden"
      } w-64 z-50 fixed left-0 bg-primary text-white transition-transform duration-500 flex flex-col min-h-full`}
    >
      {/* Navigation Links and Logout */}
      <nav className="mt-24">
        {/* Main Navigation */}
        <div className="flex flex-col flex-1">
          <NavLink
            to="/sunnah-store/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center py-2 px-4 hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <MdHome className="h-5 w-5 mr-3" />
            Dashboard
          </NavLink>
          <NavLink
            to="/sunnah-store/dashboard/orders"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <MdShoppingCart className="h-5 w-5 mr-3" />
            Orders
          </NavLink>
          <NavLink
            to="/sunnah-store/dashboard/products"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <MdInventory className="h-5 w-5 mr-3" />
            Products
          </NavLink>
          <NavLink
            to="/sunnah-store/dashboard/users"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 hover:bg-gray-700  ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <MdPeople className="h-5 w-5 mr-3" />
            Users
          </NavLink>
          <NavLink
            to="/sunnah-store/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <MdSettings className="h-5 w-5 mr-3" />
            Settings
          </NavLink>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full">
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 hover:bg-gray-700  ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <MdExitToApp className="h-5 w-5 mr-3" />
            Logout
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

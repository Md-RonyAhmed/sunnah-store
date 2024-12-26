// src/components/Dashboard/Sidebar.jsx

import { NavLink } from "react-router-dom";
import {
  MdHome,
  MdShoppingCart,
  MdInventory,
  MdPeople,
  MdExitToApp,
} from "react-icons/md";
import { TbShoppingCartCog } from "react-icons/tb";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Sidebar = ({ isOpen }) => {
  const { signOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to Logout?",
      text: "You can stay our site!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00BF63",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {})
          .catch((err) => console.log(err));
        Swal.fire({
          title: "Logout Successfully!",
          icon: "success",
        });
      }
    });
  };

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
            Add Products
          </NavLink>
          <NavLink
            to="/sunnah-store/dashboard/manage-products"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <TbShoppingCartCog className="h-5 w-5 mr-3" />
            Manage Products
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
          
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full">
          <button
            className="flex items-center py-2 px-4 hover:bg-gray-700 w-full"
            onClick={handleLogout}
          >
            <MdExitToApp className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Input,
  Collapse,
} from "@material-tailwind/react";
import { useContext, useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { AuthContext } from "../../../contexts/AuthContext";
import Marquee from "./Marquee";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);

  // For avatar dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-4">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to={"/products"}
          className={({ isActive }) =>
            isActive
              ? "text-primary underline underline-offset-4 flex items-center"
              : "text-black flex items-center"
          }
        >
          Products
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            isActive
              ? "text-primary underline underline-offset-4 flex items-center"
              : "text-black flex items-center"
          }
        >
          About
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            isActive
              ? "text-primary underline underline-offset-4 flex items-center"
              : "text-black flex items-center"
          }
        >
          Contact
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to={"/cart"}
          className={({ isActive }) =>
            isActive
              ? "text-primary underline underline-offset-4 flex items-center"
              : "text-black flex items-center"
          }
        >
          <FiShoppingCart className="mr-2 size-5" />
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to={"/wishlist"}
          className={({ isActive }) =>
            isActive
              ? "text-primary underline underline-offset-4 flex items-center"
              : "text-black flex items-center"
          }
        >
          <FaHeart className=" text-red-500 size-5" />
        </NavLink>
      </Typography>
    </ul>
  );

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        // Successfully logged out
        setProfileOpen(false);
      })
      .catch((err) => console.log(err));
  };

  // Determine avatar: if user.photoURL is available, use it; otherwise use placeholder
  const avatarURL =
    user && user.photoURL
      ? user.photoURL
      : "https://api.dicebear.com/5.x/bottts/svg?seed=User";

  return (
    <div className="w-full fixed top-0 z-40 bg-[#FBFFFF] shadow-sm">
      <Marquee />

      <Navbar className="px-0 py-1 mx-auto rounded-none shadow-none">
        <div className="flex flex-wrap items-center justify-between text-blue-gray-900">
          {/* Logo & Search Bar */}
          <div className="order-1 font-medium cursor-pointer">
            <div className="flex flex-col items-start justify-start gap-6 md:flex-row md:items-center md:justify-center">
              <Link to="/">
                {/* Logo file */}
                <div className="flex items-center justify-center">
                  <img src={logo} alt="logo" className="w-20" />
                  <span className="text-2xl font-semibold text-primary">
                    Sunnah Store
                  </span>
                </div>
              </Link>
            </div>
          </div>
          {/* Product Search Box */}
          <div className="relative order-3 w-full gap-2 m-4 md:flex md:w-max md:order-2 md:m-0">
            <Input
              type="search"
              color="gray"
              label="Search Products"
              className="pr-[5.5rem]"
              containerProps={{
                className: "md:min-w-[360px]",
              }}
              placeholder="search by products name"
            />
            <Button
              size="sm"
              className="!absolute right-1 top-1 rounded bg-primary"
            >
              Search
            </Button>
          </div>
          {/* Nav Links */}
          <div className="flex items-center order-2 gap-4 pr-4 md:order-3">
            <div className="hidden mr-4 lg:block">{navList}</div>

            {/* If user is logged in, show avatar dropdown; else show Sign In button */}
            {!user ? (
              <div className="flex items-center gap-x-1">
                <NavLink to={"/signin"}>
                  <Button
                    size="sm"
                    className="hidden lg:inline-block bg-primary"
                  >
                    <span>Sign in</span>
                  </Button>
                </NavLink>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <img
                  src={avatarURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer font-bold"
                  onClick={() => setProfileOpen((prev) => !prev)}
                />
                {profileOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white border rounded shadow-lg">
                    <div className="px-4 py-2 hover:bg-[#00BF63] hover:text-white  text-[#00BF63]">
                      <Link to={"/profile"} className="font-semibold">
                        {user.displayName}
                      </Link>
                    </div>
                    <hr />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-[#00BF63] hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <IconButton
              variant="text"
              className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={true}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6 z-[99]"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 z-[100]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <Collapse open={openNav}>
            {navList}
            <div className="flex items-center gap-x-1 mt-4">
              <NavLink to={"/signin"} className="w-full">
                <Button fullWidth variant="text" size="sm" className="">
                  <span>Sign In</span>
                </Button>
              </NavLink>
              <NavLink to={"/signup"} className="w-full">
                <Button fullWidth variant="gradient" size="sm" className="">
                  <span>Sign Up</span>
                </Button>
              </NavLink>
            </div>
          </Collapse>
        </Collapse>
      </Navbar>
    </div>
  );
}

import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import App from "../App";
import SignIn from "../pages/Auth/SignIn/SignIn";
import AuthLayout from "../Layout/AuthLayout";
import SignUp from "../pages/Auth/SignUp/SignUp";
import Products from "../pages/Products/Products";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";
import ProductDetails from "../pages/Products/ProductDetails";
import Cart from "../pages/Cart/Cart";
import WishList from "../pages/WishList/WishList";
import Reset from "../pages/Auth/SignIn/Reset";
import Profile from "../pages/Profile/Profile";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../pages/Error/ErrorPage";
import Checkout from "../pages/Checkout/Checkout";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import Invoice from "../pages/OrderSuccess/Invoice";
import DashboardLayout from "../Layout/DashboardLayout";
import Orders from "../pages/Dashboard/Orders/Orders";
import Users from "../pages/Dashboard/Users/Users";
import ManageProducts from "../pages/Dashboard/Products/DashboardProducts";
import DashboardHome from "../pages/Dashboard/Home/DashboardHome";
import AdminRoute from "./AdminRoute";
import ManageDashboardProducts from "../pages/Dashboard/Products/ManageDashboardProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/books" replace />,
        errorElement: <ErrorPage />,
      },
      {
        path: ":key",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:key",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: (
          <PrivateRoutes>
            <ProductDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "sunnah-store/about",
        element: <About />,
      },
      {
        path: "sunnah-store/contact",
        element: <Contact />,
      },
      {
        path: "sunnah-store/cart",
        element: (
          <PrivateRoutes>
            <Cart />
          </PrivateRoutes>
        ),
      },
      {
        path: "sunnah-store/checkout",
        element: (
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        ),
      },
      {
        path: "sunnah-store/order-success",
        element: (
          <PrivateRoutes>
            <OrderSuccess />
          </PrivateRoutes>
        ),
      },
      {
        path: "sunnah-store/invoice",
        element: (
          <PrivateRoutes>
            <Invoice />
          </PrivateRoutes>
        ),
      },
      {
        path: "sunnah-store/wishlist",
        element: (
          <PrivateRoutes>
            <WishList />
          </PrivateRoutes>
        ),
      },
      {
        path: "sunnah-store/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "sunnah-store/signin",
        element: <SignIn />,
      },
      {
        path: "sunnah-store/signup",
        element: <SignUp />,
      },
      {
        path: "sunnah-store/reset",
        element: <Reset />,
      },
    ],
  },
  {
    path: "sunnah-store/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "products",
        element: <ManageProducts />,
      },
      {
        path: "manage-products",
        element: <ManageDashboardProducts />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

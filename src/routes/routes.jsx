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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
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
        element: <ProductDetails />,
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
        element: <Cart />,
      },
      {
        path: "sunnah-store/wishlist",
        element: <WishList />,
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

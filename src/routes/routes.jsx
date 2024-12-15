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
import axios from "axios";
<<<<<<< HEAD
import Cart from "../pages/Cart/Cart";
=======
import ProductDetails from "../pages/Products/ProductDetails";
import Cart from "../pages/Cart/Cart";
import WishList from "../pages/WishList/WishList";
>>>>>>> 48f6e69cede072f4ec23577511dd12e9b881ec63

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Navigate to="/books" replace />,
      },
      {
        path: ":key",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
        loader: () =>
          axios.get("https://sunnah-store-server-azure.vercel.app/products"),
      },
      {
        path: "products/:key",
        element: <Products />,
        loader: ({ params }) =>
          axios.get(
            `https://sunnah-store-server-azure.vercel.app/products/${params.key}`
          ),
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
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
        path: "cart",
        element: <Cart/>,
<<<<<<< HEAD
=======
      },
      {
        path: "wishlist",
        element: <WishList/>,
>>>>>>> 48f6e69cede072f4ec23577511dd12e9b881ec63
      }
    ],
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

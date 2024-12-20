import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import "@smastrom/react-rating/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <CartProvider>
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
        </CartProvider>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);

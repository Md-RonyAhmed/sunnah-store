import { createContext, useEffect, useState } from "react";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "../utils/localStorage";

// eslint-disable-next-line react-refresh/only-export-components
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(
    getDataFromLocalStorage("wishlist")
  );

  // Sync cartItems to localStorage whenever it changes
  useEffect(() => {
    setDataToLocalStorage("wishlist", wishlistItems);
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existingItems = prevItems.find((item) => item._id === product._id);
      if (!existingItems) {
        return [...prevItems, product];
      } else {
        return prevItems.filter((item) => item._id !== product._id);
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

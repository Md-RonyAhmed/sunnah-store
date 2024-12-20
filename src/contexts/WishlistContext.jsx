import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setwishlistItems] = useState([]);

    const addToWishlist = (product) => {
        setwishlistItems((prevItems) => {
          const existingItems = prevItems.find(item => item._id === product._id);
          if (!existingItems) {
            return [...prevItems, product];
          } else {
            return prevItems.filter(item => item._id !== product._id)
          }
        });
      };

      const removeFromWishlist = (id) => {
        setwishlistItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

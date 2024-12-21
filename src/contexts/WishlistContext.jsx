import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const addToWishlist = (product) => {
        setWishlistItems((prevItems) => {
          const existingItems = prevItems.find(item => item._id === product._id);
          if (!existingItems) {
            return [...prevItems, product];
          } else {
            return prevItems.filter(item => item._id !== product._id)
          }
        });
      };

      const removeFromWishlist = (id) => {
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

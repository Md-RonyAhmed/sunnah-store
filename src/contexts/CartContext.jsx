/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
export const CartContext = createContext();
export const shipping = 55;
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        // যদি পণ্য ইতিমধ্যে কার্টে থাকে, তাহলে পরিমাণ বাড়ান
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // নতুন পণ্য যোগ করুন
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item._id === id);
      if (item.quantity === 1) {
        return prevItems.filter((item) => item._id !== id);
      }
      return prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };
  const getTotalPrice = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const total = subtotal + shipping;
    return total;
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

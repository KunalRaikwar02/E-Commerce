import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // LocalStorage se cart load karo agar pehle se saved hai
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("veltorn_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Jab bhi cart change ho, LocalStorage mein save karo
  useEffect(() => {
    localStorage.setItem("veltorn_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Item to Cart
  const addToCart = (product, selectedSize, quantity = 1) => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    setCartItems((prevItems) => {
      // Check karo agar same product aur same size pehle se cart mein hai
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );

      if (existingItemIndex !== -1) {
        // Agar hai, toh sirf quantity badhao
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Agar naya hai, toh add karo
        return [
          ...prevItems,
          { ...product, size: selectedSize, quantity: quantity },
        ];
      }
    });
    // Cart drawer kholo add hone ke baad
    setIsCartOpen(true);
  };

  // Remove Item
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Update Quantity
  const updateQuantity = (id, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseInt(item.price) * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        totalItems,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
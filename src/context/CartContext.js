import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Persist cart whenever it changes
  useEffect(() => {
    localStorage.setItem("uv-power-cart", JSON.stringify(cart));
    setCartCount(cart.reduce((sum, item) => sum + (item.quantity || 1), 0));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  const loadCart = () => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("uv-power-cart")) || [];
      setCart(savedCart);
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCart([]);
    }
  };

  const addToCart = (product) => {
    try {
      const productWithQuantity = {
        ...product,
        quantity: product.quantity || 1,
        cartItemId: `${product.id}-${Date.now()}`
      };

      // Check if product already exists
      const existingIndex = cart.findIndex(
        item => item.id === product.id && 
                 JSON.stringify(item.color) === JSON.stringify(product.color) && 
                 JSON.stringify(item.size) === JSON.stringify(product.size)
      );

      if (existingIndex > -1) {
        // Update quantity if product exists
        const updatedCart = [...cart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: (updatedCart[existingIndex].quantity || 1) + (product.quantity || 1)
        };
        setCart(updatedCart);
      } else {
        // Add new product
        setCart([...cart, productWithQuantity]);
      }

      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  };

  const removeFromCart = (cartItemId) => {
    try {
      setCart(cart.filter(item => item.cartItemId !== cartItemId));
      return true;
    } catch (error) {
      console.error("Error removing from cart:", error);
      return false;
    }
  };

  const updateQuantity = (cartItemId, quantity) => {
    try {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }

      setCart(
        cart.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = () => {
    try {
      setCart([]);
      localStorage.removeItem("uv-power-cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const priceValue = typeof item.price === 'number' ? item.price : parseInt(item.price?.toString().replace(/[^0-9]/g, "") || 0);
      return total + (priceValue * (item.quantity || 1));
    }, 0);
  };

  const value = {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

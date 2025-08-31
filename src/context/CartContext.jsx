import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { token, isAuthenticated } = useUser();

  const fetchCart = async () => {
    if (!isAuthenticated || !token) return;
    try {
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const items = response.data.items.map((item) => ({
        ...item.productId,
        quantity: item.quantity,
      }));
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, token]);

  const addToCart = async (product) => {
    console.log("CartContext.addToCart called:", product);
    const key = product._id || product.id;
    if (!key) return;

    setCartItems((prev) => {
      const newItem = { ...product, quantity: 1 };
      if (!newItem.image) {
        if (Array.isArray(product.images) && product.images.length > 0) {
          newItem.image = product.images[0];
        } else if (product.image) {
          newItem.image = product.image;
        } else {
          newItem.image = "/placeholder.svg";
        }
      }
      newItem._id = product._id || product.id;
      newItem.id = product.id || product._id;
      const existing = prev.find((item) => (item._id || item.id) === key);
      if (existing) {
        return prev.map((item) =>
          (item._id || item.id) === key
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        return [...prev, newItem];
      }
    });

    if (isAuthenticated && token) {
      try {
        await axios.post(
          "http://localhost:5000/api/cart/add",
          { productId: key },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
        // Revert optimistic update if needed
        fetchCart();
      }
    }
  };

  const removeFromCart = async (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId && item._id !== productId));

    if (isAuthenticated && token) {
      try {
        await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
        fetchCart();
      }
    }
  };

  const updateQuantity = async (productId, qty) => {
    setCartItems((prev) => {
      if (qty <= 0) {
        return prev.filter((item) => item.id !== productId && item._id !== productId);
      }
      return prev.map((item) => {
        if ((item._id || item.id) === productId) {
          return { ...item, quantity: qty };
        }
        return item;
      });
    });

    if (isAuthenticated && token) {
      try {
        await axios.put(
          "http://localhost:5000/api/cart/update",
          { productId, quantity: qty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error updating cart:", error);
        fetchCart();
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);

    if (isAuthenticated && token) {
      try {
        await axios.delete("http://localhost:5000/api/cart/clear", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
        fetchCart();
      }
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

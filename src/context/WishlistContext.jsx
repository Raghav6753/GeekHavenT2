import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { token, isAuthenticated } = useUser();

  const fetchWishlist = async () => {
    if (!isAuthenticated || !token) return;
    try {
      const response = await axios.get("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(response.data.items);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [isAuthenticated, token]);

  const addToWishlist = async (product) => {
    const key = product._id || product.id;
    if (!key) return;

    setWishlistItems((prev) => {
      if (prev.find((item) => (item._id || item.id) === key)) return prev;
      const newItem = { ...product };
      if (!newItem.image) {
        if (Array.isArray(product.images) && product.images.length > 0) newItem.image = product.images[0];
        else newItem.image = "/placeholder.svg";
      }
      if (!newItem._id) newItem._id = product._id || product.id;
      if (!newItem.id) newItem.id = product.id || product._id;
      return [...prev, newItem];
    });

    if (isAuthenticated && token) {
      try {
        await axios.post(
          "http://localhost:5000/api/wishlist/add",
          { productId: key },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        fetchWishlist();
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlistItems((prev) => prev.filter((item) => (item._id || item.id) !== productId));

    if (isAuthenticated && token) {
      try {
        await axios.delete(`http://localhost:5000/api/wishlist/remove/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error removing from wishlist:", error);
        fetchWishlist();
      }
    }
  };

  const clearWishlist = async () => {
    setWishlistItems([]);

    if (isAuthenticated && token) {
      try {
        await axios.delete("http://localhost:5000/api/wishlist/clear", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error clearing wishlist:", error);
        fetchWishlist();
      }
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

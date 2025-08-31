import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const key = product._id || product.id;
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
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => (item._id || item.id) !== productId));
  };

  const clearWishlist = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

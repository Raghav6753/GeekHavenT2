import React, { useState, useEffect } from "react";
import { Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/productcard";
import "./wishlist.css";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlistItems, clearWishlist, removeFromWishlist } = useWishlist();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page-container">
        <div className="wishlist-empty-container">
          <div className="wishlist-empty-content">
            <Heart className="wishlist-empty-icon" />
            <h1 className="wishlist-empty-title">Your wishlist is empty</h1>
            <p className="wishlist-empty-text">
              Save items you love to your wishlist and come back to them later.
            </p>
            <div className="wishlist-empty-buttons">
              <button className="browse-products-btn" onClick={() => navigate("/search")}>
                Browse Products
              </button>
              <button className="go-back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft className="go-back-icon" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page-container">
      {/* Populated Wishlist Header */}
      <div className="wishlist-header">
        <div>
          <h1 className="wishlist-full-title">My Wishlist</h1>
          <p className="wishlist-item-count">{wishlistItems.length} items saved</p>
        </div>
        <div className="wishlist-actions">
          <button className="clear-all-btn" onClick={clearWishlist}>
            Clear All
          </button>
          <button className="go-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft className="go-back-icon" />
            Back
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id || item._id} onClick={() => handleProductClick(item.id || item._id)} style={{ cursor: "pointer" }}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
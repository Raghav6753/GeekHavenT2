import React, { useState, useEffect } from "react";
import { Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/productcard";
import "./wishlist.css";

export default function WishlistPage({ wishlistItems = [], setWishlistItems }) {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const removeItem = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (!isClient) {
    return null;
  }

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

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} onClick={() => handleProductClick(item.id)} style={{ cursor: "pointer" }}>
            <ProductCard
              id={item.id}
              title={item.title}
              price={item.price}
              originalPrice={item.originalPrice}
              image={item.image}
              seller={item.seller}
              rating={4.9}
              reviewCount={89}
              condition={item.condition}
              isLiked={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
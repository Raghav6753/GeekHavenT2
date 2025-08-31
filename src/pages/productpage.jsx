
import { useProducts } from "../context/ProductsContext";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Heart, Star, MessageCircle, Truck, Shield, RotateCcw, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./product.css"
import { useSeed } from "../context/SeedContext";
export default function ProductDetailPage({ setCartOpen, onAddToWishlist }) {
	const { products, loading, error } = useProducts();
	const { id: productId } = useParams();
	const navigate = useNavigate();
	const { addToCart, clearCart } = useCart();
	const [product, setProduct] = useState(null);
	const [selectedImage, setSelectedImage] = useState(0);
	const [activeTab, setActiveTab] = useState("description");
		const { wishlistItems } = useWishlist();
		const isLiked = wishlistItems?.some(item => item.id === product?.id || item._id === product?._id);

	useEffect(() => {
		const productData = products.find((p) => p.id === productId || p._id === productId);
		if (productData) {
			setProduct(productData);
		}
	}, [productId, products]);

	if (!product) {
		return (
			<div className="product-page-container">
				<div className="product-not-found">
					<h1 className="not-found-title">Product not found</h1>
				</div>
			</div>
		);
	}

	const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

	const handleAddToCart = () => {
		addToCart(product);
		if (setCartOpen) setCartOpen(true);
	};

		const { addToWishlist } = useWishlist();
		const handleAddToWishlist = () => {
			addToWishlist(product);
		};

	const { checksumForId, addLog } = useSeed();

	const handleBuyNow = () => {
		clearCart();
		addToCart(product);
		navigate("/checkout");
	};

	return (
		<div className="product-page-container">
			<div className="container">
				{/* Back Button */}
				<button className="back-button" onClick={() => window.history.back()}>
					<ArrowLeft className="back-icon" />
					Back to Products
				</button>
				{/* Heart Icon for Wishlist */}
				<button className="wishlist-btn" onClick={handleAddToWishlist} style={{ position: "absolute", top: 20, right: 20 }}>
					<Heart className="wishlist-icon" />
				</button>

				<div className="product-layout-grid">
          {/* Product Images */}
          <div className="image-gallery-section">
            <div className="main-image-wrapper">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="main-product-image"
              />
            </div>
            <div className="thumbnail-grid">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`thumbnail-button ${selectedImage === index ? "active" : ""}`}
                >
                  <img
                    src={image}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className="thumbnail-image"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-badges">
              <span className="badge secondary-badge">{product.condition}</span>
              <span className="badge outline-badge">{product.category}</span>
              {discount > 0 && <span className="badge primary-badge">-{discount}%</span>}
            </div>
 			<h1 className="product-title">{product.title} <span className="product-id">#{(product.id || product._id) + checksumForId(product.id || product._id)}</span></h1>

            <div className="product-rating">
              <Star className="rating-star-icon" />
              <span className="rating-value">{product.rating}</span>
              <span className="review-count">({product.reviewCount} reviews)</span>
            </div>

            <div className="product-price-section">
              <span className="current-price">${product.price}</span>
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice}</span>
              )}
            </div>

            {/* Seller Info */}
            <div className="seller-card">
              <div className="seller-info">
                <img src={typeof product.seller === 'object' && product.seller?.avatar ? product.seller.avatar : '/placeholder.svg'} alt={typeof product.seller === 'object' && product.seller?.name ? product.seller.name : product.seller} className="seller-avatar" />
                <div className="seller-details">
                  <h3 className="seller-name">{typeof product.seller === 'object' && product.seller?.name ? product.seller.name : product.seller}</h3>
                  <div className="seller-stats">
                    <Star className="seller-star-icon" />
                    <span>{typeof product.seller === 'object' && product.seller?.rating ? product.seller.rating : product.rating} ({typeof product.seller === 'object' && product.seller?.reviewCount ? product.seller.reviewCount : product.reviewCount} reviews)</span>
                    <span>•</span>
                    <span>Joined {typeof product.seller === 'object' && product.seller?.joinedDate ? product.seller.joinedDate : ''}</span>
                  </div>
                </div>
								<button className="contact-seller-btn" onClick={() => { addLog(`contact:${product.id || product._id}`); navigate(`/contact/${product.id || product._id}`); }}>
									<MessageCircle className="contact-icon" />
									Contact
								</button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="shipping-info-grid">
              <div className="shipping-item">
                <Truck className="shipping-icon" />
                <span className="shipping-label">Shipping</span>
                <span className="shipping-value">
                  {product.shipping && product.shipping.cost ? product.shipping.cost : "Free"}
                </span>
              </div>
              <div className="shipping-item">
                <Shield className="shipping-icon" />
                <span className="shipping-label">Protection</span>
                <span className="shipping-value">
                  {product.shipping && product.shipping.protection ? product.shipping.protection : "Buyer Protection included"}
                </span>
              </div>
              <div className="shipping-item">
                <RotateCcw className="shipping-icon" />
                <div>
                  <div className="shipping-label">Returns</div>
                  <div className="shipping-value">30-day policy</div>
                </div>
                </div>
              </div>

            {/* Action Buttons */}
            <div className="action-buttons-grid">
              <button className="action-btn add-to-cart-btn" onClick={handleAddToCart}>
                <ShoppingCart className="action-icon" />
                Add to Cart
              </button>
              <button className="action-btn buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button className={`action-btn wishlist-btn ${isLiked ? "liked" : ""}`}>
                <Heart className={`action-icon ${isLiked ? "filled" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs-container">
          <div className="tabs-list">
            <button
              onClick={() => setActiveTab("description")}
              className={`tabs-trigger ${activeTab === "description" ? "active" : ""}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`tabs-trigger ${activeTab === "specifications" ? "active" : ""}`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`tabs-trigger ${activeTab === "pricing" ? "active" : ""}`}
            >
              Price History
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === "description" && (
              <div className="tab-card">
                <h3 className="tab-title">Product Description</h3>
                <p className="tab-description">{product.description}</p>
              </div>
            )}

						{activeTab === "specifications" && (
							<div className="tab-card">
								<h3 className="tab-title">Specifications</h3>
								<div className="spec-list">
									{product.specifications ? (
										Object.entries(product.specifications).map(([key, value]) => (
											<div key={key} className="spec-item">
												<span className="spec-label">{key}</span>
												<span className="spec-value">{value}</span>
											</div>
										))
									) : (
										<span className="spec-value">No specifications available.</span>
									)}
								</div>
							</div>
						)}

						{activeTab === "pricing" && (
							<div className="tab-card">
								<h3 className="tab-title">Price History</h3>
								<div className="price-history-list">
									{product.priceHistory && product.priceHistory.length > 0 ? (
										product.priceHistory.map((entry, index) => (
											<div key={index} className="price-history-item">
												<span className="price-history-date">{entry.date}</span>
												<span className="price-history-price">${entry.price}</span>
											</div>
										))
									) : (
										<span className="price-history-value">No price history available.</span>
									)}
								</div>
							</div>
						)}
          </div>
        </div>
      </div>
    </div>
  );
}

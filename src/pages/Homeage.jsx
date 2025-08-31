"use client";

import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { TrendingUp, Zap, Shield, Users } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/productcard";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/cartside";
import "./Homeage.css";

const CategoryFilter = ({ onCategoryChange }) => {
	const categories = ["All", "Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Toys", "Automotive", "Health & Beauty"];
	const [activeCategory, setActiveCategory] = useState("All");

	const handleClick = (category) => {
		setActiveCategory(category);
		onCategoryChange(category);
	};

	return (
		<div className="category-filter-container">
			{categories.map((category) => (
				<button
					key={category}
					onClick={() => handleClick(category)}
					className={`category-filter-button ${activeCategory === category ? "active" : ""}`}
				>
					{category}
				</button>
			))}
		</div>
	);
};

const Footer = () => (
	<footer className="footer-container">
		<div className="footer-content">
			<div className="footer-brand">
				<h3 className="footer-logo">ResellerHub</h3>
				<p className="footer-description">
					The ultimate marketplace for buying and selling pre-owned items with confidence.
				</p>
			</div>
			<div className="footer-links">
				<h4 className="footer-links-title">For Buyers</h4>
				<ul className="footer-list">
					<li>Browse Products</li>
					<li>How to Buy</li>
					<li>Buyer Protection</li>
					<li>Customer Support</li>
				</ul>
			</div>
			<div className="footer-links">
				<h4 className="footer-links-title">For Sellers</h4>
				<ul className="footer-list">
					<li>Start Selling</li>
					<li>Seller Guidelines</li>
					<li>Pricing Tips</li>
					<li>Seller Support</li>
				</ul>
			</div>
			<div className="footer-links">
				<h4 className="footer-links-title">Company</h4>
				<ul className="footer-list">
					<li>About Us</li>
					<li>Privacy Policy</li>
					<li>Terms of Service</li>
					<li>Contact</li>
				</ul>
			</div>
		</div>
		<div className="footer-copyright">
			<p>&copy; 2025 ResellerHub. All rights reserved.</p>
		</div>
	</footer>
);

export default function HomePage({ setCartOpen, onAddToWishlist }) {
		 const { filteredProducts, category, setCategory, loading, error } = useProducts();
		 const navigate = useNavigate();
		 const { addToCart } = useCart();

		 const handleCategoryChange = (cat) => {
			 setCategory(cat === "All" ? "all" : cat);
		 };

		 const handleAddToCart = (product) => {
			 addToCart(product);
			 if (setCartOpen) setCartOpen(true);
		 };

		 return (
			 <div className="app-container">
			
			{/* CartSidebar is now rendered in App.jsx */}
			{/* Hero Section */}
			<section className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">
						The Ultimate <span className="hero-highlight">Reselling</span> Marketplace
					</h1>
					<p className="hero-subtitle">
						Buy and sell pre-owned items with confidence. Join thousands of sellers and discover amazing deals every day.
					</p>
					<div className="hero-buttons">
						<button className="primary-btn" onClick={() => navigate('/sell')}>Start Selling</button>
						<button onClick={() => navigate('/search')} className="secondary-btn">Browse Products</button>
					</div>
				</div>
			</section>
			{/* Features Section */}
			<section className="features-section">
				<div className="features-container">
					<div className="feature-item">
						<div className="feature-icon-wrapper">
							<TrendingUp className="feature-icon" />
						</div>
						<h3 className="feature-title">Best Prices</h3>
						<p className="feature-description">Find the best deals from verified sellers</p>
					</div>
					<div className="feature-item">
						<div className="feature-icon-wrapper">
							<Shield className="feature-icon" />
						</div>
						<h3 className="feature-title">Secure Trading</h3>
						<p className="feature-description">Protected transactions with buyer guarantee</p>
					</div>
					<div className="feature-item">
						<div className="feature-icon-wrapper">
							<Zap className="feature-icon" />
						</div>
						<h3 className="feature-title">Fast Delivery</h3>
						<p className="feature-description">Quick shipping from local sellers</p>
					</div>
					<div className="feature-item">
						<div className="feature-icon-wrapper">
							<Users className="feature-icon" />
						</div>
						<h3 className="feature-title">Community</h3>
						<p className="feature-description">Join 50k+ active buyers and sellers</p>
					</div>
				</div>
			</section>
			{/* Products Section */}
			<section className="products-section">
				<div className="products-container">
					<div className="products-header">
						<h2 className="products-title">Latest Listings</h2>
						<button onClick={() => navigate('/search')} className="secondary-btn-sm">View All</button>
					</div>
					<div className="products-filter">
						<CategoryFilter onCategoryChange={handleCategoryChange} />
					</div>
										 <div className="products-grid">
											 {loading ? (
												 <p>Loading products...</p>
											 ) : error ? (
												 <p className="no-products-text">{error}</p>
											 ) : filteredProducts.length > 0 ? (
												 filteredProducts.map((product) => (
													 <ProductCard key={product._id || product.id} product={product} setCartOpen={setCartOpen} onAddToWishlist={onAddToWishlist} />
												  ))
											 ) : (
												 <div className="no-products">
													 <p className="no-products-text">No products found in this category.</p>
													 <button className="secondary-btn-sm" onClick={() => handleCategoryChange("All")}>View All Products</button>
												 </div>
											 )}
										 </div>
				</div>
			</section>
			<Footer />
		</div>
	);
}
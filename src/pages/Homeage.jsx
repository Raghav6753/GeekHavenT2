"use client";

import { useState } from "react";
import { TrendingUp, Zap, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/productcard";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/cartside";
import "./Homeage.css";
	{
		id: "1",
		title: "iPhone 14 Pro Max - Space Black 256GB",
		price: 899,
		originalPrice: 1099,
		image: "/iphone-14-pro-max-space-black.png",
		seller: "TechDeals Pro",
		rating: 4.8,
		reviewCount: 124,
		condition: "Like New",
		category: "Electronics",
	},
	{
		id: "2",
		price: 180,
		originalPrice: 220,
		image: "/nike-air-jordan-1-sneakers.png",
		seller: "SneakerHub",
		rating: 4.9,
		reviewCount: 89,
		condition: "New",
		category: "Fashion",
	},
	{
		id: "3",
		title: "MacBook Air M2 13-inch - Silver",
		price: 1050,
		originalPrice: 1199,
		image: "/macbook-air-m2-silver-laptop.png",
		seller: "AppleReseller",
		rating: 4.7,
		reviewCount: 67,
		condition: "Like New",
		category: "Electronics",
	},
	{
		id: "4",
		title: "Vintage Leather Jacket - Brown Medium",
		price: 85,
		originalPrice: 150,
		image: "/vintage-brown-leather-jacket.png",
		seller: "VintageStyle",
		rating: 4.6,
		reviewCount: 43,
		condition: "Good",
		category: "Fashion",
	},
	{
		id: "5",
		title: "PlayStation 5 Console + Controller",
		price: 450,
		originalPrice: 499,
		image: "/playstation-5-console-white.png",
		seller: "GameCentral",
		rating: 4.9,
		reviewCount: 156,
		condition: "Like New",
		category: "Electronics",
	},
	{
		id: "6",
		title: "Designer Handbag - Louis Vuitton Style",
		price: 120,
		originalPrice: 200,
		image: "/designer-handbag-luxury-brown.png",
		seller: "LuxuryFinds",
		rating: 4.5,
		reviewCount: 78,
		condition: "Good",
		category: "Fashion",
	},
];

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

const Header = () => {
	const navigate = useNavigate();
	return (
		<header className="header-container">
			<div className="header-content">
				<button onClick={() => navigate('/')} className="logo-btn">
					ResellerHub
				</button>
				<nav className="nav-menu">
					<button onClick={() => navigate('/products')} className="nav-link-btn">
						Products
					</button>
					<button onClick={() => navigate('/sell')} className="nav-link-btn">
						Sell
					</button>
					<button onClick={() => navigate('/about')} className="nav-link-btn">
						About
					</button>
					<button onClick={() => navigate('/contact')} className="nav-link-btn">
						Contact
					</button>
				</nav>
				<div className="header-actions">
					<button className="icon-btn" aria-label="Notifications">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
							<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
							<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
						</svg>
					</button>
					<button className="icon-btn" aria-label="Shopping cart">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
							<circle cx="9" cy="21" r="1" />
							<circle cx="20" cy="21" r="1" />
							<path d="M1 1h4l2.68 12.55a2 2 0 0 0 1.92 1.45h9.4a2 2 0 0 0 1.92-1.45L23 6H6" />
						</svg>
					</button>
					<button className="profile-btn">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="profile-icon">
							<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
					</button>
				</div>
			</div>
		</header>
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

export default function HomePage({ products = [], cartItems, setCartItems, cartOpen, setCartOpen, wishlistItems, setWishlistItems, onAddToWishlist }) {
	const [filteredProducts, setFilteredProducts] = useState(mockProducts);
	const [activeCategory, setActiveCategory] = useState("All");
	const navigate = useNavigate();

	const handleCategoryChange = (category) => {
		setActiveCategory(category);
		if (category === "All") {
			setFilteredProducts(mockProducts);
		} else {
			setFilteredProducts(mockProducts.filter((product) => product.category === category));
		}
	};

	const handleAddToCart = (product) => {
		setCartItems((prev) => {
			const existing = prev.find((item) => item.id === product.id);
			if (existing) {
				return prev.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			} else {
				return [...prev, { ...product, quantity: 1 }];
			}
		});
		setCartOpen(true);
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
						{filteredProducts.map((product) => (
							<ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} onAddToWishlist={() => onAddToWishlist(product)} />
						))}
					</div>
					{filteredProducts.length === 0 && (
						<div className="no-products">
							<p className="no-products-text">No products found in this category.</p>
							<button className="secondary-btn-sm" onClick={() => handleCategoryChange("All")}>View All Products</button>
						</div>
					)}
				</div>
			</section>
			<Footer />
		</div>
	);
}
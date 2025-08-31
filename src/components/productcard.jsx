
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSeed } from "../context/SeedContext";



const ProductCard = ({ product = null, onAddToWishlist, setCartOpen }) => {
	if (!product) return null;
	// Destructure with fallback for id
	const {
		_id,
		id,
		title,
		price,
		originalPrice,
		images,
		condition,
		rating,
		reviewCount,
		seller,
		category,
		// add other fields as needed
	} = product;
	const productKey = _id || id;
	const { checksumForId, addLog } = useSeed();
	const image = images && images.length > 0 ? images[0] : "";
	const navigate = useNavigate();
	const [isWishlisted, setIsWishlisted] = useState(false);
	const { addToCart } = useCart();
	const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

	const handleTitleClick = (e) => {
		e.stopPropagation();
		addLog(`view:${productKey}`);
		navigate(`/product/${productKey}`);
	};

	const handleWishlistClick = (e) => {
		e.stopPropagation();
		if (!isWishlisted && onAddToWishlist) {
			onAddToWishlist(product);
		}
		setIsWishlisted((prev) => !prev);
	};

	return (
		<div className="product-card-container">
			<div className="product-card-image-wrapper">
				<img src={image} alt={title} className="product-card-image" />
				<div className="product-card-discount-badge">-{discount}%</div>
				<div className="product-card-condition-badge">{condition}</div>
				<button className="product-card-favorite-btn" aria-label="Add to favorites" onClick={handleWishlistClick}>
					{isWishlisted ? (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e63946" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="product-card-icon" style={{ width: 32, height: 32 }}>
							<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
						</svg>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="product-card-icon" style={{ width: 32, height: 32 }}>
							<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
						</svg>
					)}
				</button>
			</div>
			<div className="product-card-details">
				<p className="product-card-id">{`ID: ${category === "Electronics" ? `E-${Math.floor(Math.random() * 900) + 100}` : `F-${Math.floor(Math.random() * 900) + 100}`}`}</p>
				<h3 className="product-card-title" onClick={handleTitleClick} style={{ cursor: "pointer", color: "#007bff" }}>{title}</h3>
				<div className="product-card-rating">
					<span className="product-card-rating-stars">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="product-card-star-icon">
							<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.697 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
						</svg>
						<span className="product-card-rating-value">{rating}</span>
					</span>
					<span className="product-card-review-count">({reviewCount})</span>
				</div>
				<p className="product-card-seller">by {typeof seller === 'object' && seller !== null ? seller.name : seller}</p>
				<div className="product-card-pricing">
					<p className="product-card-price">${price}</p>
					<span className="product-card-original-price">${originalPrice}</span>
					<button
						className="product-card-add-btn"
						key={`${productKey}`}
						aria-label={`Add ${title} to cart`}
						onClick={(e) => {
							e.stopPropagation();
							console.log('ProductCard: Add clicked', productKey, product);
							if (addToCart && product) addToCart(product);
							addLog(`add:${productKey}`);
							if (setCartOpen) setCartOpen(true);
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="product-card-add-icon">
							<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
							<path d="M3 6h18" />
							<path d="M16 10a4 4 0 0 1-8 0" />
						</svg>
						Add
					</button>
				</div>
			</div>
		</div>
	);
};
export default ProductCard;
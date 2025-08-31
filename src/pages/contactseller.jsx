import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { Star } from "lucide-react";
import "./contactseller.css";

export default function ContactSeller() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id || p._id === id);
  const seller = product?.seller || {};

  if (!product) {
    return (
      <div className="contact-seller-container">
        <div className="not-found">Seller not found</div>
      </div>
    );
  }

  const rating = seller.rating || product.rating || 0;
  const reviews = seller.reviewCount || product.reviewCount || 0;
  const joined = seller.joinedDate || "Unknown";
  const response = seller.responseTime || "< 24 hours";
  const location = product.location || seller.location || "Unknown";

  return (
    <div className="contact-seller-container">
      <button className="back-link" onClick={() => navigate(-1)}>Back</button>
      <div className="seller-hero">
        <div className="seller-left">
          <img
            className="seller-avatar-large"
            src={seller.avatar || "/placeholder.svg"}
            alt={seller.name || "Seller"}
          />
        </div>
        <div className="seller-main">
          <h1 className="seller-name-large">{seller.name || "Seller"}</h1>
          <div className="seller-badges">
            <span className="badge">Top Seller</span>
            <span className="badge">Fast Shipper</span>
            <span className="badge">Verified Dealer</span>
          </div>
          <div className="seller-meta">
            <div className="meta-item">Joined {joined}</div>
            <div className="meta-item">{location}</div>
          </div>
          <div className="seller-stats-row">
            <div className="stat">
              <div className="stat-value"><Star className="stat-icon" /> {rating}</div>
              <div className="stat-label">{reviews} reviews</div>
            </div>
            <div className="stat">
              <div className="stat-value">{response}</div>
              <div className="stat-label">Response Time</div>
            </div>
            <div className="stat">
              <div className="stat-value">1.2 days</div>
              <div className="stat-label">Avg. Shipping</div>
            </div>
          </div>
          <div className="seller-description">
            {seller.description || "Certified seller with excellent feedback. Contact the seller to ask about condition, shipping, and returns."}
          </div>
        </div>
        <div className="seller-actions">
          <button className="contact-btn">Contact Seller</button>
          <button className="follow-btn">Follow</button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Heart, ShoppingCart, User } from "lucide-react";
import "./Navbar.css";

const Navbar = ({ onCartClick, onWishlistClick }) => {
  const navigate = useNavigate();
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="navbar-logo-btn" onClick={() => navigate("/")}>
            ResellerHub
          </button>
          <div className="navbar-search-container">
            <Search className="navbar-search-icon" />
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              className="navbar-search-input"
            />
          </div>
        </div>
        <div className="navbar-right">
          <button className="navbar-action-btn sell-btn" onClick={() => navigate("/sell")}>
            <Plus className="navbar-icon" />
            Sell
          </button>
          <button className="navbar-action-btn" onClick={onWishlistClick}>
            <Heart className="navbar-icon" />
          </button>
          <button className="navbar-action-btn" onClick={onCartClick}>
            <ShoppingCart className="navbar-icon" />
          </button>
          <button className="navbar-action-btn">
            <User className="navbar-icon" />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;

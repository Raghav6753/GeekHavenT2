import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Heart, ShoppingCart, User, X } from "lucide-react";
import "./Navbar.css";
import { useSeed } from "../context/SeedContext";

const Navbar = ({ onCartClick, onWishlistClick }) => {
  const navigate = useNavigate();
  const { addLog } = useSeed();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileSidebar = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-container">
          <div className="navbar-left">
            <button className="navbar-logo-btn" onClick={() => navigate("/")}>
              ResellerHub
            </button>
            <button className="navbar-action-btn" onClick={() => { navigate('/about'); }}>About</button>
            <button className="navbar-action-btn" onClick={() => { navigate('/logs/recent'); }}>Logs</button>
            <div className="navbar-search-container">
              <Search className="navbar-search-icon" />
              <input
                id="site-search"
                type="text"
                placeholder="Search products, brands, categories..."
                className="navbar-search-input"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { addLog(`search:${e.target.value}`); navigate('/search'); }
                }}
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
            <button className="navbar-action-btn" onClick={toggleProfileSidebar}>
              <User className="navbar-icon" />
            </button>
          </div>
        </div>
      </header>

      {/* Profile Sidebar */}
      <div className={`profile-sidebar ${isProfileOpen ? "open" : ""}`}>
        <div className="profile-sidebar-header">
          <h2>Profile</h2>
          <button className="close-btn" onClick={toggleProfileSidebar}>
            <X />
          </button>
        </div>
        <div className="profile-info">
          <img
            src="https://i.pravatar.cc/80"
            alt="User Avatar"
            className="profile-avatar"
          />
          <div className="profile-details">
            <p className="profile-name">John Doe</p>
            <p className="profile-email">john.doe@example.com</p>
            <span className="profile-badge">Premium Seller</span>
          </div>
        </div>
        <ul className="profile-menu">
          <li onClick={() => { navigate("/profile"); toggleProfileSidebar(); }}>
            <User /> My Profile
          </li>
          <li onClick={() => { navigate("/my-listings"); toggleProfileSidebar(); }}>
            <Plus /> My Listings
          </li>
          <li onClick={() => { navigate("/wishlist"); toggleProfileSidebar(); }}>
            <Heart /> Wishlist
          </li>
          <li onClick={() => { navigate("/orders"); toggleProfileSidebar(); }}>
            <ShoppingCart /> Orders & Purchases
          </li>
          <li onClick={() => { navigate("/notifications"); toggleProfileSidebar(); }}>
            <X /> Notifications
          </li>
          <li onClick={() => { navigate("/settings"); toggleProfileSidebar(); }}>
            <Plus /> Settings
          </li>
        </ul>
        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Navbar;

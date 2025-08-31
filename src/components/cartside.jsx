import React from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./cartside.css";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  console.log('CartSidebar render - cartItems length:', cartItems.length, 'items:', cartItems);

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const platformFeeRate = 0.05;
    const platformFee = subtotal * platformFeeRate;
    const total = subtotal + platformFee;
    return { subtotal, platformFee, total };
  };

  const totals = calculateTotals();

 
  const onChangeQuantity = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  return (
    <div className={`cart-sidebar-overlay ${isOpen ? "open" : ""}`}>
      <div className={`cart-sidebar-content ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2 className="cart-title">
            <ShoppingBag className="cart-icon" />
            Shopping Cart
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length} items</span>}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag className="empty-cart-icon" />
            <h3 className="empty-cart-title">Your cart is empty</h3>
            <p className="empty-cart-text">Add some products to get started</p>
            <button className="continue-shopping-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              <div className="cart-items-scroll">
                {cartItems.map((item, idx) => (
                  <div key={(item.id || item._id || idx) + '-' + idx} className="cart-item">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h4 className="cart-item-title">{item.title}</h4>
                      <p className="cart-item-seller">by {typeof item.seller === 'object' && item.seller !== null ? item.seller.name : item.seller}</p>
                      <div className="cart-item-actions">
                        <span className="cart-item-price">${item.price.toFixed(2)}</span>
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => onChangeQuantity(item.id || item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="quantity-icon" />
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => onChangeQuantity(item.id || item._id, item.quantity + 1)}
                          >
                            <Plus className="quantity-icon" />
                          </button>
                        </div>
                        <button className="remove-item-btn" onClick={() => removeFromCart(item.id || item._id)}>
                          <Trash2 className="remove-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Platform Fee (5%)</span>
                <span>${totals.platformFee.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="shipping-cost">Free</span>
              </div>
              <div className="summary-separator" />
              <div className="summary-row total-row">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
              <div className="checkout-buttons">
                <button className="view-cart-btn">View Cart</button>
                <button className="checkout-btn" onClick={() => { onClose(); navigate("/checkout"); }}>Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
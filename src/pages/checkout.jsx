import React, { useState } from "react";
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react";
import "./checkout.css";

export default function CheckoutPage({ cartItems = [], setCartItems }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const platformFee = subtotal * 0.03;
  const total = subtotal + tax + platformFee;
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 3000);
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="checkout-page-container">
        <div className="empty-cart-container">
          <div className="empty-cart-content">
            <h1 className="empty-cart-title">Your cart is empty</h1>
            <p className="empty-cart-text">Add some items to your cart before checking out.</p>
            <button className="browse-products-btn" onClick={() => window.location.href = "/search"}>
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="checkout-page-container">
        <div className="order-complete-container">
          <div className="order-complete-content">
            <div className="check-icon-wrapper">
              <Check size={48} color="#4caf50" />
            </div>
            <h1 className="order-complete-title">Order Complete!</h1>
            <p className="order-complete-text">
              Thank you for your purchase. You'll receive a confirmation email shortly with tracking information.
            </p>
            <div className="order-complete-buttons">
              <button className="continue-shopping-btn" onClick={() => window.location.href = "/search"}>
                Continue Shopping
              </button>
              <button className="view-order-btn">
                View Order Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <div className="checkout-content-wrapper">
        <button className="back-to-cart-btn" onClick={() => window.history.back()}>
          <ArrowLeft className="back-icon" />
          Back to Cart
        </button>
        <h1 className="checkout-title">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="checkout-grid">
            {/* Checkout Form */}
            <div className="checkout-form-column">
              {/* Shipping Information */}
              <div className="checkout-card">
                <div className="checkout-card-header">
                  <h2 className="checkout-card-title">
                    <Truck className="card-icon" />
                    Shipping Information
                  </h2>
                </div>
                <div className="checkout-card-content">
                  <div className="form-grid">
                    <div>
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input id="firstName" type="text" required className="form-input" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input id="lastName" type="text" required className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" type="email" required className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input id="phone" type="tel" required className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="address" className="form-label">Address</label>
                    <input id="address" type="text" required className="form-input" />
                  </div>
                  <div className="form-grid-small">
                    <div>
                      <label htmlFor="city" className="form-label">City</label>
                      <input id="city" type="text" required className="form-input" />
                    </div>
                    <div>
                      <label htmlFor="state" className="form-label">State</label>
                      <input id="state" type="text" required className="form-input" />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="form-label">ZIP Code</label>
                      <input id="zipCode" type="text" required className="form-input" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment Information */}
              <div className="checkout-card">
                <div className="checkout-card-header">
                  <h2 className="checkout-card-title">
                    <CreditCard className="card-icon" />
                    Payment Information
                  </h2>
                </div>
                <div className="checkout-card-content">
                  <div className="radio-group-container">
                    <div className="radio-item">
                      <input type="radio" id="card" name="paymentMethod" value="card" defaultChecked className="radio-input" />
                      <label htmlFor="card" className="radio-label">Credit/Debit Card</label>
                    </div>
                    <div className="radio-item">
                      <input type="radio" id="paypal" name="paymentMethod" value="paypal" className="radio-input" />
                      <label htmlFor="paypal" className="radio-label">PayPal</label>
                    </div>
                  </div>

                  <div className="card-info-section">
                    <div>
                      <label htmlFor="cardNumber" className="form-label">Card Number</label>
                      <input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" required className="form-input" />
                    </div>
                    <div className="form-grid-small">
                      <div className="col-span-2">
                        <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                        <input id="expiryDate" type="text" placeholder="MM/YY" required className="form-input" />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input id="cvv" type="text" placeholder="123" required className="form-input" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="nameOnCard" className="form-label">Name on Card</label>
                      <input id="nameOnCard" type="text" required className="form-input" />
                    </div>
                  </div>

                  <div className="terms-checkbox-container">
                    <input type="checkbox" id="terms" required className="checkbox-input" />
                    <label htmlFor="terms" className="checkbox-label">
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary-column">
              <div className="order-summary-card">
                <div className="order-summary-header">
                  <h2 className="order-summary-title">Order Summary</h2>
                </div>
                <div className="order-summary-content">
                  <div className="order-items-list">
                    {cartItems.map((item) => (
                      <div key={item.id} className="order-item">
                        <img
                          src={item.image || "https://via.placeholder.com/48"}
                          alt={item.title}
                          className="order-item-image"
                        />
                        <div className="order-item-details">
                          <p className="order-item-title">{item.title}</p>
                          <p className="order-item-qty">Qty: {item.quantity}</p>
                        </div>
                        <div className="order-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="separator" />

                  <div className="pricing-details">
                    <div className="pricing-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="pricing-row">
                      <span>Platform Fee</span>
                      <span>${platformFee.toFixed(2)}</span>
                    </div>
                    <div className="pricing-row">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="pricing-row">
                      <span>Shipping</span>
                      <span className="shipping-free">Free</span>
                    </div>
                    <div className="separator" />
                    <div className="pricing-row total-row">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button type="submit" className="pay-btn" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </button>

                  <div className="secure-checkout-info">
                    <Shield className="secure-icon" />
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [notification, setNotification] = useState("");

  const handleRemoveItem = (cartItemId) => {
    removeFromCart(cartItemId);
    setNotification("Item removed from cart");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleUpdateQuantity = (cartItemId, newQuantity) => {
    updateQuantity(cartItemId, newQuantity);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const priceValue = typeof item.price === 'number' ? item.price : parseInt(item.price?.toString().replace(/[^0-9]/g, "") || 0);
      return total + (priceValue * (item.quantity || 1));
    }, 0);
  };

  const calculateSubtotal = () => {
    return calculateTotal();
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setNotification("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  return (
    <div className="cart-container">
      {/* Notification */}
      {notification && (
        <div className="cart-notification">
          <span>✓</span> {notification}
        </div>
      )}

      <div className="cart-content">
        <div className="cart-header">
          <h1 className="cart-title">🛒 Shopping Cart</h1>
          <p className="cart-subtitle">
            {cart.length === 0
              ? "Your cart is empty"
              : `${cart.length} item${cart.length !== 1 ? "s" : ""} in cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛍️</div>
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart</p>
            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-main">
            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="cart-item">
                    {/* Product Image */}
                    <div className="cart-item-image">
                      <img src={item.imageUrl || item.image} alt={item.productName || item.name} />
                    </div>

                    {/* Product Details */}
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.productName || item.name}</h3>
                      <p className="cart-item-description">{item.description}</p>

                      {/* Customization Info */}
                      {(item.color || item.size) && (
                        <div className="cart-item-customization">
                          {item.color && (
                            <span className="custom-badge color-badge">
                              Color: <strong>{item.color}</strong>
                            </span>
                          )}
                          {item.size && (
                            <span className="custom-badge size-badge">
                              Size: <strong>{item.size}</strong>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quantity and Price */}
                    <div className="cart-item-controls">
                      <div className="quantity-control">
                        <button
                          className="qty-btn"
                          onClick={() => handleUpdateQuantity(item.cartItemId, (item.quantity || 1) - 1)}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity || 1}
                          onChange={(e) =>
                            handleUpdateQuantity(item.cartItemId, parseInt(e.target.value) || 1)
                          }
                          className="qty-input"
                          min="1"
                          max="10"
                        />
                        <button
                          className="qty-btn"
                          onClick={() => handleUpdateQuantity(item.cartItemId, (item.quantity || 1) + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-price">
                        <span className="price-unit">₹{item.price}</span>
                        <span className="price-total">
                          {(
                            (typeof item.price === 'number' ? item.price : parseInt(item.price?.toString().replace(/[^0-9]/g, "") || 0)) *
                            (item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.cartItemId)}
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="cart-summary-section">
              <div className="cart-summary">
                <h3 className="summary-title">Order Summary</h3>

                <div className="summary-row">
                  <span className="summary-label">Subtotal:</span>
                  <span className="summary-value">
                    ₹{calculateSubtotal().toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">Shipping:</span>
                  <span className="summary-value free-shipping">FREE</span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">Tax (18% GST):</span>
                  <span className="summary-value">
                    ₹{Math.round(calculateSubtotal() * 0.18).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span className="summary-label">Total:</span>
                  <span className="summary-value total-price">
                    ₹{Math.round(
                      calculateSubtotal() * 1.18
                    ).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Features */}
                <div className="cart-features">
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">Free Shipping on all orders</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">Quality Guaranteed</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">Easy Returns</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="cart-actions">
                  <button
                    className="checkout-btn"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="continue-shopping-btn-secondary"
                    onClick={handleContinueShopping}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

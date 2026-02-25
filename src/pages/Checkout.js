import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  // Load cart on mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("uv-power-cart")) || [];
    if (cart.length === 0) {
      navigate("/cart");
      return;
    }
    setCartItems(cart);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create order
    const order = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      items: cartItems,
      shipping: formData,
      total: Math.round(
        cartItems.reduce((sum, item) => {
          const priceValue = typeof item.price === 'number' ? item.price : parseInt(item.price?.toString().replace(/[^0-9]/g, "") || 0);
          return sum + priceValue * item.quantity;
        }, 0) * 1.18
      ),
    };

    setOrderDetails(order);
    setOrderPlaced(true);

    // Clear the cart
    localStorage.removeItem("uv-power-cart");
    window.dispatchEvent(new Event("cartUpdated"));

    // Auto-redirect after 5 seconds
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  // Render order confirmation
  if (orderPlaced && orderDetails) {
    return (
      <div className="checkout-container">
        <div className="confirmation-page">
          <div className="confirmation-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p className="confirmation-message">
            Thank you for your purchase. Your order has been placed successfully.
          </p>

          <div className="order-details-box">
            <h3>Order Details</h3>
            <div className="order-info">
              <span className="label">Order ID:</span>
              <span className="value">{orderDetails.orderId}</span>
            </div>
            <div className="order-info">
              <span className="label">Date & Time:</span>
              <span className="value">
                {orderDetails.date} at {orderDetails.time}
              </span>
            </div>
            <div className="order-info">
              <span className="label">Items:</span>
              <span className="value">{orderDetails.items.length} item(s)</span>
            </div>
            <div className="order-info">
              <span className="label">Total Amount:</span>
              <span className="value total">
                ₹{orderDetails.total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="confirmation-message-secondary">
            <p>A confirmation email has been sent to <strong>{formData.email}</strong></p>
            <p>Redirecting to home page in 5 seconds...</p>
          </div>

          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return null;
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const priceValue = typeof item.price === 'number' ? item.price : parseInt(item.price?.toString().replace(/[^0-9]/g, "") || 0);
    return sum + priceValue * item.quantity;
  }, 0);

  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <div className="checkout-content">
          <h1 className="checkout-title">Checkout</h1>

          <div className="checkout-form-section">
            <form onSubmit={handlePlaceOrder} className="checkout-form">
              {/* Shipping Information */}
              <div className="form-section">
                <h2 className="section-title">Shipping Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? "error" : ""}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <span className="error-text">{errors.fullName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "error" : ""}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? "error" : ""}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <span className="error-text">{errors.phone}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? "error" : ""}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <span className="error-text">{errors.address}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? "error" : ""}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <span className="error-text">{errors.city}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? "error" : ""}
                      placeholder="State"
                    />
                    {errors.state && (
                      <span className="error-text">{errors.state}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={errors.zipCode ? "error" : ""}
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <span className="error-text">{errors.zipCode}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="form-section">
                <h2 className="section-title">Payment Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={errors.cardNumber ? "error" : ""}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                    {errors.cardNumber && (
                      <span className="error-text">{errors.cardNumber}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date (MM/YY) *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={errors.expiryDate ? "error" : ""}
                      placeholder="12/25"
                      maxLength="5"
                    />
                    {errors.expiryDate && (
                      <span className="error-text">{errors.expiryDate}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={errors.cvv ? "error" : ""}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && (
                      <span className="error-text">{errors.cvv}</span>
                    )}
                  </div>
                </div>
              </div>

              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-summary-section">
          <div className="checkout-summary">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-items">
              {cartItems.map((item, index) => (
                <div key={index} className="summary-item">
                  <div className="summary-item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="item-price">
                    ₹{(
                      (typeof item.price === 'number' ? item.price : parseInt(item.price?.toString().replace(/[^0-9]/g, "") || 0)) *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-totals">
              <div className="total-row">
                <span className="label">Subtotal:</span>
                <span className="value">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="total-row">
                <span className="label">Tax (18% GST):</span>
                <span className="value">₹{tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="total-row">
                <span className="label">Shipping:</span>
                <span className="value free">FREE</span>
              </div>
              <div className="total-row final">
                <span className="label">Total:</span>
                <span className="value">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="checkout-features">
              <div className="feature">
                <span className="icon">✓</span> Free Shipping
              </div>
              <div className="feature">
                <span className="icon">✓</span> Secure Payment
              </div>
              <div className="feature">
                <span className="icon">✓</span> Easy Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

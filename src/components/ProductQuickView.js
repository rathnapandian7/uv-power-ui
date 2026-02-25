import React, { useState } from "react";
import "./ProductQuickView.css";

const ProductQuickView = ({ product, isOpen, onClose, onAddToCart, onBuy }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("medium");

  const colors = ["black", "white", "red", "blue", "green"];
  const sizes = ["small", "medium", "large", "xlarge"];

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity,
      color: selectedColor,
      size: selectedSize
    });
    onClose();
  };

  const handleBuy = () => {
    onBuy({
      ...product,
      quantity,
      color: selectedColor,
      size: selectedSize
    });
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <>
      <div className="quick-view-overlay" onClick={onClose}></div>
      <div className="quick-view-modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="quick-view-content">
          {/* Product Image */}
          <div className="qv-image-section">
            <img src={product.imageUrl || product.image} alt={product.productName || product.name} className="qv-main-image" />
            <div className="qv-badge">{product.badge}</div>
          </div>

          {/* Product Details */}
          <div className="qv-details-section">
            <h2 className="qv-title">{product.name}</h2>

            {/* Rating */}
            <div className="qv-rating">
              <span className="qv-stars">★★★★★</span>
              <span className="qv-review">(12 reviews)</span>
            </div>

            {/* Price */}
            <div className="qv-price">
              <span className="price-label">Price:</span>
              <span className="price-value">{product.price}</span>
            </div>

            {/* Category */}
            {(product.category || product.categoryName) && (
              <div className="qv-category">
                <span className="category-label">Category:</span>
                <span className="category-value">{product.category || product.categoryName}</span>
              </div>
            )}

            {/* Description */}
            <p className="qv-description">{product.description}</p>

            {/* Color Selection */}
            <div className="qv-option-group">
              <label className="qv-option-label">Color:</label>
              <div className="color-options">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? "active" : ""}`}
                    style={{
                      backgroundColor:
                        color === "black"
                          ? "#1f2937"
                          : color === "white"
                          ? "#f3f4f6"
                          : color === "red"
                          ? "#ef4444"
                          : color === "blue"
                          ? "#3b82f6"
                          : "#10b981",
                    }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  >
                    {selectedColor === color && "✓"}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="qv-option-group">
              <label className="qv-option-label">Size:</label>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="qv-option-group">
              <label className="qv-option-label">Quantity:</label>
              <select
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="qv-buttons">
              <button className="qv-btn btn-cart" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button className="qv-btn btn-buy" onClick={handleBuy}>
                💳 Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="qv-features">
              <div className="feature-badge">
                <span>🚚</span> Free Shipping
              </div>
              <div className="feature-badge">
                <span>✓</span> Quality Guaranteed
              </div>
              <div className="feature-badge">
                <span>↩️</span> Easy Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductQuickView;

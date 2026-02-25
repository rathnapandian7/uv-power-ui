import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductDetail.css";
import { productData } from "../data/productData.js";

const ProductDetail = ({ productId }) => {
  const product = productData[productId];
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [customText, setCustomText] = useState("");
  const [price, setPrice] = useState(product.price);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!product) {
    return <div className="product-error">Product not found</div>;
  }

  const handleZoom = (level) => {
    setZoomLevel(Math.max(100, Math.min(200, level)));
  };

  return (
    <div className="product-detail-page">
      <div className="product-container">
        {/* Image Gallery Section */}
        <div className="product-gallery-section">
          <div className="main-image-container">
            <img
              src={mainImage}
              alt={product.name}
              className="main-image"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            />
            <div className="zoom-controls">
              <button onClick={() => handleZoom(zoomLevel - 10)}>−</button>
              <span>{zoomLevel}%</span>
              <button onClick={() => handleZoom(zoomLevel + 10)}>+</button>
            </div>
          </div>
          <div className="thumbnails">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Product ${idx}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="product-details-section">
          <h1 className="product-name">{product.name}</h1>
          <div className="rating-section">
            <span className="stars">★★★★★</span>
            <span className="review-count">(12 reviews)</span>
          </div>

          {/* Price Section */}
          <div className="price-section">
            <span className="label">Price:</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Math.max(0, e.target.value))}
              className="price-input"
            />
            <span className="currency">₹</span>
          </div>

          {/* Description */}
          <div className="description-section">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Features */}
          <div className="features-section">
            <h3>Features</h3>
            <ul className="features-list">
              {product.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          {/* Limited Time Offer Section */}
          <div className="limited-offer-section">
            <div className="offer-badge">⏰ LIMITED TIME OFFER</div>
            <p className="offer-text">Get <span className="discount">20% OFF</span> on this product today!</p>
            <p className="offer-subtext">Offer valid for next 24 hours</p>
          </div>

          {/* Customization Section */}
          <div className="customization-section">
            <h3>Personalize Your Product</h3>
            <input
              type="text"
              placeholder="Enter custom text (name, message, etc.)"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              maxLength={50}
              className="custom-text-input"
            />
            <p className="char-count">{customText.length}/50 characters</p>
            {customText && (
              <div className="custom-preview">
                <h4>Live Custom Preview:</h4>
                <div className="preview-box">{customText}</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn btn-add-to-cart">
              <span>🛒</span> Add to Cart
            </button>
            <button className="btn btn-buy-now">
              <span>⚡</span> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews-grid">
          {product.reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <div className="review-header">
                <h4>{review.author}</h4>
                <span className="review-rating">{"★".repeat(review.rating)}</span>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products-section">
        <h2>Related Products</h2>
        <div className="related-products-grid">
          {product.relatedProducts.map((relatedId) => {
            const relatedProduct = productData[relatedId];
            return (
              <Link
                key={relatedId}
                to={`/${relatedId}`}
                className="related-product-card"
              >
                <img src={relatedProduct.images[0]} alt={relatedProduct.name} />
                <div className="related-product-name">{relatedProduct.name}</div>
                <div className="related-product-price">₹{relatedProduct.price}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

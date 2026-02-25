import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";
import "./Products.css";

// Default fallback products in case API fails
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Bike Vinyl Stickers",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    link: "/bike-vinyl-stickers",
    price: "₹299",
    rating: 4.8,
    reviews: 245,
    badge: "Best Seller",
    description: "Premium vinyl stickers for bikes"
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  // const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load products from Spring Boot backend on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await api.fetchAllProducts();
        setProducts(data || []);
        setError(null);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products from server");
        setProducts(DEFAULT_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      const priceA = parseInt(a.price.replace(/₹|,/g, ""));
      const priceB = parseInt(b.price.replace(/₹|,/g, ""));
      return priceA - priceB;
    } else if (sortBy === "price-high") {
      const priceA = parseInt(a.price.replace(/₹|,/g, ""));
      const priceB = parseInt(b.price.replace(/₹|,/g, ""));
      return priceB - priceA;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const renderStars = (rating) => {
    return "⭐".repeat(Math.floor(rating));
  };

  return (
    <section className="products-page">
      {/* Hero Section */}
      <div className="products-hero">
        <h1 className="products-hero-title">Our Premium Products</h1>
        <p className="products-hero-subtitle">Explore our complete collection of custom designs & premium products</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="products-section">
          <div style={{ textAlign: "center", padding: "3rem", fontSize: "1.1rem", color: "#666" }}>
            <div>Loading products...</div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="products-section">
          <div style={{ textAlign: "center", padding: "2rem", background: "#fee", color: "#c33", borderRadius: "8px", margin: "1rem" }}>
            <div>⚠️ {error}</div>
            <small>Showing cached products</small>
          </div>
        </div>
      )}

      {/* Controls Section */}
      {!loading && (
        <div className="products-controls">
          <div className="controls-container">
            <div className="view-controls">
              <span className="control-label">Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <div className="product-count">
              Showing <strong>{sortedProducts.length}</strong> products
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && (
        <div className="products-section">
          <div className="products-grid">
            {sortedProducts.map((product) => (
              <div key={product.id} className="product-card-wrapper">
                <Link to={product.link || "#"} className="product-card">
                  <div className="product-image-wrapper">
                    <img src={product.imageUrl || product.image} alt={product.productName || product.name} className="product-image" />
                    <div className="product-badge">{product.badge}</div>
                    <div className="product-overlay">
                      <button className="view-btn">View Details</button>
                    </div>
                  </div>
                  <div className="product-content">
                    <h3 className="product-name">{product.productName || product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-rating">
                      <span className="stars">{renderStars(product.rating)}</span>
                      <span className="rating-value">{product.rating}</span>
                      <span className="reviews">({product.reviews})</span>
                    </div>
                    <div className="product-footer">
                      <span className="product-price">{product.price}</span>
                      <button className="add-btn" onClick={(e) => {
                        e.preventDefault();
                        alert(`${product.name} added to cart!`);
                      }}>
                        + Add
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="products-features">
        <div className="features-container">
          <h2>Why Shop With UV Power?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Get your custom products in 3-5 business days</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <h3>Premium Quality</h3>
              <p>100% quality checked with premium materials</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <h3>Custom Designs</h3>
              <p>Endless customization options available</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with frequent discounts</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="products-cta">
        <h2>Ready to Get Started?</h2>
        <p>Create your custom design or browse our collection</p>
        <div className="cta-buttons">
          <Link to="/custom-design" className="btn btn-primary">
            Custom Design
          </Link>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </section>
    </section>
  );
}

export default Products;

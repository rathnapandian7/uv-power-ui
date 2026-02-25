import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";
import "./Shop.css";

const Shop = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default fallback categories in case API fails
  const defaultCategories = [
    {
      id: 1,
      categoryName: "Bike Vinyl Stickers",
      icon: "🏍️",
      description: "Premium vinyl stickers for bikes with weather-resistant quality",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      categoryName: "Car Stickers",
      icon: "🚗",
      description: "Custom car decals with premium adhesive and durability",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      categoryName: "Acrylic LED Boards",
      icon: "💡",
      description: "Illuminated acrylic boards perfect for any space",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      categoryName: "Laser Engraved Wood",
      icon: "🪵",
      description: "Precision laser engraved wooden products and art",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd4a4?auto=format&fit=crop&w=500&q=80",
    },
  ];

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await api.fetchAllCategories();
        
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(defaultCategories);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories(defaultCategories);
        setError(null); // Don't show error, just use defaults
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="shop-page">
      {/* Hero Section */}
      <div className="shop-hero">
        <div className="hero-content">
          <h1 className="hero-title">Explore Our Collections</h1>
          <p className="hero-subtitle">Discover premium custom products handcrafted for you</p>
          <div className="hero-divider"></div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="shop-container">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading categories...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Failed to load categories. Please try again.</p>
          </div>
        ) : (
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${encodeURIComponent(category.categoryName || category.name)}`}
                className="category-card-link"
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="category-card">
                  <div className="card-image-wrapper">
                    <img
                      src={category.imageUrl || category.image}
                      alt={category.categoryName || category.name}
                      className="card-image"
                    />
                    <div className="card-overlay">
                      <span className="category-icon">{category.icon}</span>
                      <button className="explore-btn">Explore Now</button>
                    </div>
                  </div>

                  <div className="card-content">
                    <h3 className="card-title">{category.categoryName || category.name}</h3>
                    <p className="card-description">{category.description}</p>
                    <div className="card-footer">
                      <span className="explore-text">Shop Collection →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="shop-features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon-box">⚡</div>
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">Quick turnaround on all orders</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">🎨</div>
            <h3 className="feature-title">Custom Design</h3>
            <p className="feature-description">Personalize to your liking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">✨</div>
            <h3 className="feature-title">Premium Quality</h3>
            <p className="feature-description">Best materials & craftsmanship</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">🚚</div>
            <h3 className="feature-title">Secure Shipping</h3>
            <p className="feature-description">Safe delivery guaranteed</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="shop-cta-section">
        <h2>Can't Find What You're Looking For?</h2>
        <p>Create your own custom design with our easy-to-use design studio</p>
        <Link to="/custom-design" className="cta-btn">
          Design Now →
        </Link>
      </div>
    </section>
  );
};

export default Shop;

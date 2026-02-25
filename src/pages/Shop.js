import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Bike Vinyl Stickers",
      icon: "🏍️",
      description: "Premium vinyl stickers for bikes with weather-resistant quality",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=80",
      link: "/bike-vinyl-stickers",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Car Stickers",
      icon: "🚗",
      description: "Custom car decals with premium adhesive and durability",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=500&q=80",
      link: "/car-stickers",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "Acrylic LED Name Boards",
      icon: "💡",
      description: "Illuminated acrylic boards perfect for any space",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
      link: "/acrylic-led-name-boards",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 4,
      name: "Laser Engraved Wood",
      icon: "🪵",
      description: "Precision laser engraved wooden products and art",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd4a4?auto=format&fit=crop&w=500&q=80",
      link: "/laser-engraved-wood-products",
      color: "from-amber-500 to-yellow-600"
    },
    {
      id: 5,
      name: "Customized Keychains",
      icon: "🔑",
      description: "Personalized keychains for gifts and collectibles",
      image: "https://images.unsplash.com/photo-1599634537087-3b64af256590?auto=format&fit=crop&w=500&q=80",
      link: "/customized-keychains",
      color: "from-red-500 to-pink-500"
    },
    {
      id: 6,
      name: "Wall Clocks",
      icon: "🕐",
      description: "Modern customized wall clocks for your space",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=500&q=80",
      link: "/customized-wall-clocks",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 7,
      name: "Premium Number Plates",
      icon: "🏎️",
      description: "Custom vehicle number plates with premium quality",
      image: "https://images.unsplash.com/photo-1513893733341-a249b73e9ee6?auto=format&fit=crop&w=500&q=80",
      link: "/premium-number-plates",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: 8,
      name: "Custom Designs",
      icon: "🎨",
      description: "Request custom design services for any product",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=500&q=80",
      link: "/custom-design",
      color: "from-fuchsia-500 to-purple-500"
    }
  ];

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
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="category-card-link"
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="category-card">
                <div className="card-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="card-image"
                  />
                  <div className="card-overlay">
                    <span className="category-icon">{category.icon}</span>
                    <button className="explore-btn">Explore Now</button>
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="card-title">{category.name}</h3>
                  <p className="card-description">{category.description}</p>
                  <div className="card-footer">
                    <span className="explore-text">Shop Collection →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
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

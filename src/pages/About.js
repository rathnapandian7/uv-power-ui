import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-section">
      {/* Hero Header */}
      <div className="about-hero">
        <h1 className="about-main-title">About UV Power</h1>
        <p className="about-hero-text">
          At UV Power, we don't just create products — we create identity.
        </p>
      </div>

      {/* Main Content */}
      <div className="about-content">
        <div className="about-intro">
          <p className="about-paragraph intro-paragraph">
            Founded with a passion for creativity and laser precision, UV Power specializes in 
            high-quality vinyl stickers, modern acrylic LED name boards, laser engraving on wood 
            and acrylic, customized keychains, personalized wall clocks, and premium number plates.
          </p>
          <p className="about-highlight">
            We believe customization is more than design — it's expression.
          </p>
          <p className="about-paragraph">
            Every product we craft reflects bold ideas, sharp detailing, and premium finish. From 
            bike enthusiasts to business owners, we help our customers stand out with confidence.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="mission-vision-container">
          <div className="mission-card">
            <div className="card-icon">🎯</div>
            <h2 className="card-title">Our Mission</h2>
            <p className="card-description">
              To deliver powerful customization solutions that combine innovation, quality, and creativity.
            </p>
          </div>

          <div className="vision-card">
            <div className="card-icon">🚀</div>
            <h2 className="card-title">Our Vision</h2>
            <p className="card-description">
              To become a leading customization brand known for precision, trust, and design excellence.
            </p>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="values-section">
          <h2 className="values-title">Why Choose UV Power?</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">✨</div>
              <h3>Precision & Quality</h3>
              <p>State-of-the-art laser technology and premium materials</p>
            </div>

            <div className="value-item">
              <div className="value-icon">🎨</div>
              <h3>Creative Design</h3>
              <p>Personalized solutions tailored to your unique vision</p>
            </div>

            <div className="value-item">
              <div className="value-icon">⚡</div>
              <h3>Fast Turnaround</h3>
              <p>Quick production without compromising on quality</p>
            </div>

            <div className="value-item">
              <div className="value-icon">🛡️</div>
              <h3>Trust & Reliability</h3>
              <p>Consistent excellence in every order, every time</p>
            </div>

            <div className="value-item">
              <div className="value-icon">🌟</div>
              <h3>Expert Craftsmanship</h3>
              <p>Skilled team dedicated to bringing ideas to life</p>
            </div>

            <div className="value-item">
              <div className="value-icon">💼</div>
              <h3>Customer Support</h3>
              <p>Dedicated support from concept to delivery</p>
            </div>
          </div>
        </div>

        {/* Our Products Section */}
        <div className="products-showcase">
          <h2 className="showcase-title">Our Product Range</h2>
          <div className="products-list">
            <div className="product-item">
              <span className="product-emoji">🚗</span>
              <span className="product-name">Vinyl Stickers & Decals</span>
            </div>
            <div className="product-item">
              <span className="product-emoji">💡</span>
              <span className="product-name">Acrylic LED Name Boards</span>
            </div>
            <div className="product-item">
              <span className="product-emoji">🪵</span>
              <span className="product-name">Laser Engraved Products</span>
            </div>
            <div className="product-item">
              <span className="product-emoji">🎁</span>
              <span className="product-name">Customized Keychains</span>
            </div>
            <div className="product-item">
              <span className="product-emoji">⏰</span>
              <span className="product-name">Personalized Wall Clocks</span>
            </div>
            <div className="product-item">
              <span className="product-emoji">🏎️</span>
              <span className="product-name">Premium Number Plates</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Create Something Amazing?</h2>
          <p className="cta-description">
            Let's bring your vision to life with our custom products and creative expertise.
          </p>
          <div className="cta-buttons">
            <a href="/shop" className="cta-btn primary-btn">Explore Our Products</a>
            <a href="/#contact" className="cta-btn secondary-btn">Get in Touch</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

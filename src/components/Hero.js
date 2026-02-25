import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="hero-content">
        <h1 className="hero-title">Customize Your Style. Make Your Ride Unique.</h1>
        <p className="hero-subtitle">Premium Stickers, Acrylic Boards & Laser Engraving Solutions</p>
        <div className="hero-buttons">
          <button className="hero-btn primary">Shop Now</button>
          <button className="hero-btn secondary">Get Custom Design</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

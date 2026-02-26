import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="footer-container">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <div className="footer-logo">⚡</div>
            <h2 className="footer-brand">UV Power</h2>
            <p className="footer-tagline">Stick Your Style. Power Your Identity.</p>
            <p className="footer-description">
              Transform your style with premium customization solutions. From custom stickers to laser-engraved products, we bring your imagination to life.
            </p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                📷 Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                👍 Facebook
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                ▶️ YouTube
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/shop">Shop Categories</Link></li>
              <li><Link to="/custom-design">Custom Design</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="footer-section">
            <h3 className="footer-heading">Products</h3>
            <ul className="footer-links">
              <li><Link to="/bike-vinyl-stickers">Bike Vinyl Stickers</Link></li>
              <li><Link to="/car-stickers">Car Stickers</Link></li>
              <li><Link to="/acrylic-led-name-boards">LED Name Boards</Link></li>
              <li><Link to="/laser-engraved-wood-products">Wood Engravings</Link></li>
              <li><Link to="/customized-keychains">Keychains</Link></li>
              <li><Link to="/premium-number-plates">Number Plates</Link></li>
            </ul>
          </div>

          

          {/* Contact & Address */}
          <div className="footer-section contact-section">
            <h3 className="footer-heading">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <p className="contact-label">Address:</p>
                  <p className="contact-text">UV Power Customization Hub<br />Panruti Main Roan, Next to VRK Steels<br/>Near Railyway Gate<br/>Vadalur, Cuddalore-607303, Tamil Nadu</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <p className="contact-label">Phone:</p>
                  <p className="contact-text"><a href="tel:+918765432100">+91-897310-2521</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <p className="contact-label">Email:</p>
                  <p className="contact-text"><a href="mailto:hello@uvpower.com">uvpower@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕐</span>
                <div>
                  <p className="contact-label">Hours:</p>
                  <p className="contact-text">Mon - Fri: 9AM - 6PM<br />Sat - Sun: 10AM - 4PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get exclusive deals, design tips, and latest updates</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              aria-label="Email for newsletter"
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Payment & Support Methods */}
      <div className="footer-methods">
        <div className="methods-container">
          <div className="methods-section">
            <h4>Payment Methods</h4>
            <div className="methods-icons">
              <span title="Credit Card">💳</span>
              <span title="Debit Card">🏧</span>
              <span title="Digital Wallet">📱</span>
              <span title="Bank Transfer">🏦</span>
              <span title="Cash on Delivery">💵</span>
            </div>
          </div>
          <div className="methods-section">
            <h4>Support</h4>
            <div className="support-links">
              <a href="#help">FAQ</a>
              <a href="#shipping">Shipping Info</a>
              <a href="#returns">Returns</a>
              <a href="#policy">Privacy Policy</a>
              <a href="#terms">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {currentYear} UV Power. All rights reserved. | Designed with ❤️ for creative thinkers
        </p>
        <div className="footer-certifications">
          <span>✓ Quality Verified</span>
          <span>✓ Customer Trusted</span>
          <span>✓ 100% Original</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

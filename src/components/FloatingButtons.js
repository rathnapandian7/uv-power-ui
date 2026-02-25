import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    navigate(-1);
  };

  const openWhatsApp = () => {
    const phoneNumber = '918234567890'; // Replace with your WhatsApp number
    const message = 'Hi! I am interested in your products.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="floating-buttons">
      {/* WhatsApp Button */}
      <a
        href="#"
        className="floating-btn whatsapp-btn"
        title="Chat on WhatsApp"
        onClick={(e) => {
          e.preventDefault();
          openWhatsApp();
        }}
      >
        <span className="whatsapp-icon">💬</span>
      </a>

      {/* Back Button */}
      <button
        className="floating-btn back-btn"
        title="Go Back"
        onClick={goBack}
      >
        <span className="back-icon">←</span>
      </button>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className="floating-btn back-to-top-btn"
          title="Back to Top"
          onClick={scrollToTop}
        >
          <span className="top-icon">↑</span>
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;

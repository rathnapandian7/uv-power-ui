import React from "react";
import { useNavigate } from "react-router-dom";
import "./SpecialOffers.css";

const SpecialOffers = () => {
  const navigate = useNavigate();

  const offer = {
    id: 1,
    title: "Bike Stickers",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    color: "#fd5e53",
    link: "/bike-vinyl-stickers"
  };

  return (
    <section className="special-offers-section">
      <h2 className="offers-title">🎉 Special Festival Offers 🎉</h2>
      <div className="offers-container">
        <div className="offer-card" style={{ borderTopColor: offer.color }}>
          <div className="offer-image-wrapper">
            <img src={offer.image} alt={offer.title} className="offer-image" />
            <div className="discount-badge" style={{ background: offer.color }}>
              {offer.discount}
            </div>
          </div>
          <h3 className="offer-title">{offer.title}</h3>
          <p className="offer-validity">Valid This Week Only!</p>
          <button 
            className="offer-cta-btn"
            onClick={() => navigate(offer.link)}
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;

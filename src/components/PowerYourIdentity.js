import React from "react";
import { useNavigate } from "react-router-dom";
import "./PowerYourIdentity.css";

const PowerYourIdentity = () => {
  const navigate = useNavigate();

  return (
    <section className="power-identity-section">
      <div className="power-content">
        <h2 className="power-title">Ready to Power Your Identity?</h2>
        <p className="power-subtitle">
          Join thousands of satisfied customers who have transformed their rides and spaces with 
          our premium customization solutions.
        </p>
        <button className="power-cta-btn" onClick={() => navigate("/contact")}>
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default PowerYourIdentity;

import React, { useState } from "react";
import "./ProcessFlow.css";

const ProcessFlow = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      icon: "🎨",
      title: "Choose Design",
      description: "Browse our extensive collection of designs or upload your own custom artwork",
      details: "Select from pre-made templates or create something unique"
    },
    {
      id: 2,
      icon: "✏️",
      title: "Customize",
      description: "Personalize your product with colors, text, size, and material options",
      details: "Real-time preview of your customizations"
    },
    {
      id: 3,
      icon: "👀",
      title: "Review",
      description: "Inspect your design one final time before placing the order",
      details: "Make any last-minute adjustments"
    },
    {
      id: 4,
      icon: "🛒",
      title: "Order",
      description: "Complete your purchase securely and track your order in real-time",
      details: "Fast and reliable shipping options available"
    },
    {
      id: 5,
      icon: "🎉",
      title: "Enjoy",
      description: "Receive your custom product and showcase your unique style!",
      details: "Lifetime satisfaction guarantee"
    }
  ];

  return (
    <section className="process-flow-section">
      <div className="process-container">
        {steps.map((step, index) => (
          <div key={step.id}>
            <div
              className={`process-step ${activeStep === step.id ? "active" : ""}`}
              onClick={() => setActiveStep(step.id)}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{step.id}</div>
              <h3 className="step-title">{step.title}</h3>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`step-connector ${activeStep >= step.id + 1 ? "completed" : ""}`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="step-details-container">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`step-details ${activeStep === step.id ? "show" : ""}`}
          >
            <h3>{step.title}</h3>
            <p className="details-description">{step.description}</p>
            <p className="details-info">{step.details}</p>
          </div>
        ))}
      </div>

      <div className="process-cta">
        <p className="cta-text">Ready to start your customization journey?</p>
        <button className="process-btn">Begin Now</button>
      </div>
    </section>
  );
};

export default ProcessFlow;

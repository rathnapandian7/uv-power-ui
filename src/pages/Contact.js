import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    // Simulate form submission
    try {
      console.log("Form submitted:", formData);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError("Error sending message. Please try again.");
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            We'd love to hear from you. Let's talk about your project!
          </p>
          <div className="hero-divider"></div>
        </div>
      </section>

      {/* Main Content */}
      <div className="contact-container">
        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="form-wrapper">
            <h2 className="section-title">Send us a Message</h2>
            <p className="section-subtitle">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {submitted && (
              <div className="success-message">
                <span className="success-icon">✓</span>
                <div>
                  <h3>Thank you for your message!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                <span className="error-icon">✕</span>
                <p>{error}</p>
              </div>
            )}

            {!submitted && (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "error" : ""}
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "error" : ""}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? "error" : ""}
                      placeholder="How can we help?"
                    />
                    {errors.subject && <span className="error-text">{errors.subject}</span>}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                    placeholder="Tell us about your project, needs, or questions..."
                    rows="6"
                  ></textarea>
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="contact-info-section">
          <h2 className="section-title">Contact Information</h2>

          <div className="contact-info-grid">
            {/* Email */}
            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3 className="info-title">Email</h3>
              <p className="info-text">support@uvpower.com</p>
              <p className="info-subtext">We'll respond within 24 hours</p>
            </div>

            {/* Phone */}
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3 className="info-title">Phone</h3>
              <p className="info-text">+91 98765 43210</p>
              <p className="info-subtext">Mon - Fri, 10AM to 6PM IST</p>
            </div>

            {/* Address */}
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3 className="info-title">Office Address</h3>
              <p className="info-text">UV Power Inc.</p>
              <p className="info-subtext">
                123 Design Street<br />
                New Delhi, India 110001
              </p>
            </div>

            {/* Social Media */}
            <div className="info-card">
              <div className="info-icon">🔗</div>
              <h3 className="info-title">Follow Us</h3>
              <div className="social-links">
                <a href="#facebook" className="social-link" title="Facebook">
                  f
                </a>
                <a href="#instagram" className="social-link" title="Instagram">
                  📷
                </a>
                <a href="#twitter" className="social-link" title="Twitter">
                  𝕏
                </a>
                <a href="#linkedin" className="social-link" title="LinkedIn">
                  in
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Map Section */}
      <section className="contact-map-section">
        <h2 className="section-title">Find Us</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4576871899147!2d77.22860031531385!3d28.613939892413157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd288cf5b5cf%3A0x6e6369782b9385cb!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="UV Power Location"
          ></iframe>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3 className="faq-question">How long does it take to deliver?</h3>
            <p className="faq-answer">
              Standard delivery takes 5-7 business days. Express delivery available for 2-3 days.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Can I customize my order?</h3>
            <p className="faq-answer">
              Absolutely! All our products are customizable. Visit our Custom Design page to get started.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">What's your return policy?</h3>
            <p className="faq-answer">
              We offer easy returns within 30 days of purchase. No questions asked!
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Do you offer bulk orders?</h3>
            <p className="faq-answer">
              Yes! Contact our sales team for wholesale pricing and bulk order discounts.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">How can I track my order?</h3>
            <p className="faq-answer">
              You'll receive a tracking link via email. Use it to monitor your shipment in real-time.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Is there a warranty?</h3>
            <p className="faq-answer">
              All products come with a 1-year warranty covering manufacturing defects.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

import React, { useState } from 'react';
import './CustomDesign.css';

const CustomDesign = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customText, setCustomText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#0066ff');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const categories = [
    {
      id: 1,
      name: 'Bike Vinyl Stickers',
      description: 'Custom stickers for your bike',
      icon: '🏍️',
      price: '₹299',
      minQty: 1,
    },
    {
      id: 2,
      name: 'Car Stickers',
      description: 'Personalized car decals',
      icon: '🚗',
      price: '₹199',
      minQty: 1,
    },
    {
      id: 3,
      name: 'LED Name Boards',
      description: 'Glowing neon name boards',
      icon: '💡',
      price: '₹1,299',
      minQty: 1,
    },
    {
      id: 4,
      name: 'Wood Engravings',
      description: 'Laser engraved wood art',
      icon: '🪵',
      price: '₹699',
      minQty: 1,
    },
    {
      id: 5,
      name: 'Keychains',
      description: 'Custom personalized keychains',
      icon: '🔑',
      price: '₹149',
      minQty: 5,
    },
    {
      id: 6,
      name: 'Number Plates',
      description: 'Premium custom number plates',
      icon: '🏷️',
      price: '₹499',
      minQty: 1,
    },
  ];

  const colors = [
    { name: 'Blue', value: '#0066ff' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Yellow', value: '#fbbf24' },
    { name: 'Green', value: '#10b981' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Black', value: '#1f2937' },
    { name: 'White', value: '#ffffff' },
  ];

  const sizes = [
    { id: 'small', label: 'Small (4" x 6")' },
    { id: 'medium', label: 'Medium (6" x 9")' },
    { id: 'large', label: 'Large (9" x 12")' },
    { id: 'custom', label: 'Custom Size' },
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedCategory || !customText || !email || !phone) {
      alert('Please fill all required fields');
      return;
    }

    const orderDetails = {
      category: selectedCategoryData.name,
      text: customText,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      email: email,
      phone: phone,
      message: message,
    };

    console.log('Order submitted:', orderDetails);
    alert(`Thank you! Your custom design request has been submitted.\nWe'll contact you at ${email} to finalize your design.`);
    
    // Reset form
    setSelectedCategory(null);
    setCustomText('');
    setSelectedColor('#0066ff');
    setSelectedSize('medium');
    setQuantity(1);
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="custom-design-page">
      {/* Hero Section */}
      <section className="design-hero">
        <div className="hero-content">
          <h1>Create Your Custom Design</h1>
          <p>Turn your imagination into reality with our professional customization service</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="design-container">
        <div className="design-content">
          {/* Left Side - Form */}
          <div className="design-form-section">
            <h2>Design Your Product</h2>
            <form onSubmit={handleSubmit} className="design-form">
              {/* Step 1: Category Selection */}
              <div className="form-group">
                <label className="required">Step 1: Choose Product Type</label>
                <div className="category-grid">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`category-option ${selectedCategory === category.id ? 'selected' : ''}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="category-icon">{category.icon}</div>
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                      <span className="price">{category.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedCategory && (
                <>
                  {/* Step 2: Text Customization */}
                  <div className="form-group">
                    <label htmlFor="customText" className="required">Step 2: Enter Your Text</label>
                    <textarea
                      id="customText"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Enter text for your design (max 100 characters)"
                      maxLength="100"
                      rows="3"
                      required
                    />
                    <span className="char-count">{customText.length}/100</span>
                  </div>

                  {/* Step 3: Color Selection */}
                  <div className="form-group">
                    <label className="required">Step 3: Choose Color</label>
                    <div className="color-palette">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          className={`color-option ${selectedColor === color.value ? 'selected' : ''}`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setSelectedColor(color.value)}
                          title={color.name}
                          aria-label={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Size Selection */}
                  <div className="form-group">
                    <label className="required">Step 4: Select Size</label>
                    <div className="size-selection">
                      {sizes.map((size) => (
                        <label key={size.id} className="size-option">
                          <input
                            type="radio"
                            name="size"
                            value={size.id}
                            checked={selectedSize === size.id}
                            onChange={(e) => setSelectedSize(e.target.value)}
                          />
                          <span>{size.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Step 5: Quantity */}
                  <div className="form-group">
                    <label htmlFor="quantity" className="required">
                      Step 5: Quantity (Min: {selectedCategoryData?.minQty || 1})
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(selectedCategoryData?.minQty || 1, parseInt(e.target.value) || 1))}
                      min={selectedCategoryData?.minQty || 1}
                      required
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="form-divider">
                    <h3>Contact Information</h3>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="required">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="required">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Additional Requirements</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us any special requirements, dimensions, or design ideas..."
                      rows="3"
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary btn-lg submit-btn">
                    Submit Custom Design Request
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Right Side - Preview */}
          <div className="design-preview-section">
            <h2>Live Preview</h2>
            
            {selectedCategory ? (
              <div className="preview-container">
                <div className="preview-product">
                  <div className="product-icon">{selectedCategoryData?.icon}</div>
                  <h3>{selectedCategoryData?.name}</h3>
                  <p className="product-description">{selectedCategoryData?.description}</p>
                </div>

                {customText && (
                  <div className="preview-text-display">
                    <div 
                      className="preview-text"
                      style={{ color: selectedColor }}
                    >
                      {customText}
                    </div>
                  </div>
                )}

                {customText && (
                  <div className="preview-details">
                    <div className="detail-item">
                      <span className="label">Color:</span>
                      <div 
                        className="detail-value color-swatch"
                        style={{ backgroundColor: selectedColor }}
                      />
                    </div>
                    <div className="detail-item">
                      <span className="label">Size:</span>
                      <span className="detail-value">{sizes.find(s => s.id === selectedSize)?.label}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Quantity:</span>
                      <span className="detail-value">{quantity}</span>
                    </div>
                    <div className="detail-item total">
                      <span className="label">Estimated Price:</span>
                      <span className="detail-value price">{selectedCategoryData?.price}</span>
                    </div>
                  </div>
                )}

                {!customText && (
                  <div className="preview-placeholder">
                    <p>Your design preview will appear here once you enter your text</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-selection">
                <div className="no-selection-icon">🎨</div>
                <p>Select a product category to start designing</p>
                <p className="subtitle">Choose from 6 product categories above</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="design-info">
        <div className="info-container">
          <h2>Why Choose UV Power for Custom Designs?</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">✨</div>
              <h3>Expert Design Team</h3>
              <p>Professional designers will refine your vision and bring it to life</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>Fast Turnaround</h3>
              <p>Get your custom design in 3-5 business days</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>High Quality</h3>
              <p>Premium materials and precision craftsmanship</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💚</div>
              <h3>Satisfaction Guaranteed</h3>
              <p>100% quality check and customer satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="design-cta">
        <h2>Ready to Create Your Custom Design?</h2>
        <p>Start designing now and let our team bring your vision to reality</p>
      </section>
    </div>
  );
};

export default CustomDesign;

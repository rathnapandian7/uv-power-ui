import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import * as api from '../services/api';
import ProcessFlow from '../components/ProcessFlow';
import PowerYourIdentity from '../components/PowerYourIdentity';
import './Home.css';

const Home = () => {
  const [customText, setCustomText] = useState('Your Name Here');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOfferBanner, setShowOfferBanner] = useState(true);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offers, setOffers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const { isLoggedIn, adminData } = useContext(AdminContext);

  // Fetch categories and products from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingData(true);
        const [categories, products] = await Promise.all([
          api.fetchAllCategories().catch(() => []),
          api.fetchAllProducts().catch(() => [])
        ]);
        
        setCategoriesData(categories && categories.length > 0 ? categories : []);
        setProductsData(products && products.length > 0 ? products : []);
      } catch (error) {
        console.error("Error loading data:", error);
        setCategoriesData([]);
        setProductsData([]);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  // Hero Slider Images
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      title: 'Premium Vinyl Stickers',
      subtitle: 'Transform Your Ride Today'
    },
    {
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      title: 'LED Name Boards',
      subtitle: 'Illuminate Your Style'
    },
    {
      image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?auto=format&fit=crop&w=1200&q=80',
      title: 'Laser Engraved Products',
      subtitle: 'Precision Craftsmanship'
    }
  ];

  // Default fallback categories
  const defaultCategories = [
    { 
      id: 1, 
      name: 'Bike Vinyl Stickers', 
      icon: '🏍️', 
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      link: '/bike-stickers' 
    },
    { 
      id: 2, 
      name: 'Car Stickers', 
      icon: '🚗', 
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
      link: '/car-stickers' 
    },
    { 
      id: 3, 
      name: 'Acrylic LED Boards', 
      icon: '💡', 
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
      link: '/acrylic-boards' 
    },
    { 
      id: 4, 
      name: 'Laser Engraved Wood', 
      icon: '🪵', 
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
      link: '/wood-products' 
    },
    { 
      id: 5, 
      name: 'Custom Keychains', 
      icon: '🔑', 
      image: 'https://images.unsplash.com/photo-1599634537087-3b64af256590?auto=format&fit=crop&w=600&q=80',
      link: '/keychains' 
    },
    { 
      id: 6, 
      name: 'Premium Number Plates', 
      icon: '🏷️', 
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80',
      link: '/number-plates' 
    }
  ];

  // Use fetched categories or fallback to defaults
  const categories = categoriesData && categoriesData.length > 0 ? categoriesData : defaultCategories;

  // Best selling products - use fetched data or defaults
  const defaultProducts = [
    { 
      id: 1, 
      name: 'Custom Bike Sticker Set', 
      price: '₹299', 
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=80',
      rating: 4.8,
      reviews: 245
    },
    { 
      id: 2, 
      name: 'LED Name Board - Blue', 
      price: '₹1,299', 
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80',
      rating: 4.9,
      reviews: 312
    },
    { 
      id: 3, 
      name: 'Car Window Sticker', 
      price: '₹199', 
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=500&q=80',
      rating: 4.7,
      reviews: 189
    },
    { 
      id: 4, 
      name: 'Engraved Wood Plaque', 
      price: '₹699', 
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80',
      rating: 4.9,
      reviews: 267
    },
    { 
      id: 5, 
      name: 'Custom Keychain Set', 
      price: '₹149', 
      image: 'https://images.unsplash.com/photo-1599634537087-3b64af256590?auto=format&fit=crop&w=500&q=80',
      rating: 4.6,
      reviews: 428
    },
    { 
      id: 6, 
      name: 'Premium Number Plate', 
      price: '₹499', 
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=500&q=80',
      rating: 4.8,
      reviews: 203
    }
  ];

  // Use fetched products (limit to 6 for display) or defaults
  const products = productsData && productsData.length > 0 ? productsData.slice(0, 6) : defaultProducts;

  const whyChooseUs = [
    { icon: '⚡', title: 'Laser Precision', desc: 'Exact engraving and cutting' },
    { icon: '🛡️', title: 'UV Resistant', desc: 'Premium durable materials' },
    { icon: '🎨', title: 'Custom Designs', desc: 'Expert design team' },
    { icon: '🚀', title: 'Fast Delivery', desc: '3-5 business days' },
    { icon: '🏢', title: 'Bulk Orders', desc: 'Corporate solutions' },
    { icon: '✅', title: '100% Quality', desc: 'Strict quality control' }
  ];

  const testimonials = [
    { 
      name: 'Raj Kumar', 
      text: 'UV Power made my bike look absolutely stunning! The stickers are premium quality.', 
      rating: 5 
    },
    { 
      name: 'Priya Singh', 
      text: 'The LED name board is incredible. Perfect for my room! Highly recommend.', 
      rating: 5 
    },
    { 
      name: 'Arjun Patel', 
      text: 'Best quality customization I\'ve ever seen. Customer service is excellent!', 
      rating: 5 
    }
  ];

  const instagramPosts = [
    '🎨', '🏍️', '💙', '⚡', '✨', '🔥', '🎯', '💜'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Auto-rotate hero slider every 5 seconds
  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slider);
  }, [heroSlides.length]);

  // Load offers from localStorage - no auto-popup
  useEffect(() => {
    const savedOffers = localStorage.getItem('uv-power-offers');
    if (savedOffers) {
      setOffers(JSON.parse(savedOffers));
    }
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('uv-power-cart')) || [];
    cart.push(product);
    localStorage.setItem('uv-power-cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.name} added to cart!`);
    setShowProductModal(false);
  };

  return (
    <div className="home-page">
      {/* Offer Popup Modal - Hidden */}
      {showOfferModal && offers.length > 0 && (
        <div className="offer-modal-backdrop" onClick={() => setShowOfferModal(false)}>
          <div className="offer-modal" onClick={(e) => e.stopPropagation()}>
            <button className="offer-close-btn" onClick={() => setShowOfferModal(false)}>✕</button>
            <div className="offer-content">
              {offers[0] && (
                <>
                  <h2 className="offer-title">{offers[0].title}</h2>
                  <p className="offer-discount">{offers[0].discount}</p>
                  <p className="offer-description">{offers[0].description}</p>
                  <p className="offer-code">Code: <span className="code-highlight">{offers[0].code}</span></p>
                  <Link to="/products" className="btn btn-primary" onClick={() => setShowOfferModal(false)}>
                    Shop Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <div className="product-modal-backdrop" onClick={() => setShowProductModal(false)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowProductModal(false)}>✕</button>
            <div className="product-modal-content">
              <div className="product-modal-image">
                <img src={selectedProduct.imageUrl || selectedProduct.image} alt={selectedProduct.productName || selectedProduct.name} />
              </div>
              <div className="product-modal-details">
                <h2>{selectedProduct.productName || selectedProduct.name}</h2>
                <div className="product-modal-rating">
                  <span className="stars">{'⭐'.repeat(Math.floor(selectedProduct.rating))}</span>
                  <span className="rating-text">{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
                </div>
                <p className="product-modal-price">{selectedProduct.price}</p>
                <p className="product-modal-desc">Premium quality customizable product. Available in multiple colors and designs.</p>
                <div className="product-modal-actions">
                  <button className="btn btn-primary" onClick={() => handleAddToCart(selectedProduct)}>🛒 Add to Cart</button>
                  <Link to="/products" className="btn btn-secondary" onClick={() => setShowProductModal(false)}>💳 Buy Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Slider */}
      <section className="hero-section" style={{backgroundImage: `url(${heroSlides[currentSlide].image})`}}>
        <div className="hero-overlay"></div>
        <button className="slider-nav slider-prev" onClick={handlePrevSlide}>❮</button>
        <button className="slider-nav slider-next" onClick={handleNextSlide}>❯</button>
        
        <div className="slider-indicators">
          {heroSlides.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>

        <div className="hero-content">
          <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
          <p className="hero-subtitle">{heroSlides[currentSlide].subtitle}</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary glow-btn">
              Shop Now
            </Link>
            <Link to="/custom-design" className="btn btn-secondary glow-btn">
              Get Custom Design
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="section-header">
          <h2 className="section-title">Featured Categories</h2>
          <p className="section-subtitle">Explore our premium customization solutions</p>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link to={`/category/${encodeURIComponent(category.categoryName || category.name)}`} key={category.id} className="category-card glow-card">
              <div className="category-image-wrapper">
                  <img src={category.imageUrl || category.image} alt={category.categoryName || category.category_name} className="category-image" />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.categoryName || category.name}</h3>
              </div>
              <div className="card-glow"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="best-selling">
        <div className="section-header">
          <h2 className="section-title">Best Selling Products</h2>
          <p className="section-subtitle">Top picks loved by our customers</p>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
              <div className="product-image-container">
                <img src={product.imageUrl || product.image} alt={product.productName || product.name} className="product-image" />
                <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>♡</button>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.productName || product.name}</h3>
                <div className="product-rating">
                  <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
                  <span className="rating-text">{product.rating} ({product.reviews})</span>
                </div>
                <p className="product-price">{product.price}</p>
                <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); handleProductClick(product); }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose UV Power */}
      <section className="why-choose">
        <div className="section-header">
          <h2 className="section-title">Why Choose UV Power?</h2>
          <p className="section-subtitle">Premium quality, proven excellence</p>
        </div>
        <div className="features-grid">
          {whyChooseUs.map((feature, index) => (
            <div key={index} className="feature-card fade-in">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Custom Preview */}
      <section className="custom-preview">
        <div className="preview-container">
          <h2>Live Custom Preview</h2>
          <p className="preview-subtitle">Design your custom name board in real-time</p>
          <div className="preview-input-group">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter your name"
              className="preview-input"
              maxLength="20"
            />
          </div>
          <div className="preview-display">
            <div className="preview-board">
              <div className="board-text">{customText}</div>
            </div>
          </div>
          <button className="btn btn-primary glow-btn btn-lg" onClick={() => { window.location.href = '/custom-design'; }}>
            Design Now
          </button>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <h2 className="section-title">Customer Love</h2>
          <p className="section-subtitle">Join thousands of satisfied customers</p>
        </div>
        <div className="testimonial-carousel">
          <div className="testimonial-card glow-card">
            <div className="stars">
              {'⭐'.repeat(testimonials[currentTestimonial].rating)}
            </div>
            <p className="testimonial-text">"{testimonials[currentTestimonial].text}"</p>
            <p className="testimonial-author">— {testimonials[currentTestimonial].name}</p>
          </div>
        </div>
        <div className="carousel-controls">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Social Proof / Instagram */}
      <section className="social-proof">
        <div className="section-header">
          <h2 className="section-title">Join Our Community</h2>
          <p className="section-subtitle">Follow @UVPower for latest designs & updates</p>
        </div>
        <div className="instagram-grid">
          {instagramPosts.map((post, index) => (
            <a href="#" key={index} className="instagram-item">
              {post}
            </a>
          ))}
        </div>
        <div className="social-links">
          <a href="#" className="social-btn">📷 Instagram</a>
          <a href="#" className="social-btn">👍 Facebook</a>
          <a href="#" className="social-btn">▶️ YouTube</a>
        </div>
      </section>

      {/* Promotion Banner with Active Offers */}
      <section className="promotion">
        <div className="promo-content">
          {offers.length > 0 ? (
            <div className="active-offers">
              <h2>🎉 Special Festival Offers 🎉</h2>
              {offers.map((offer) => (
                <div key={offer.id} className="offer-display">
                  <h3>{offer.title}</h3>
                  <p className="offer-discount-big">{offer.discount}</p>
                  <p className="offer-desc">{offer.description}</p>
                  <p className="offer-code-display">Use Code: <span className="code">{offer.code}</span></p>
                </div>
              ))}
              <Link to="/products" className="btn btn-primary glow-btn btn-lg">
                Grab the Deal
              </Link>
            </div>
          ) : (
            <div className="default-offer">
              <h2>⚡ Limited Time Offer ⚡</h2>
              <p className="promo-text">Flat 20% OFF on Acrylic LED Boards</p>
              <p className="promo-countdown">Valid for 48 hours only!</p>
              <button className="btn btn-primary glow-btn btn-lg">
                Grab the Deal
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-container">
          <h2>Ready to Power Your Identity?</h2>
          <p>Transform your style with UV Power's premium customization solutions</p>
          <div className="cta-buttons">
            <Link to="/products" className="btn btn-primary glow-btn btn-lg">
              Explore Products
            </Link>
            <button className="btn btn-secondary glow-btn btn-lg">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple 4-step process to get your custom product</p>
        </div>
        <div className="steps-grid">
          {[
            { step: 1, title: 'Choose Design', desc: 'Browse our categories or upload your design', icon: '🎨' },
            { step: 2, title: 'Customize', desc: 'Personalize with colors, text, and details', icon: '✏️' },
            { step: 3, title: 'Review', desc: 'Preview your design before ordering', icon: '👀' },
            { step: 4, title: 'Order & Enjoy', desc: 'Fast delivery to your doorstep', icon: '🚚' }
          ].map((item, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{item.step}</div>
              <div className="step-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {[
            { number: '10K+', label: 'Happy Customers' },
            { number: '50+', label: 'Product Categories' },
            { number: '99.8%', label: 'Quality Rating' },
            { number: '24/7', label: 'Customer Support' }
          ].map((stat, idx) => (
            <div key={idx} className="stat-item">
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Get Exclusive Offers & Updates!</h2>
          <p>Subscribe to our newsletter for 15% discount on your first order</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); }}>
            <input type="email" placeholder="Enter your email" required className="newsletter-input" />
            <button type="submit" className="btn btn-primary">Subscribe Now</button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Find answers to common questions</p>
        </div>
        <div className="faq-grid">
          {[
            { q: 'Do you offer customization?', a: 'Yes! We offer full customization on all products with your designs, text, and logos.' },
            { q: 'What is the delivery time?', a: 'Standard delivery takes 3-5 business days. Express delivery available for rush orders.' },
            { q: 'Is there a minimum order quantity?', a: 'No minimum! Order as few or as many as you need.' },
            { q: 'Can I see a preview before ordering?', a: 'Absolutely! We provide a live preview of your design before payment.' }
          ].map((item, idx) => (
            <div key={idx} className="faq-card">
              <h4>❓ {item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Mobile Button */}
      <div className="sticky-mobile-btn">
        <Link to="/products" className="btn btn-primary btn-block">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Home;

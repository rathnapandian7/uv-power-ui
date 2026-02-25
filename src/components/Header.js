import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [logoText, setLogoText] = useState('UV');
  const [logoImage, setLogoImage] = useState(null);
  const fileInputRef = useRef(null);
  const { isLoggedIn, adminData } = useContext(AdminContext);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  // Load logo from localStorage on mount
  useEffect(() => {
    const savedLogo = localStorage.getItem("uv-power-logo");
    if (savedLogo) {
      const logo = JSON.parse(savedLogo);
      setLogoText(logo.text || 'UV');
      setLogoImage(logo.image || null);
    }

    const updateCartCount = () => {
      const savedCart = localStorage.getItem("uv-power-cart");
      const cart = savedCart ? JSON.parse(savedCart) : [];
      setCartCount(cart.length);
    };

    updateCartCount();
    
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save logo changes
  const handleSaveLogo = () => {
    const logoData = { text: logoText, image: logoImage };
    localStorage.setItem("uv-power-logo", JSON.stringify(logoData));
    setShowLogoModal(false);
  };

  return (
    <header className="header">
      <div className="logo-wrapper" onClick={() => isLoggedIn && adminData && setShowLogoModal(true)}>
        <div className="logo">
          {logoImage ? (
            <img src={logoImage} alt="Logo" className="logo-image" />
          ) : (
            <span className="logo-text">{logoText}</span>
          )}
          {isLoggedIn && adminData && <span className="logo-edit-hint">✏️</span>}
        </div>
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li><Link to="/" onClick={closeMenu} className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
          <li><Link to="/products" onClick={closeMenu} className={location.pathname === "/products" ? "active" : ""}>Products</Link></li>
          <li><Link to="/shop" onClick={closeMenu} className={location.pathname === "/shop" ? "active" : ""}>Shop Categories</Link></li>
          <li><Link to="/about" onClick={closeMenu} className={location.pathname === "/about" ? "active" : ""}>About Us</Link></li>
          <li><Link to="/contact" onClick={closeMenu} className={location.pathname === "/contact" ? "active" : ""}>Contact</Link></li>
          <li className="admin-login"><Link to="/admin-login" onClick={closeMenu} className={location.pathname === "/admin-login" ? "active" : ""}>Admin Login</Link></li>
        </ul>
      </nav>
      
      {/* Cart Button */}
      <Link to="/cart" className="cart-button" aria-label="Shopping cart">
        <span className="cart-icon">🛒</span>
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Logo Edit Modal - Only for Admin */}
      {showLogoModal && isLoggedIn && adminData && (
        <div className="modal-backdrop" onClick={() => setShowLogoModal(false)}>
          <div className="logo-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Logo</h2>
              <button className="modal-close" onClick={() => setShowLogoModal(false)}>✕</button>
            </div>
            
            <div className="modal-body">
              {/* Logo Preview */}
              <div className="logo-preview">
                <div className="preview-box">
                  {logoImage ? (
                    <img src={logoImage} alt="Logo Preview" className="preview-image" />
                  ) : (
                    <span className="preview-text">{logoText}</span>
                  )}
                </div>
              </div>

              {/* Logo Text Input */}
              <div className="form-group">
                <label>Logo Text</label>
                <input
                  type="text"
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value.toUpperCase())}
                  maxLength="10"
                  placeholder="Logo text"
                  className="form-input"
                />
              </div>

              {/* Logo Image Upload */}
              <div className="form-group">
                <label>Logo Image</label>
                <div className="image-upload-area">
                  <button
                    type="button"
                    className="upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    📤 Upload Image
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  {logoImage && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => setLogoImage(null)}
                    >
                      🗑️ Remove Image
                    </button>
                  )}
                </div>
              </div>

              <p className="info-text">
                You can use either text or image for your logo. Both will be saved.
              </p>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowLogoModal(false)}>
                Cancel
              </button>
              <button className="btn-save" onClick={handleSaveLogo}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

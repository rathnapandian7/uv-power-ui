import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductQuickView from "../components/ProductQuickView";
import * as api from "../services/api";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Fetch category and products on mount or when categoryName changes
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);

        // Fetch all products
        const allProducts = await api.fetchAllProducts();
        
        // Fetch all categories to find the matching one
        const allCategories = await api.fetchAllCategories();
        
        // Find the category (case-insensitive)
        const category = allCategories.find(
          cat => (cat.categoryName || cat.name).toLowerCase() === decodeURIComponent(categoryName).toLowerCase()
        );

        if (category) {
          setCategoryData(category);
          
          // Filter products by category
          const filteredProducts = allProducts.filter(
            product => (product.category || "").toLowerCase() === (category.categoryName || category.name).toLowerCase()
          );
          setProducts(filteredProducts);
        } else {
          // If category not found, show error
          setProducts([]);
          setCategoryData(null);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
        setProducts([]);
        setCategoryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryName]);

  const handleAddToCart = (product) => {
    try {
      const productToAdd = {
        ...product,
        quantity: 1,
        cartItemId: `${product.id}-${Date.now()}`
      };

      const success = addToCart(productToAdd);
      
      if (success) {
        setNotificationMessage(`${product.productName || product.name} added to cart!`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleBuy = (product) => {
    try {
      const productToAdd = {
        ...product,
        quantity: 1,
        cartItemId: `${product.id}-${Date.now()}`
      };

      addToCart(productToAdd);
      
      setNotificationMessage(`${product.productName || product.name} added! Proceeding to checkout...`);
      setShowNotification(true);
      
      setTimeout(() => {
        navigate("/checkout");
      }, 500);
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  if (loading) {
    return (
      <div className="category-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="category-page">
        <div className="error-container">
          <h2>Category Not Found</h2>
          <p>The category you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/shop")} className="btn btn-primary">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Hero Section */}
      <div className="category-hero">
        <div className="hero-background" 
          style={{
            backgroundImage: `url(${categoryData.imageUrl || categoryData.image || "https://via.placeholder.com/1200x400"})`
          }}>
        </div>
        <div className="hero-content">
          <h1 className="category-page-title">{categoryData.categoryName || categoryData.name}</h1>
          <p className="category-page-description">{categoryData.description}</p>
          <div className="hero-divider"></div>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="notification-toast">
          <span>✓</span> {notificationMessage}
        </div>
      )}

      {/* Products Section */}
      <div className="category-container">
        <div className="products-count">
          <p>Showing <strong>{products.length}</strong> product{products.length !== 1 ? "s" : ""}</p>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <p>No products found in this category.</p>
            <button onClick={() => navigate("/shop")} className="btn btn-primary">
              Back to Shop
            </button>
          </div>
        ) : (
          <div className="category-products-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="category-product-card"
              >
                <div className="product-img-wrapper">
                  <img
                    src={product.imageUrl || product.image}
                    alt={product.productName || product.name}
                    className="product-img"
                  />
                  {product.badge && <div className="product-badge-label">{product.badge}</div>}
                  <div className="product-overlay-quick">
                    <button 
                      className="quick-view-btn"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                <div className="product-card-info">
                  <h3 className="product-card-name">{product.productName || product.name}</h3>
                  <p className="product-card-desc">{product.description}</p>

                  {(product.rating || product.reviews) && (
                    <div className="product-card-rating">
                      <span className="rating-stars">★★★★★</span>
                      <span className="rating-text">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  )}

                  <div className="product-card-footer">
                    <span className="product-card-price">₹{product.price}</span>
                    <button
                      className="add-to-cart-quick"
                      onClick={() => handleAddToCart(product)}
                    >
                      🛒 Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuy={handleBuy}
      />
    </div>
  );
};

export default CategoryPage;

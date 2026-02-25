import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";
import ProtectedRoute from "../components/ProtectedRoute";
import { AdminProvider } from "../context/AdminContext";
import { CartProvider } from "../context/CartContext";
import Home from "./Home";
import CategoryPage from "./CategoryPage";
import CustomDesign from "./CustomDesign";
import BikeVinylStickers from "./BikeVinylStickers";
import CarStickers from "./CarStickers";
import AcrylicLEDNameBoards from "./AcrylicLEDNameBoards";
import LaserEngravedWoodProducts from "./LaserEngravedWoodProducts";
import CustomizedKeychains from "./CustomizedKeychains";
import CustomizedWallClocks from "./CustomizedWallClocks";
import PremiumNumberPlates from "./PremiumNumberPlates";
import Shop from "./Shop";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import Checkout from "./Checkout";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

import Products from "./Products";
import "./Products.css";
import "../components/ProductDetail.css";
import "../components/SpecialOffers.css";
import "../components/ProcessFlow.css";
import "../components/PowerYourIdentity.css";
import "../components/Footer.css";

// ScrollToTop component
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const MainApp = () => (
  <AdminProvider>
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <FloatingButtons />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/custom-design" element={<CustomDesign />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bike-vinyl-stickers" element={<BikeVinylStickers />} />
          <Route path="/car-stickers" element={<CarStickers />} />
          <Route path="/acrylic-led-name-boards" element={<AcrylicLEDNameBoards />} />
          <Route path="/laser-engraved-wood-products" element={<LaserEngravedWoodProducts />} />
          <Route path="/customized-keychains" element={<CustomizedKeychains />} />
          <Route path="/customized-wall-clocks" element={<CustomizedWallClocks />} />
          <Route path="/premium-number-plates" element={<PremiumNumberPlates />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
      </Routes>
      <Footer />
    </Router>
    </CartProvider>
  </AdminProvider>
);

export default MainApp;

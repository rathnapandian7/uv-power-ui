// import React, { createContext, useContext, useState, useEffect } from "react";

// // ── DEFAULT DATA ──────────────────────────────────────────────────────────────
// const DEFAULT_CATEGORIES = [
//   { id: 1, name: "Bike Vinyl Stickers", icon: "🏍️", description: "Premium vinyl stickers for bikes with weather-resistant quality", link: "/bike-vinyl-stickers" },
//   { id: 2, name: "Car Stickers", icon: "🚗", description: "Custom car decals with premium adhesive and durability", link: "/car-stickers" },
//   { id: 3, name: "Acrylic LED Name Boards", icon: "💡", description: "Illuminated acrylic boards perfect for any space", link: "/acrylic-led-name-boards" },
//   { id: 4, name: "Laser Engraved Wood", icon: "🪵", description: "Precision laser engraved wooden products and art", link: "/laser-engraved-wood-products" },
//   { id: 5, name: "Customized Keychains", icon: "🔑", description: "Personalized keychains for gifts and collectibles", link: "/customized-keychains" },
//   { id: 6, name: "Premium Number Plates", icon: "🏷️", description: "Custom vehicle number plates with premium quality", link: "/premium-number-plates" },
// ];

// const DEFAULT_PRODUCTS = [
//   { id: 1, name: "Bike Vinyl Stickers", price: 299, category: "Bike Vinyl Stickers", stock: 50, status: "active", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", description: "Premium vinyl stickers for bikes", rating: 4.8, reviews: 245, badge: "Best Seller" },
//   { id: 2, name: "Car Stickers", price: 199, category: "Car Stickers", stock: 80, status: "active", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", description: "Custom car decals & stickers", rating: 4.7, reviews: 189, badge: "Popular" },
//   { id: 3, name: "Acrylic LED Name Boards", price: 1299, category: "Acrylic LED Name Boards", stock: 20, status: "active", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", description: "Glowing LED name boards", rating: 4.9, reviews: 312, badge: "Premium" },
//   { id: 4, name: "Laser Engraved Wood", price: 699, category: "Laser Engraved Wood", stock: 35, status: "active", image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80", description: "Precision laser engraved wood art", rating: 4.9, reviews: 267, badge: "Trending" },
//   { id: 5, name: "Customized Keychains", price: 149, category: "Customized Keychains", stock: 100, status: "active", image: "https://images.unsplash.com/photo-1599634537087-3b64af256590?auto=format&fit=crop&w=400&q=80", description: "Personalized custom keychains", rating: 4.6, reviews: 428, badge: "Affordable" },
//   { id: 6, name: "Premium Number Plates", price: 499, category: "Premium Number Plates", stock: 40, status: "active", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80", description: "Premium custom number plates", rating: 4.8, reviews: 203, badge: "Legal" },
// ];

// // ── HELPERS ───────────────────────────────────────────────────────────────────
// const loadFromStorage = (key, fallback) => {
//   try {
//     const raw = localStorage.getItem(key);
//     return raw ? JSON.parse(raw) : fallback;
//   } catch {
//     return fallback;
//   }
// };

// const saveToStorage = (key, value) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(value));
//   } catch (e) {
//     console.warn("localStorage write failed", e);
//   }
// };

// // ── CONTEXT ───────────────────────────────────────────────────────────────────
// export const DataContext = createContext(null);

// export const DataProvider = ({ children }) => {
//   const [products, setProductsState] = useState(() =>
//     loadFromStorage("uvpower_products", DEFAULT_PRODUCTS)
//   );
//   const [categories, setCategoriesState] = useState(() =>
//     loadFromStorage("uvpower_categories", DEFAULT_CATEGORIES)
//   );

//   // Persist every change to localStorage
//   const setProducts = (updater) => {
//     setProductsState((prev) => {
//       const next = typeof updater === "function" ? updater(prev) : updater;
//       saveToStorage("uvpower_products", next);
//       return next;
//     });
//   };

//   const setCategories = (updater) => {
//     setCategoriesState((prev) => {
//       const next = typeof updater === "function" ? updater(prev) : updater;
//       saveToStorage("uvpower_categories", next);
//       return next;
//     });
//   };

//   // CRUD helpers for products
//   const addProduct = (data) => {
//     const newProduct = {
//       ...data,
//       id: Date.now(),
//       rating: data.rating || 4.5,
//       reviews: data.reviews || 0,
//       badge: data.badge || "New",
//     };
//     setProducts((prev) => [...prev, newProduct]);
//     return newProduct;
//   };

//   const updateProduct = (id, data) => {
//     setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
//   };

//   const deleteProduct = (id) => {
//     setProducts((prev) => prev.filter((p) => p.id !== id));
//   };

//   // CRUD helpers for categories
//   const addCategory = (data) => {
//     const newCat = { ...data, id: Date.now() };
//     setCategories((prev) => [...prev, newCat]);
//     return newCat;
//   };

//   const updateCategory = (id, data) => {
//     setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
//   };

//   const deleteCategory = (id) => {
//     setCategories((prev) => prev.filter((c) => c.id !== id));
//   };

//   // Reset to defaults (useful for dev)
//   const resetToDefaults = () => {
//     setProducts(DEFAULT_PRODUCTS);
//     setCategories(DEFAULT_CATEGORIES);
//   };

//   return (
//     <DataContext.Provider
//       value={{
//         products,
//         categories,
//         setProducts,
//         setCategories,
//         addProduct,
//         updateProduct,
//         deleteProduct,
//         addCategory,
//         updateCategory,
//         deleteCategory,
//         resetToDefaults,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// // Convenience hook
// export const useData = () => {
//   const ctx = useContext(DataContext);
//   if (!ctx) throw new Error("useData must be used inside <DataProvider>");
//   return ctx;
// };
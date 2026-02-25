import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import * as api from "../services/api";
import "./AdminDashboard.css";

// ─── INITIAL DATA ────────────────────────────────────────────────────────────
const INITIAL_CATEGORIES = [
  {
    id: 1,
    name: "Bike Vinyl Stickers",
    icon: "🏍️",
    description: "Premium vinyl stickers for bikes",
    link: "/bike-stickers",
    productCount: 0,
  },
  {
    id: 2,
    name: "Car Stickers",
    icon: "🚗",
    description: "Custom car decals with premium adhesive",
    link: "/car-stickers",
    productCount: 0,
  },
  {
    id: 3,
    name: "Acrylic LED Boards",
    icon: "💡",
    description: "Illuminated acrylic boards",
    link: "/acrylic-boards",
    productCount: 0,
  },
  {
    id: 4,
    name: "Laser Engraved Wood",
    icon: "🪵",
    description: "Precision laser engraved wooden products",
    link: "/wood-products",
    productCount: 0,
  },
  {
    id: 5,
    name: "Custom Keychains",
    icon: "🔑",
    description: "Personalized keychains for gifts",
    link: "/keychains",
    productCount: 0,
  },
  {
    id: 6,
    name: "Premium Number Plates",
    icon: "🏷️",
    description: "Custom vehicle number plates",
    link: "/number-plates",
    productCount: 0,
  },
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    productName: "Custom Bike Sticker Set",
    price: 299,
    category: "Bike Vinyl Stickers",
    stock: 50,
    status: "active",
    image: null,
    description: "Premium vinyl sticker set for bikes",
  },
  {
    id: 2,
    productName: "LED Name Board - Blue",
    price: 1299,
    category: "Acrylic LED Boards",
    stock: 20,
    status: "active",
    image: null,
    description: "Blue LED illuminated name board",
  },
];

// ─── OFFERS TAB ───────────────────────────────────────────────────────────────
const OffersTab = ({ offers, setOffers }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [newOffer, setNewOffer] = useState({
    title: "",
    discount: "",
    description: "",
    code: "",
  });

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (newOffer.title && newOffer.discount && newOffer.code) {
      const offer = {
        id: Date.now(),
        ...newOffer,
        createdAt: new Date().toLocaleDateString(),
      };
      const updatedOffers = [...offers, offer];
      setOffers(updatedOffers);
      localStorage.setItem("uv-power-offers", JSON.stringify(updatedOffers));
      setNewOffer({ title: "", discount: "", description: "", code: "" });
      setShowModal(false);
    }
  };

  const handleDeleteOffer = (id) => {
    const updatedOffers = offers.filter((offer) => offer.id !== id);
    setOffers(updatedOffers);
    localStorage.setItem("uv-power-offers", JSON.stringify(updatedOffers));
  };

  return (
    <div className="admin-tab">
      <div className="tab-header">
        <h2>🎉 Festival Offers</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Offer
        </button>
      </div>

      {showModal && (
        <Modal
          title="Create Festival Offer"
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleAddOffer} className="offer-form">
            <div className="form-group">
              <label>Festival/Offer Title</label>
              <input
                type="text"
                placeholder="e.g., Diwali Special"
                value={newOffer.title}
                onChange={(e) =>
                  setNewOffer({ ...newOffer, title: e.target.value })
                }
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Discount</label>
              <input
                type="text"
                placeholder="e.g., 30% OFF"
                value={newOffer.discount}
                onChange={(e) =>
                  setNewOffer({ ...newOffer, discount: e.target.value })
                }
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="e.g., Get up to 30% discount on all products this Diwali!"
                value={newOffer.description}
                onChange={(e) =>
                  setNewOffer({ ...newOffer, description: e.target.value })
                }
                className="form-input"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Promo Code</label>
              <input
                type="text"
                placeholder="e.g., DIWALI30"
                value={newOffer.code}
                onChange={(e) =>
                  setNewOffer({ ...newOffer, code: e.target.value })
                }
                className="form-input"
                required
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Offer
              </button>
            </div>
          </form>
        </Modal>
      )}

      <div className="offers-list">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-header">
                <h3>{offer.title}</h3>
                <span className="offer-discount">{offer.discount}</span>
              </div>
              <p className="offer-desc">{offer.description}</p>
              <div className="offer-footer">
                <code className="offer-code">{offer.code}</code>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteOffer(offer.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No offers created yet. Create your first festival offer!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── BOOKINGS TAB ─────────────────────────────────────────────────────────────
const BookingsTab = () => {
  const [bookings] = useState([
    {
      id: 1,
      customer: "Raj Kumar",
      product: "Bike Sticker Set",
      qty: 3,
      amount: 897,
      date: "2026-02-20",
      status: "Delivered",
      contact: "98765-43210",
    },
    {
      id: 2,
      customer: "Priya Singh",
      product: "LED Board",
      qty: 1,
      amount: 1299,
      date: "2026-02-22",
      status: "Shipped",
      contact: "98765-43211",
    },
    {
      id: 3,
      customer: "Arjun Patel",
      product: "Keychains",
      qty: 5,
      amount: 745,
      date: "2026-02-23",
      status: "Processing",
      contact: "98765-43212",
    },
    {
      id: 4,
      customer: "Maya Reddy",
      product: "Number Plate",
      qty: 2,
      amount: 998,
      date: "2026-02-21",
      status: "Delivered",
      contact: "98765-43213",
    },
    {
      id: 5,
      customer: "Vikram Singh",
      product: "Engraved Wood",
      qty: 1,
      amount: 699,
      date: "2026-02-23",
      status: "Processing",
      contact: "98765-43214",
    },
  ]);

  const statusColors = {
    Delivered: "#10b981",
    Shipped: "#3b82f6",
    Processing: "#f59e0b",
  };

  return (
    <div className="admin-tab">
      <div className="tab-header">
        <h2>📦 Orders & Bookings</h2>
        <div className="header-stats">
          <div className="stat-badge">Total: {bookings.length}</div>
          <div className="stat-badge success">
            Delivered: {bookings.filter((b) => b.status === "Delivered").length}
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>#{booking.id}</td>
                <td>
                  <strong>{booking.customer}</strong>
                  <br />
                  <small>{booking.contact}</small>
                </td>
                <td>{booking.product}</td>
                <td>{booking.qty}</td>
                <td>₹{booking.amount}</td>
                <td>{booking.date}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{ background: statusColors[booking.status] }}
                  >
                    {booking.status}
                  </span>
                </td>
                <td>
                  <button className="action-link">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── ENQUIRIES TAB ────────────────────────────────────────────────────────────
const EnquiriesTab = () => {
  const [enquiries] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit@email.com",
      phone: "98765-43201",
      subject: "Bulk Order Inquiry",
      message: "Looking for 500 units of custom stickers",
      date: "2026-02-23",
      status: "New",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "98765-43202",
      subject: "Custom Design",
      message: "Can you create a logo for my business?",
      date: "2026-02-22",
      status: "Replied",
    },
    {
      id: 3,
      name: "Rohan Desai",
      email: "rohan@email.com",
      phone: "98765-43203",
      subject: "Pricing Info",
      message: "What are the wholesale rates?",
      date: "2026-02-21",
      status: "New",
    },
  ]);

  const statusColors = {
    New: "#ef4444",
    Replied: "#10b981",
    "In Progress": "#3b82f6",
  };

  return (
    <div className="admin-tab">
      <div className="tab-header">
        <h2>💬 Customer Enquiries</h2>
        <div className="header-stats">
          <div className="stat-badge">Total: {enquiries.length}</div>
          <div className="stat-badge warning">
            New: {enquiries.filter((e) => e.status === "New").length}
          </div>
        </div>
      </div>

      <div className="enquiries-list">
        {enquiries.map((enquiry) => (
          <div key={enquiry.id} className="enquiry-card">
            <div className="enquiry-header">
              <div>
                <h4>{enquiry.name}</h4>
                <p className="enquiry-meta">
                  {enquiry.email} | {enquiry.phone}
                </p>
              </div>
              <span
                className="status-badge"
                style={{ background: statusColors[enquiry.status] }}
              >
                {enquiry.status}
              </span>
            </div>
            <p className="enquiry-subject">
              <strong>Subject:</strong> {enquiry.subject}
            </p>
            <p className="enquiry-message">{enquiry.message}</p>
            <div className="enquiry-footer">
              <small>{enquiry.date}</small>
              <div className="enquiry-actions">
                <button className="action-link">Reply</button>
                <button className="action-link">Archive</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SETTINGS TAB ─────────────────────────────────────────────────────────────
const SettingsTab = () => {
  const [settings, setSettings] = useState({
    storeName: "UV Power",
    storeEmail: "info@uvpower.com",
    storePhone: "+91-9876543210",
    deliveryDays: "3-5",
    freeShippingAbove: 500,
    taxRate: 18,
    currency: "INR",
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    localStorage.setItem("uv-power-settings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div className="admin-tab">
      <div className="tab-header">
        <h2>⚙️ Settings & Configuration</h2>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h3>Store Information</h3>
          <div className="form-group">
            <label>Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange("storeName", e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Store Email</label>
            <input
              type="email"
              value={settings.storeEmail}
              onChange={(e) => handleChange("storeEmail", e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Store Phone</label>
            <input
              type="tel"
              value={settings.storePhone}
              onChange={(e) => handleChange("storePhone", e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Shipping & Tax</h3>
          <div className="form-group">
            <label>Delivery Time (Days)</label>
            <input
              type="text"
              value={settings.deliveryDays}
              onChange={(e) => handleChange("deliveryDays", e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Free Shipping Above (₹)</label>
            <input
              type="number"
              value={settings.freeShippingAbove}
              onChange={(e) =>
                handleChange("freeShippingAbove", Number(e.target.value))
              }
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Tax Rate (%)</label>
            <input
              type="number"
              value={settings.taxRate}
              onChange={(e) => handleChange("taxRate", Number(e.target.value))}
              className="form-input"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSave}
        style={{ marginTop: "2rem" }}
      >
        💾 Save Settings
      </button>
    </div>
  );
};

// ─── ANALYTICS TAB ────────────────────────────────────────────────────────────
const AnalyticsTab = () => {
  const analytics = {
    totalRevenue: 24567,
    totalOrders: 156,
    totalCustomers: 89,
    avgOrderValue: 157,
    topProducts: [
      { name: "LED Name Boards", sales: 42, revenue: 54558 },
      { name: "Bike Stickers", sales: 38, revenue: 11362 },
      { name: "Custom Keychains", sales: 31, revenue: 4619 },
      { name: "Number Plates", sales: 28, revenue: 13972 },
      { name: "Engraved Wood", sales: 17, revenue: 11883 },
    ],
    orderTrend: [
      { date: "Feb 15", orders: 12 },
      { date: "Feb 16", orders: 18 },
      { date: "Feb 17", orders: 15 },
      { date: "Feb 18", orders: 22 },
      { date: "Feb 19", orders: 19 },
      { date: "Feb 20", orders: 25 },
      { date: "Feb 23", orders: 20 },
    ],
  };

  return (
    <div className="admin-tab">
      <div className="tab-header">
        <h2>📊 Analytics & Reports</h2>
      </div>

      <div className="analytics-cards">
        <div className="analytics-card primary">
          <div className="card-icon">💰</div>
          <h4>Total Revenue</h4>
          <p className="card-value">
            ₹{analytics.totalRevenue.toLocaleString()}
          </p>
          <small>+12% from last month</small>
        </div>
        <div className="analytics-card success">
          <div className="card-icon">📦</div>
          <h4>Total Orders</h4>
          <p className="card-value">{analytics.totalOrders}</p>
          <small>+8% from last month</small>
        </div>
        <div className="analytics-card info">
          <div className="card-icon">👥</div>
          <h4>Customers</h4>
          <p className="card-value">{analytics.totalCustomers}</p>
          <small>+15% new customers</small>
        </div>
        <div className="analytics-card warning">
          <div className="card-icon">📈</div>
          <h4>Avg Order Value</h4>
          <p className="card-value">₹{analytics.avgOrderValue}</p>
          <small>Per transaction</small>
        </div>
      </div>

      <div className="analytics-section">
        <h3>📊 Top Selling Products</h3>
        <div className="product-analytics">
          {analytics.topProducts.map((product, idx) => (
            <div key={idx} className="product-stat">
              <div>
                <strong>
                  {idx + 1}. {product.name}
                </strong>
                <p>{product.sales} units sold</p>
              </div>
              <div className="stat-right">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: (product.sales / 42) * 100 + "%" }}
                  ></div>
                </div>
                <span className="revenue">
                  ₹{product.revenue.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-section">
        <h3>📈 Order Trend (Last 7 Days)</h3>
        <div className="trend-chart">
          {analytics.orderTrend.map((trend, idx) => (
            <div key={idx} className="trend-bar">
              <div
                className="bar-fill"
                style={{ height: (trend.orders / 25) * 100 + "%" }}
              ></div>
              <small>{trend.orders}</small>
              <p>{trend.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MODAL COMPONENT ─────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2 className="modal-title">{title}</h2>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  </div>
);

// ─── CONFIRM DIALOG ───────────────────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="modal-backdrop" onClick={onCancel}>
    <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
      <div className="confirm-icon">⚠️</div>
      <p className="confirm-message">{message}</p>
      <div className="confirm-actions">
        <button className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-danger" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── IMAGE UPLOAD COMPONENT ───────────────────────────────────────────────────
const ImageUpload = ({ value, onChange, label = "Product Image" }) => {
  const ref = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onChange(file);
  };

  return (
    <div className="image-upload-area">
      <label className="form-label">{label}</label>

      {value ? (
        <div className="image-preview-wrap">
          <img
            src={
              typeof value === "string"
                ? value                       // existing image URL (edit mode)
                : URL.createObjectURL(value)  // new selected file
            }
            alt="preview"
            className="image-preview"
          />
          <button
            type="button"
            className="image-remove-btn"
            onClick={() => onChange(null)}
          >
            ✕ Remove
          </button>
        </div>
      ) : (
        <div className="image-drop-zone" onClick={() => ref.current.click()}>
          <span className="drop-icon">🖼️</span>
          <span className="drop-text">Click to upload image</span>
          <span className="drop-sub">PNG, JPG, WEBP supported</span>
        </div>
      )}

      <input
        ref={ref}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </div>  
  );
};

// ─── PRODUCT FORM ─────────────────────────────────────────────────────────────
const ProductForm = ({ initial, categories, onSave, onClose }) => {
  const blank = {
    productName: "",
    price: "",
    category: categories[0]?.name || "",
    stock: "",
    status: "active",
    image: null,
    description: "",
  };
  const [form, setForm] = useState(initial || blank);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.productName.trim()) e.productName = "Name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = "Valid price required";
    if (!form.category) e.category = "Category required";
    if (form.stock === "" || isNaN(form.stock)) e.stock = "Stock required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Extract image file separately
    const imageFile = form.image;
    const formData = { ...form, price: Number(form.price), stock: Number(form.stock) };
    
    // Remove image from form data since it will be sent separately
    delete formData.image;
    
    // Pass form data and image file separately
    onSave(formData, imageFile);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Product Name *</label>
          <input
            className={`form-input ${errors.productName ? "error" : ""}`}
            value={form.productName}
            onChange={(e) => set("productName", e.target.value)}
            placeholder="e.g. Custom Bike Sticker Set"
          />
          {errors.productName && <span className="form-error">{errors.productName}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Price (₹) *</label>
          <input
            className={`form-input ${errors.price ? "error" : ""}`}
            type="number"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="299"
          />
          {errors.price && <span className="form-error">{errors.price}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select
            className={`form-input ${errors.category ? "error" : ""}`}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.categoryName || c.name}>
                {c.categoryName || c.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="form-error">{errors.category}</span>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Stock *</label>
          <input
            className={`form-input ${errors.stock ? "error" : ""}`}
            type="number"
            value={form.stock}
            onChange={(e) => set("stock", e.target.value)}
            placeholder="50"
          />
          {errors.stock && <span className="form-error">{errors.stock}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Status</label>
        <select
          className="form-input"
          value={form.status}
          onChange={(e) => set("status", e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input form-textarea"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Product description..."
          rows={3}
        />
      </div>

      <ImageUpload
        value={form.image}
        onChange={(v) => set("image", v)}
        label="Product Image"
      />

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn-primary-action">
          {initial ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
};

// ─── CATEGORY FORM ────────────────────────────────────────────────────────────
const CategoryForm = ({ initial, onSave, onClose }) => {
  const blank = { categoryName: "", icon: "🏷️", description: "", link: "", image: null };
  const [form, setForm] = useState(initial || blank);
  const [errors, setErrors] = useState({});

  const ICON_OPTIONS = [
    "🏍️",
    "🚗",
    "💡",
    "🪵",
    "🔑",
    "🏷️",
    "🎨",
    "⭐",
    "🔥",
    "✨",
    "💫",
    "🎯",
    "🛡️",
    "⚡",
    "🚀",
    "🏢",
    "🎁",
    "💎",
    "🖼️",
    "🕐",
    "🏎️",
  ];
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.categoryName.trim()) e.categoryName = "Name is required";
    if (!form.link.trim()) e.link = "Link/slug is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Extract image file separately
    const imageFile = form.image;
    const formData = { ...form };
    
    // Remove image from form data since it will be sent separately
    delete formData.image;
    
    // Pass form data and image file separately
    onSave(formData, imageFile);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Category Name *</label>
        <input
          className={`form-input ${errors.categoryName ? "error" : ""}`}
          value={form.categoryName}
          onChange={(e) => set("categoryName", e.target.value)}
          placeholder="e.g. Custom Keychains"
        />
        {errors.categoryName && <span className="form-error">{errors.categoryName}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Icon</label>
        <div className="icon-picker">
          {ICON_OPTIONS.map((icon) => (
            <button
              type="button"
              key={icon}
              className={`icon-opt ${form.icon === icon ? "selected" : ""}`}
              onClick={() => set("icon", icon)}
            >
              {icon}
            </button>
          ))}
        </div>
        <div className="selected-icon-preview">
          Selected: <span>{form.icon}</span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Link / Slug *</label>
        <input
          className={`form-input ${errors.link ? "error" : ""}`}
          value={form.link}
          onChange={(e) => set("link", e.target.value)}
          placeholder="/category-slug"
        />
        {errors.link && <span className="form-error">{errors.link}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input form-textarea"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Category description..."
          rows={2}
        />
      </div>

      <ImageUpload
        value={form.image}
        onChange={(v) => set("image", v)}
        label="Category Image"
      />

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn-primary-action">
          {initial ? "Update Category" : "Add Category"}
        </button>
      </div>
    </form>
  );
};

// ─── BULK PRICE UPDATE FORM ───────────────────────────────────────────────────
const BulkPriceUpdateForm = ({ products, onUpdate, onClose }) => {
  const [percentage, setPercentage] = useState("");
  const [operation, setOperation] = useState("increase");
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState([]);

  const calculateNewPrice = (oldPrice) => {
    const numPrice = Number(oldPrice);
    const numPercent = Number(percentage);
    if (operation === "increase") {
      return Math.round(numPrice * (1 + numPercent / 100));
    } else {
      return Math.round(numPrice * (1 - numPercent / 100));
    }
  };

  const validate = () => {
    const e = {};
    if (!percentage || isNaN(percentage) || Number(percentage) <= 0) {
      e.percentage = "Valid percentage required";
    }
    if (Number(percentage) > 100 && operation === "decrease") {
      e.percentage = "Discount cannot exceed 100%";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const updatePreview = (newPercentage, newOperation) => {
    if (!newPercentage || isNaN(newPercentage) || Number(newPercentage) <= 0) {
      setPreview([]);
      return;
    }
    const tempOp = newOperation || operation;
    const previewData = products.slice(0, 3).map((p) => ({
      name: p.productName,
      oldPrice: p.price,
      newPrice: calculateNewPrice(p.price) || p.price,
    }));
    setPreview(previewData);
  };

  const handlePercentageChange = (e) => {
    const val = e.target.value;
    setPercentage(val);
    updatePreview(val, operation);
  };

  const handleOperationChange = (e) => {
    const val = e.target.value;
    setOperation(val);
    updatePreview(percentage, val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedProducts = products.map((p) => ({
      ...p,
      price: calculateNewPrice(p.price),
    }));

    onUpdate(updatedProducts);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Operation Type</label>
        <select
          className="form-input"
          value={operation}
          onChange={handleOperationChange}
        >
          <option value="increase">Increase Price by %</option>
          <option value="decrease">Decrease Price by %</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          Percentage * {operation === "increase" ? "📈" : "📉"}
        </label>
        <div className="percentage-input-wrapper">
          <input
            type="number"
            className={`form-input ${errors.percentage ? "error" : ""}`}
            value={percentage}
            onChange={handlePercentageChange}
            placeholder="e.g., 10"
            step="0.01"
            min="0"
          />
          <span className="percentage-symbol">%</span>
        </div>
        {errors.percentage && (
          <span className="form-error">{errors.percentage}</span>
        )}
      </div>

      {preview.length > 0 && (
        <div className="price-preview-section">
          <h4 className="preview-title">Price Preview (First 3 Products)</h4>
          <div className="preview-items">
            {preview.map((item, idx) => (
              <div key={idx} className="preview-item">
                <span className="preview-name">{item.name}</span>
                <div className="preview-prices">
                  <span className="old-price">
                    ₹{item.oldPrice.toLocaleString()}
                  </span>
                  <span className="arrow-icon">→</span>
                  <span
                    className={`new-price ${operation === "increase" ? "increase-color" : "decrease-color"}`}
                  >
                    ₹{item.newPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="preview-info">
            <p>
              Status: Will update <strong>{products.length} products</strong>
            </p>
          </div>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn-primary-action">
          Update {products.length} Product{" "}
          {operation === "increase" ? "↑" : "↓"}
        </button>
      </div>
    </form>
  );
};

// ─── PRODUCTS TAB ─────────────────────────────────────────────────────────────
const ProductsTab = ({ products, setProducts, categories }) => {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [showPriceUpdate, setShowPriceUpdate] = useState(false);

  const filtered = products.filter(
    (p) =>
      (filterCat === "All" || p.category === filterCat) &&
      (p.productName.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())),
  );

  const handleSave = async (data, imageFile) => {
    try {
      if (editItem) {
        const updatedProduct = await api.updateProduct(
          editItem.id,
          data,
          imageFile,
        );

        setProducts((prev) =>
          prev.map((p) => (p.id === editItem.id ? updatedProduct : p)),
        );
      } else {
        // For creating a new product, image file is required
        if (!imageFile) {
          alert("Please select a product image");
          return;
        }
        const newProduct = await api.createProduct(data, imageFile);
        setProducts((prev) => [...prev, newProduct]);
      }

      setShowForm(false);
      setEditItem(null);
    } catch (error) {
      alert("Error saving product: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteItem(null);
    } catch (error) {
      alert("Error deleting product: " + error.message);
    }
  };

  const handleBulkPriceUpdate = async (updatedProducts) => {
    try {
      for (const product of updatedProducts) {
        await api.updateProduct(product.id, product);
      }
      setProducts(updatedProducts);
      alert(`Updated ${updatedProducts.length} products successfully!`);
      setShowPriceUpdate(false);
    } catch (error) {
      alert("Error updating prices: " + error.message);
    }
  };

  const openEdit = (p) => {
    setEditItem(p);
    setShowForm(true);
  };

  return (
    <div className="tab-section">
      <div className="tab-top-bar">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">{products.length} total products</p>
        </div>
        <div className="tab-top-buttons">
          <button
            className="btn-secondary-action"
            onClick={() => setShowPriceUpdate(true)}
            title="Bulk price update"
          >
            💰 Update Prices
          </button>
          <button
            className="btn-primary-action"
            onClick={() => {
              setEditItem(null);
              setShowForm(true);
            }}
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <input
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="cat-filter-row">
          {["All", ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${filterCat === cat ? "active" : ""}`}
              onClick={() => setFilterCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <p>No products found. Add your first product!</p>
        </div>
      ) : (
        <div className="products-admin-grid">
          {filtered.map((p) => (
            <div className="product-admin-card" key={p.id}>
              <div className="product-admin-image">
                {p.imageUrl || p.image ? (
                  <img src={p.imageUrl || p.image} alt={p.productName} />
                ) : (
                  <span className="product-placeholder-icon">📦</span>
                )}
                <span className={`product-status-badge ${p.status}`}>
                  {p.status}
                </span>
              </div>
              <div className="product-admin-info">
                <h3 className="product-admin-name">{p.productName}</h3>
                <span className="product-admin-cat">{p.category}</span>
                <div className="product-admin-meta">
                  <span className="product-admin-price">
                    ₹{p.price.toLocaleString()}
                  </span>
                  <span className="product-admin-stock">Stock: {p.stock}</span>
                </div>
                {p.description && (
                  <p className="product-admin-desc">{p.description}</p>
                )}
              </div>
              <div className="product-admin-actions">
                <button className="action-btn edit" onClick={() => openEdit(p)}>
                  ✏️ Edit
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => setDeleteItem(p)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <Modal
          title={editItem ? "Edit Product" : "Add New Product"}
          onClose={() => {
            setShowForm(false);
            setEditItem(null);
          }}
        >
          <ProductForm
            initial={editItem}
            categories={categories}
            onSave={(data, imageFile) => handleSave(data, imageFile)}
            onClose={() => {
              setShowForm(false);
              setEditItem(null);
            }}
          />
        </Modal>
      )}

      {showPriceUpdate && (
        <Modal
          title="💰 Bulk Price Update"
          onClose={() => setShowPriceUpdate(false)}
        >
          <BulkPriceUpdateForm
            products={products}
            onUpdate={handleBulkPriceUpdate}
            onClose={() => setShowPriceUpdate(false)}
          />
        </Modal>
      )}

      {deleteItem && (
        <ConfirmDialog
          message={`Delete "${deleteItem.productName}"? This action cannot be undone.`}
          onConfirm={() => handleDelete(deleteItem.id)}
          onCancel={() => setDeleteItem(null)}
        />
      )}
    </div>
  );
};

// ─── CATEGORIES TAB ───────────────────────────────────────────────────────────
const CategoriesTab = ({ categories, setCategories, products }) => {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleSave = async (data, imageFile) => {
    try {
      if (editItem) {
        const updatedCategory = await api.updateCategory(
          editItem.id,
          data,
          imageFile,
        );
        setCategories((prev) =>
          prev.map((c) =>
            c.id === editItem.id
              ? {
                  ...updatedCategory,
                  productCount: editItem.productCount,
                }
              : c,
          ),
        );
      } else {
        // For creating a new category, image file is required
        if (!imageFile) {
          alert("Please select a category image");
          return;
        }
        const newCat = await api.createCategory(data, imageFile);
        setCategories((prev) => [...prev, { ...newCat, productCount: 0 }]);
      }
      setShowForm(false);
      setEditItem(null);
    } catch (error) {
      alert("Error saving category: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setDeleteItem(null);
    } catch (error) {
      alert("Error deleting category: " + error.message);
    }
  };

  const getProductCount = (catName) =>
    products.filter((p) => p.category === catName).length;

  return (
    <div className="tab-section">
      <div className="tab-top-bar">
        <div>
          <h1 className="page-title">Categories</h1>
          <p className="page-subtitle">{categories.length} total categories</p>
        </div>
        <button
          className="btn-primary-action"
          onClick={() => {
            setEditItem(null);
            setShowForm(true);
          }}
        >
          + Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🏷️</span>
          <p>No categories yet. Add your first category!</p>
        </div>
      ) : (
        <div className="categories-admin-grid">
          {categories.map((cat) => (
            <div className="category-admin-card" key={cat.id}>
              <div className="category-admin-image">
                {cat.imageUrl || cat.image ? (
                  <img src={cat.imageUrl || cat.image} alt={cat.categoryName} />
                ) : (
                  <div className="category-admin-icon">{cat.icon}</div>
                )}
              </div>
              <div className="category-admin-info">
                <h3 className="category-admin-name">{cat.categoryName}</h3>
                {cat.description && (
                  <p className="category-admin-desc">{cat.description}</p>
                )}
                <div className="category-admin-meta">
                  <span className="cat-link-badge">{cat.link}</span>
                  <span className="cat-product-count">
                    {getProductCount(cat.categoryName)} products
                  </span>
                </div>
              </div>
              <div className="category-admin-actions">
                <button
                  className="action-btn edit"
                  onClick={() => {
                    setEditItem(cat);
                    setShowForm(true);
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => setDeleteItem(cat)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <Modal
          title={editItem ? "Edit Category" : "Add New Category"}
          onClose={() => {
            setShowForm(false);
            setEditItem(null);
          }}
        >
          <CategoryForm
            initial={editItem}
            onSave={handleSave}
            onClose={() => {
              setShowForm(false);
              setEditItem(null);
            }}
          />
        </Modal>
      )}

      {deleteItem && (
        <ConfirmDialog
          message={`Delete category "${deleteItem.categoryName}"? Products in this category won't be deleted.`}
          onConfirm={() => handleDelete(deleteItem.id)}
          onCancel={() => setDeleteItem(null)}
        />
      )}
    </div>
  );
};

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
const OverviewTab = ({ products, categories, setActiveTab }) => {
  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
  const activeProducts = products.filter((p) => p.status === "active").length;

  return (
    <div className="overview-content">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card revenue-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <p className="stat-value">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="stat-card orders-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <p className="stat-label">Total Orders</p>
            <p className="stat-value">1</p>
          </div>
        </div>
        <div
          className="stat-card products-card"
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("products")}
        >
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <p className="stat-label">Total Products</p>
            <p className="stat-value">{products.length}</p>
          </div>
        </div>
        <div
          className="stat-card customers-card"
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("categories")}
        >
          <div className="stat-icon">🏷️</div>
          <div className="stat-content">
            <p className="stat-label">Categories</p>
            <p className="stat-value">{categories.length}</p>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        <div className="stats-section">
          <div className="recent-orders-section">
            <div className="section-header">
              <h2 className="section-title">Recent Products</h2>
              <button
                className="view-all-link"
                onClick={() => setActiveTab("products")}
              >
                View All →
              </button>
            </div>
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id}>
                      <td>{p.productName}</td>
                      <td>{p.category}</td>
                      <td>₹{p.price.toLocaleString()}</td>
                      <td>{p.stock}</td>
                      <td>
                        <span className={`status-badge ${p.status}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        style={{ textAlign: "center", color: "#9ca3af" }}
                      >
                        No products yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-list">
            <button
              className="action-item"
              onClick={() => setActiveTab("products")}
            >
              <span className="action-icon">📦</span>
              <span className="action-text">Add New Product</span>
              <span className="action-arrow">→</span>
            </button>
            <button
              className="action-item"
              onClick={() => setActiveTab("categories")}
            >
              <span className="action-icon">🏷️</span>
              <span className="action-text">Manage Categories</span>
              <span className="action-arrow">→</span>
            </button>
            <button
              className="action-item"
              onClick={() => setActiveTab("bookings")}
            >
              <span className="action-icon">📅</span>
              <span className="action-text">View Bookings</span>
              <span className="action-arrow">→</span>
            </button>
          </div>

          <div className="mini-stats">
            <h3
              className="section-title"
              style={{ marginTop: "1.5rem", fontSize: "0.95rem" }}
            >
              Category Breakdown
            </h3>
            {categories.slice(0, 4).map((cat) => (
              <div className="mini-stat-row" key={cat.id}>
                <span className="mini-cat-icon">{cat.icon}</span>
                <span className="mini-cat-name">{cat.categoryName}</span>
                <span className="mini-cat-count">
                  {products.filter((p) => p.category === cat.categoryName).length}{" "}
                  products
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { logout, adminData } = useContext(AdminContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem("uv-power-offers");
    return saved ? JSON.parse(saved) : [];
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from Spring Boot backend on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          api.fetchAllProducts(),
          api.fetchAllCategories(),
        ]);
        setProducts(productsData || []);
        setCategories(categoriesData || []);
        setError(null);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data from server");
        // Fall back to initial data if API fails
        setProducts(INITIAL_PRODUCTS);
        setCategories(INITIAL_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };
  const getAdminInitial = () =>
    adminData?.name?.charAt(0)?.toUpperCase() || "A";

  const NAV_ITEMS = [
    { id: "overview", icon: "⊞", label: "Dashboard" },
    { id: "products", icon: "📦", label: "Products", badge: products.length },
    {
      id: "categories",
      icon: "🏷️",
      label: "Categories",
      badge: categories.length,
    },
    { id: "offers", icon: "🎉", label: "Offers", badge: offers.length },
    { id: "bookings", icon: "📅", label: "Bookings" },
    { id: "enquiries", icon: "💬", label: "Enquiries" },
    { id: "pricing", icon: "🏠", label: "Settings" },
    { id: "revenue", icon: "💹", label: "Analytics" },
  ];

  const TAB_LABELS = {
    overview: "Dashboard",
    products: "Products",
    categories: "Categories",
    offers: "Offers",
    bookings: "Bookings",
    enquiries: "Enquiries",
    pricing: "Settings",
    revenue: "Analytics",
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">UV Admin</h2>
          <p className="sidebar-email">{adminData?.email}</p>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
              {item.badge !== undefined && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          <span className="nav-text">Logout</span>
        </button>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className={`admin-main ${sidebarOpen ? "" : "sidebar-closed"}`}>
        <div className="admin-topbar">
          <div className="topbar-left">
            <button
              className="toggle-sidebar"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <div className="breadcrumb">
              <span className="breadcrumb-item">Admin</span>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-item active">
                {TAB_LABELS[activeTab]}
              </span>
            </div>
          </div>
          <div className="topbar-right">
            <span className="admin-label">Admin</span>
            <div className="admin-avatar">{getAdminInitial()}</div>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === "overview" && (
            <OverviewTab
              products={products}
              categories={categories}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "products" && (
            <ProductsTab
              products={products}
              setProducts={setProducts}
              categories={categories}
            />
          )}
          {activeTab === "categories" && (
            <CategoriesTab
              categories={categories}
              setCategories={setCategories}
              products={products}
            />
          )}
          {activeTab === "offers" && (
            <OffersTab offers={offers} setOffers={setOffers} />
          )}
          {activeTab === "bookings" && <BookingsTab />}
          {activeTab === "enquiries" && <EnquiriesTab />}
          {activeTab === "pricing" && <SettingsTab />}
          {activeTab === "revenue" && <AnalyticsTab />}
          {activeTab !== "overview" &&
            activeTab !== "products" &&
            activeTab !== "categories" &&
            activeTab !== "offers" &&
            activeTab !== "bookings" &&
            activeTab !== "enquiries" &&
            activeTab !== "pricing" &&
            activeTab !== "revenue" && (
              <div className="placeholder-content">
                <div className="placeholder-icon">🚧</div>
                <h1>Coming Soon</h1>
                <p>
                  This section is under development. Navigate back to Dashboard.
                </p>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

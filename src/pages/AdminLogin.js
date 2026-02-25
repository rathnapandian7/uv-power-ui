import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple authentication (in production, use real backend authentication)
    if (email === "admin@uvpower.com" && password === "admin123") {
      const adminData = {
        email,
        name: "Admin User",
        loginTime: new Date().toLocaleString(),
      };
      login(adminData);
      navigate("/admin-dashboard");
    } else {
      setError("Invalid email or password. Use admin@uvpower.com / admin123");
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-section">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Admin Login</h1>
            <p className="login-subtitle">UV Power Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="admin@uvpower.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to Admin Panel"}
            </button>
          </form>

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <p className="demo-text">Email: <strong>admin@uvpower.com</strong></p>
            <p className="demo-text">Password: <strong>admin123</strong></p>
          </div>
        </div>

        <div className="login-features">
          <h2>Admin Features</h2>
          <ul className="features-list">
            <li>✓ Product Management (Add/Edit/Delete)</li>
            <li>✓ Dynamic Price Control</li>
            <li>✓ Image Upload & Management</li>
            <li>✓ Booking Management</li>
            <li>✓ Customer Enquiries</li>
            <li>✓ Revenue Dashboard</li>
            <li>✓ Orders Overview</li>
            <li>✓ Sales Analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

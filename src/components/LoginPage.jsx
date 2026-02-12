import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage({ type: "", text: "" });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!validateEmail(form.email)) newErrors.email = "Invalid email address";

    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post(
        "https://events.deepanwita.fun/account/login/",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      const access_token = res.data.access || res.data.access_token;
      const refresh_token = res.data.refresh || res.data.refresh_token;
      const userInfo = res.data.user || { email: form.email, role: "user" };

      if (!userInfo.role) userInfo.role = "user";

      if (access_token) {
        login(userInfo, access_token, refresh_token);
        setMessage({ type: "success", text: "Login successful! Redirecting..." });
        setTimeout(() => navigate("/events"), 1500);
      } else {
        setMessage({ type: "error", text: "Token not received from server" });
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setMessage({ type: "error", text: "Invalid credentials or server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      {/* Logo */}
      <div className="text-center mb-4">
        <img
          src="/image/logo.png"
          alt="Events Logo"
          style={{ width: "120px", height: "120px", objectFit: "contain" }}
        />
      </div>

      {/* Heading */}
      <h2 className="text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        {/* Submit */}
        <button
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Message below button */}
        {message.text && (
          <div
            className={`alert mt-3 ${message.type === "success" ? "alert-success" : "alert-danger"}`}
            role="alert"
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;

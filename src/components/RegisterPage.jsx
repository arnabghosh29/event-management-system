import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    role: "user",
    password: "",
    password_confirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (username) => /^[a-zA-Z0-9_]{3,}$/.test(username);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required.";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email address.";

    if (!formData.username) newErrors.username = "Username is required.";
    else if (!validateUsername(formData.username))
      newErrors.username =
        "Username must be at least 3 characters and contain only letters, numbers or underscores.";

    if (!formData.first_name) newErrors.first_name = "First name is required.";
    if (!formData.last_name) newErrors.last_name = "Last name is required.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (!validatePassword(formData.password))
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number & special character.";

    if (!formData.password_confirm)
      newErrors.password_confirm = "Confirm password is required.";
    else if (formData.password !== formData.password_confirm)
      newErrors.password_confirm = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      await axios.post(
        "https://events.deepanwita.fun/account/register/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("Registration successful! Redirecting to login page...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration failed:", err);
      setMessage(
        err.response?.data
          ? JSON.stringify(err.response.data, null, 2)
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "450px" }}>
      {/* Logo */}
      <div className="text-center mb-4">
        <img
          src="/image/logo.png"
          alt="Events Logo"
          style={{ width: "120px", height: "120px", objectFit: "contain" }}
        />
      </div>

      {/* Heading */}
      <h2 className="text-center mb-4">Create an Account</h2>

      <form onSubmit={handleSubmit}>
        {["email", "username", "first_name", "last_name"].map((field) => (
          <div key={field} className="mb-3">
            <label className="form-label text-capitalize">
              {field.replace("_", " ")}:
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`form-control ${errors[field] ? "is-invalid" : ""}`}
            />
            {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password:</label>
          <input
            type="password"
            name="password_confirm"
            value={formData.password_confirm}
            onChange={handleChange}
            className={`form-control ${errors.password_confirm ? "is-invalid" : ""}`}
          />
          {errors.password_confirm && (
            <div className="invalid-feedback">{errors.password_confirm}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p
            className={`mt-3 ${message.includes("successful") ? "text-success" : "text-danger"}`}
          >
            {message}
          </p>
        )}
      </form>

      {/* Login Link */}
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-primary text-decoration-none">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

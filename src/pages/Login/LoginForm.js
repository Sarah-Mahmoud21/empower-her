import React, { useState } from "react";
import "../Login/loginForm.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Add state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign as member");
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      if (data.isManager) {
        setSuccessMessage("Manager login successful");
      } else {
        setSuccessMessage("Login successful");
      }
      setError(""); 
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      const isManagerParam = data.isManager ? 'true' : 'false';
      navigate(data.isManager ? '/manager' : `/profile/${isManagerParam}`);
          } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Login</h1>
            <h3>Login with your data that you entered during registration</h3>
          </div>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}{" "}
          {/* Render success message */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <br />
          Don't Have An Account?
          <Link to="/register"> Register</Link>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default LoginForm;

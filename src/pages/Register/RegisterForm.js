import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../Login/loginForm.css";
import  Header from "../Header/Header";
import  Footer from "../Footer/Footer";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
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
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Registration successful
      setSuccessMessage("User registered successfully"); // Update success message state
      setError(""); // Clear any previous error messages
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      });

      
     
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <Header/>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <p className="header">Sign up</p>
        </div>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>} {/* Render success message */}

        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit">Submit</button><br/>
        already have an account?
        <Link to="/login">Login</Link>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default RegisterForm;

import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import "../pages/Membership/membership.css";// Import SCSS file


function Support() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    amount: "",
    onTime: false,
    monthly: false,
    quarterly: false,
    annually: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData); // You can do something with the form data, like sending it to an API
  };

  return (
    <>
      <Header />
      <div className="main">
        <div className="overview">
          <h1>Donate</h1>
          <p>
            Women and female youth are amongst the most vulnerable and
            marginalized groups in any society; they do not benefit from the
            market economy and opportunities on an equal footing with men to
            achieve their full potential in the economy and civic life. We
            believe that empowering women economically will enable them to
            flourish on many levels and become active citizens in their
            communities. Thus, EmpowerHer has positioned itself as a leading
            advocate of social and economic rights on behalf of women’s
            entrepreneurs in Palestine. <br />
            Your donation will help us to make a difference in women’s lives and
            continue our journey in supporting Palestinian women to thrive in an
            economically and socially challenging environment.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name </label>
            <br />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <br />
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailAddress">Email Address</label>
            <br />
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <br />
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          {/* Donation Frequency */}
          <div className="checkboxes">
            <br />
            <label>
              <input
                type="checkbox"
                name="onTime"
                checked={formData.onTime}
                onChange={handleChange}
              />{" "}
              On Time
            </label>
            <label>
              <input
                type="checkbox"
                name="monthly"
                checked={formData.monthly}
                onChange={handleChange}
              />{" "}
              Monthly
            </label>
            <label>
              <input
                type="checkbox"
                name="quarterly"
                checked={formData.quarterly}
                onChange={handleChange}
              />{" "}
              Quarterly
            </label>
            <label>
              <input
                type="checkbox"
                name="annually"
                checked={formData.annually}
                onChange={handleChange}
              />{" "}
              Annually 
            </label>
          </div>
          <button type="submit">Donate</button>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default Support;

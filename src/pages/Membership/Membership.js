import React, { useState,useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../Membership/membership.css"; // Import SCSS file
import axios from "axios";
import { getToken } from "../tokenUtils";

function Membership() {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Add state for success message
  const token = getToken();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    mobileNumber: "",
    emailAddress: "",
    education: "",
    age: "",
    socialMediaLink: "",
    projectSector: "",
    projectLocation: "",
    projectSummary: "",
    projectPictures: [],
  });

  useEffect(() => {
    if (!token) {
      setFormData({
        fullName: "",
        address: "",
        mobileNumber: "",
        emailAddress: "",
        education: "",
        age: "",
        socialMediaLink: "",
        projectSector: "",
        projectLocation: "",
        projectSummary: "",
        projectPictures: [],
      });
    }

    // Fetch user data when component mounts
    axios.get('http://localhost:4000/profile', {
      headers: {
        Authorization: `Bearer ${token}` // Include token in Authorization header
      }
    })
    .then(response => {
      const user = response.data.user;
      setFormData({
        fullName: user.firstName + user.lastName,
        address: "",
        mobileNumber: "",
        emailAddress: user.email,
        education: "",
        age: "",
        socialMediaLink: "",
        projectSector: "",
        projectLocation: "",
        projectSummary: "",
        projectPictures: [],
      });
    })

    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [token]); // Run effect whenever token changes

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePictureUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log("Uploaded files:", files); // Log uploaded files to check if they're received properly

    const uploadedPictures = files.map((file) => file);
    console.log("Uploaded pictures:", uploadedPictures); // Log uploaded picture URLs to check if they're created properly

    setFormData({
      ...formData,
      projectPictures: formData.projectPictures.concat(uploadedPictures),
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    let formedData = new FormData();

    for (let [key, value] of Object.entries(formData)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formedData.append(key, item);
        });
      } else {
        formedData.append(key, value);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/membership",
        formedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      // const response = await fetch("http://localhost:4000/membership", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": `multipart/form-data`,
      //   },
      //   body: formedData,
      // });

      if (!response.data.success) {
        throw new Error("Failed to sign as member");
      }

      // const data = await response.json();
      // const token = data.token;
      // localStorage.setItem("token", token);
      setSuccessMessage("membership request sent successfully"); // Update success message state
      setError(""); // Clear any previous error messages
      setFormData({
        fullName: "",
        address: "",
        mobileNumber: "",
        emailAddress: "",
        education: "",
        age: "",
        socialMediaLink: "",
        projectSector: "",
        projectLocation: "",
        projectSummary: "",
        projectPictures: [],
      });
    } 
    catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="main">
        <div className="overview">
          <h1>Membership Application</h1>
          <p>
            The Palestinian Businesswomen’s Association. Join us to have the
            opportunity to participate the exhibitions, workshops and trainings
            which it implements in various fields of access to market, capacity
            building, and advocacy, so that the member can choose the
            appropriate membership category according to her business size. We
            are looking forward to increasing the number of our members to
            achieve our mission to empower the Palestinian women economically.
            In order to take advantage of the special services that will help
            you to succeed, join us by filling the membership application.
          </p>
        </div>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          {/* Personal Information */}
          <h2>Personal Information</h2>
          <div className="personal-info">
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
              <label htmlFor="address">Address</label>
              <br />
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
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
              <label htmlFor="education">
                Education Level and Specialization
              </label>
              <br />
              <input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <br />
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="socialMediaLink">Website/Facebook Link</label>
              <br />
              <input
                type="text"
                id="socialMediaLink"
                name="socialMediaLink"
                value={formData.socialMediaLink}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Project Information */}
          <h2>Project Information</h2>
          <div className="project-info">
            <div className="form-group">
              <label htmlFor="projectSector">Project Sector</label>
              <br />
              <select
                id="projectSector"
                name="projectSector"
                value={formData.projectSector}
                onChange={handleChange}
              >
                <option value="">Select Sector</option>
                <option value="commercial">Commercial</option>
                <option value="agriculture">Agriculture</option>
                <option value="service">Service</option>
                <option value="products">Products</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Location">Project Location</label>
              <br />
              <input
                type="text"
                id="projectLocation"
                name="projectLocation"
                value={formData.projectLocation}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectSummary">Project Summary</label>
              <br />
              <textarea
                id="projectSummary"
                name="projectSummary"
                value={formData.projectSummary}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="projectPictures">Project Pictures </label> <br />
              <input
                type="file"
                id="projectPictures"
                name="projectPictures"
                accept="image/*"
                multiple
                onChange={handlePictureUpload}
              />
            </div>
            <div className="uploaded-pictures">
              {formData.projectPictures &&
                formData.projectPictures.map((picture, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(picture)}
                    alt={`Uploaded Picture ${index}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      marginRight: "10px",
                    }}
                  />
                ))}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Membership;

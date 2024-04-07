import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../Membership/membership.css" ;// Import SCSS file


function Membership() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    fullAddress: "",
    mobileNumber: "",
    emailAddress: "",
    education: "",
    age: "",
    socialMediaLink: "",
    projectName: "",
    projectType: "",
    projectSize: "",
    projectSector: "",
    yearOfFoundation: "",
    fundingSource: "",
    projectCost: "",
    projectLocation: "",
    numberOfWorkers: "",
    projectSummary: "",
    projectPictures: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlePictureUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadedPictures = files.map((file) => URL.createObjectURL(file));

    setFormData({
      ...formData,
      projectPictures: formData.projectPictures.concat(uploadedPictures),
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData); // You can do something with the form data, like sending it to an API
  };

  return (
    <>
    <Header/>
    <div className="main">  
      <div className="overview">
        <h1>Membership Application</h1>
        <p>
          The Palestinian Businesswomen’s Association. Join us to have the
          opportunity to participate the exhibitions, workshops and trainings
          which it implements in various fields of access to market, capacity
          building, and advocacy, so that the member can choose the appropriate
          membership category according to her business size. We are looking
          forward to increasing the number of our members to achieve our mission
          to empower the Palestinian women economically. In order to take
          advantage of the special services that will help you to succeed, join
          us by filling the membership application.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <h2>Personal Information</h2>
        <div className="personal-info">
          <div className="form-group">
            <label htmlFor="fullName">Full Name </label><br/>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label><br/>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fullAddress">Full Address</label><br/>
            <input
              type="text"
              id="fullAddress"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label><br/>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailAddress">Email Address</label><br/>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="education">Education Level and Specialization</label><br/>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label><br/>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="socialMediaLink">Website/Facebook Link</label><br/>
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
            <label htmlFor="projectSector">Project Sector</label><br/>
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
            <label htmlFor="Location">Project Location</label><br/>
            <input
              type="text"
              id="projectLocation"
              name="projectLocation"
              value={formData.projectLocation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectSummary">Project Summary</label><br/>
            <textarea
              id="projectSummary"
              name="projectSummary"
              value={formData.projectSummary}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
              <label htmlFor="projectPictures">Project Pictures </label> <br/>
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
              {formData.projectPictures.map((picture, index) => (
                <img
                  key={index}
                  src={picture}
                  alt={`Uploaded Picture ${index}`}
                  style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "10px" }}
                />
              ))}
            </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default Membership;

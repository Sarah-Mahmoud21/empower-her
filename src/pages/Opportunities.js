import React, { useState,useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "../pages/Membership/membership.css";// Import SCSS file
import axios from "axios";
import { getToken } from "./tokenUtils";

function Opportunities() {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = getToken();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    mobileNumber: "",
    emailAddress: "",
    cv: [],
  });
  useEffect(() => {
    if (!token) {
      setFormData({
        fullName: "",
        address: "",
        mobileNumber: "",
        emailAddress: "",
       cv:[]
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
        cv:[],
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

  const handleCvUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log("Uploaded files:", files); // Log uploaded files to check if they're received properly

    const uploadedCv = files.map((file) => file);
    console.log("Uploaded cv:", uploadedCv); // Log uploaded picture URLs to check if they're created properly

    setFormData({
      ...formData,
      cv: uploadedCv,
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
        "http://localhost:4000/opportunities",
        formedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (!response.data.success) {
        throw new Error("Failed to sign as intern");
      }

      setSuccessMessage("internship request sent successfully"); // Update success message state
      setError(""); // Clear any previous error messages
      setFormData({
        fullName: "",
        address: "",
        mobileNumber: "",
        emailAddress: "",
        cv:[]
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
          <h1>Volunteer / Internship Opportunities</h1>
          <p>
            EmpowerHer is a Palestinian non-governmental organization that
            empowers women who have limited resources to realize their economic
            and social rights by using a holistic approach to development in
            accordance with their needs. It envisions an entrepreneurial
            Palestinian woman who is capable and influential in a democratic
            society that adheres to social justice. This will help us as a
            community to flourish and create a better tomorrow for the
            generations to come. It provides the opportunity for all young women
            and men to take part in realizing a better tomorrow for our
            community through voluntary work. Volunteering can help you gain
            confidence by giving you the chance to try something new and build a
            real sense of achievement. Voluntary work also helps individuals to
            be the difference makers in their local community, as well as
            cultivate and increase their skills. It also helps the youth in
            comprehending the reality of our society. Lend us a hand in creating
            a better tomorrow for women all over Palestine by registering as a
            volunteer.
          </p>
        </div>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
            <label className="file-label" htmlFor="cv">Upload cv</label>
            <br />
            <input
              type="file"
              id="cv"
              name="cv"
              accept=".pdf,.doc,.docx"
              multiple 
              onChange={handleCvUpload}
            />
          </div>
            <button type="submit">Submit</button>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default Opportunities;

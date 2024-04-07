import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "../pages/Membership/membership.css";// Import SCSS file

function Opportunities() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    fullAddress: "",
    mobileNumber: "",
    emailAddress: "",
    cv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        <form onSubmit={handleSubmit}>
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
              <label htmlFor="fullAddress">Full Address</label>
              <br />
              <input
                type="text"
                id="fullAddress"
                name="fullAddress"
                value={formData.fullAddress}
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
              onChange={handleChange}
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

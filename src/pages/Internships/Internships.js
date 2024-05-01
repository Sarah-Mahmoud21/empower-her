import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagerHeader from "../Header/ManagerHeader";
import "react-image-gallery/styles/css/image-gallery.css";
import "../ManagerMembership/ManagerMembership.css";

function Internships() {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/oppourtunities")
      .then((response) => {
        setInterns(response.data.interns);
      })
      .catch((error) => {
        console.error("Error fetching interns data:", error);
      });
  }, []);
  
  const approve =(memberId) => {

  };
  const reject = (memberId) => {
   
};
    return (
      <>
        <ManagerHeader />
        <div>
          <h1>Internships Applicants</h1>
          {interns.map((intern) => (
            <div  className="int-info" key={intern._id}>
              <div className="buttons">
              <button onClick={() => approve(intern._id)}>Approve</button>
              <button onClick={() => reject(intern._id)}>Reject</button>
              </div>
              <p><strong>Name:</strong> {intern.fullName}</p>
              <p><strong>Email:</strong> {intern.emailAddress}{intern.email}</p>
              <p><strong>Address:</strong> {intern.address}</p>
              <p><strong>Mobile Number:</strong> {intern.mobileNumber}</p>
              
            </div>
          ))}
        </div>

    </>
  );
}

export default Internships;

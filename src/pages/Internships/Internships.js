import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagerHeader from "../Header/ManagerHeader";

function Internships() {
  const [opportunities, setOpportunities] = useState([]);
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    // Fetch opportunities when the component mounts
    axios.get("http://localhost:4000/opportunities")
      .then(response => {
        setOpportunities(response.data.opportunities);
      })
      .catch(error => {
        console.error("Error fetching opportunities:", error);
        // Optionally: Set state to indicate error for user feedback
      });
  }, []);

  const approve = (opportunityId) => {
    axios.post(`http://localhost:4000/internships/${opportunityId}`)
      .then((response) => {
        setOpportunities((prevOpportunities) =>
          prevOpportunities.filter((opportunity) => opportunity._id !== opportunityId)
        );
        setInternships((prevInternships) => [...prevInternships, response.data.internship]);
      })
      .catch((error) => {
        console.error("Error approving internship opportunity:", error);
        // Optionally: Set state to indicate error for user feedback
      });
  };

  const reject = (opportunityId) => {
    axios
      .delete(`http://localhost:4000/opportunities/${opportunityId}`)
      .then((response) => {
        setOpportunities((prevOpportunities) =>
          prevOpportunities.filter((opportunity) => opportunity._id !== opportunityId)
        );
      })
      .catch((error) => {
        console.error("Error rejecting internship opportunity:", error);
        // Optionally: Set state to indicate error for user feedback
      });
  };

  return (
    <>
      <ManagerHeader/>
      <div>
        <h1> Internship Applicants</h1>
        {opportunities.length === 0 ? (
          <h2>All applications have been reviewed</h2>
        ) : (
          opportunities.map((opportunity) => (
            <div className="mem-info" key={opportunity._id}>
              <div className="buttons">
                <button onClick={() => approve(opportunity._id)}>Approve</button>
                <button onClick={() => reject(opportunity._id)}>Reject</button>
              </div>
              <p> <strong>Full Name:</strong> {opportunity.fullName}</p>
              <p><strong>Address: </strong> {opportunity.address}</p>
              <p> <strong>Mobile Number: </strong> {opportunity.mobileNumber}</p>
              <p><strong>Email Address: </strong> {opportunity.emailAddress}</p>
              {/* Render download links for cv files */}
              {opportunity.cv.map((cv, cvIndex) => (
                <div key={cvIndex}>
                  <p><strong>CV :</strong> <a target="_blank" href={`http://localhost:4000/${cv}`} download>View Resume</a></p>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Internships;

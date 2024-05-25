import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagerHeader from "../Header/ManagerHeader";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import "../ManagerMembership/ManagerMembership.css";

function ManagerMembership() {
  const [members, setMembers] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/membership")
      .then((response) => {
        setMembers(response.data.members);
      })
      .catch((error) => {
        console.error("Error fetching membership data:", error);
      });
  }, []);

  const images = members.flatMap((member) =>
    member.projectPictures.map((picture) => ({
      original: picture,
      thumbnail: picture,
    }))
  );

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseSlider = () => {
    setSelectedImageIndex(null);
  };

  const approve = (memberId) => {
    axios.post(`http://localhost:4000/members/${memberId}`)
      .then((response) => {
        // Remove the approved member from the members state
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member._id !== memberId)
        );
      })
      .catch((error) => {
        console.error("Error approving membership:", error);
      });
  };
  
  const reject = (memberId) => {
    axios
    .delete(`http://localhost:4000/membership/${memberId}`)
    .then((response) => {
      // Remove the rejected member from the local state
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== memberId)
      );
    })
    .catch((error) => {
      console.error("Error rejecting member:", error);
    });
  };

  return (
    <>
      <ManagerHeader />
      <div>
        <h1>Membership Applicants</h1>
      
        {members.length === 0 ? (
          <h2>All applications have been reviewed</h2>        ) : (
          members.map((member, memberIndex) => (
            <div  className="mem-info" key={member._id}>
              <div className="buttons">
                <button onClick={() => approve(member._id)}>Approve</button>
                <button onClick={() => reject(member._id)}>Reject</button>
              </div>
              <p><strong>Name:</strong> {member.fullName}</p>
              <p><strong>Email:</strong> {member.emailAddress}{member.email}</p>
              <p><strong>Address:</strong> {member.address}</p>
              <p><strong>Mobile Number:</strong> {member.mobileNumber}</p>
              <p><strong>Education:</strong> {member.education}</p>
              <p><strong>Age:</strong> {member.age}</p>
              <p><strong>Social Media Link:</strong><a href={member.socialMediaLink}>{member.socialMediaLink}</a></p>
              <p><strong>Project Sector:</strong> {member.projectSector}</p>
              <p><strong>Project Location:</strong> {member.projectLocation}</p>
              <p><strong>Project Summary:</strong> {member.projectSummary}</p>
              <div>
                {member.projectPictures.map((picture, index) => (
                  <img
                    key={index}
                    src={picture}
                    alt={`Picture ${index}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      margin: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageClick(index+2)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      {selectedImageIndex !== null && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ maxWidth: "80%", position: "relative", zIndex: 1001 }}>
            <button style={{ position: "absolute", top: 0, right: 0, cursor: "pointer", color: "#fff", fontSize: "40px", padding: "5px", zIndex: 1002 }} onClick={handleCloseSlider} >&times;</button>
            <ImageGallery
              items={images}
              startIndex={selectedImageIndex}
              showThumbnails={false}
              showFullscreenButton={false}
              showPlayButton={false}
              showBullets={false}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ManagerMembership;

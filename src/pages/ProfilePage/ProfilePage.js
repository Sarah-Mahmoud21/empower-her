// ProfilePage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../tokenUtils";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../ProfilePage/ProfilePage.css";
import { Link } from "react-router-dom";
import ManagerHeader from "../Header/ManagerHeader";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null); // State to store the new photo
  const token = getToken();
  const { isManager } = useParams();
  const isManagerBool = isManager === "true";
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false); // State to track if the user is changing password
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const [email, setEmail] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [isMember, setIsMember] = useState(false);

  const handleChangePassword = () => {
    // Validation checks
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordChangeError("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordChangeError("New password and confirm password must match");
      return;
    }

    // Send request to change password
    axios
      .post(
        "http://localhost:4000/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setPasswordChangeMessage(response.data.message);

        setPasswordChangeError("");
        // Clear input fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        setPasswordChangeError("Failed to change password. Please try again.");
        console.error("Error changing password:", error);
      });
  };

  useEffect(() => {
    if (!token) {
      console.error("Token not found");
      return;
    }

    // Fetch user data when component mounts
    axios
      .get("http://localhost:4000/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      })
      .then((response) => {
        setUser(response.data.user); // Set user data in component state
        setEmail(response.data.user.email); // Access email property after user state is updated
      })

      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token]); // Run effect whenever token changes

  const handleLogout = () => {
    // Perform logout actions (clear token, etc.)
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchMemberId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/members/${email}`
        );
        setMemberId(response.data.memberId);
        setIsMember(true);
      } catch (error) {
        console.error("Error fetching member ID:", error);
      }
    };

    fetchMemberId();
  }, [email]); // Execute the effect when the email state changes

  const handlePhotoUpload = () => {
    if (!newPhoto) {
      console.error("No photo selected");
      return;
    }

    const formData = new FormData();
    formData.append("photo", newPhoto);

    // Send photo to the server
    axios
      .post("http://localhost:4000/upload-photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // If upload is successful, update the user's profile with the new photo URL
        setUser((prevUser) => ({
          ...prevUser,
          img: response.data.photoUrl, // Assuming the server returns the URL of the uploaded photo
        }));
      })
      .catch((error) => {
        console.error("Error uploading photo:", error);
      });
  };

  const handleFileChange = (event) => {
    // Update state with the selected file
    setNewPhoto(event.target.files[0]);
  };
  const togglePasswordForm = () => {
    setIsChangingPassword((prevState) => !prevState);
  };

  const openForm = () => {
    return (
      <div className="change-pass">
        <label htmlFor="currentPassword">Current Password</label>
        <br />
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <br />
        <label htmlFor="newPassword">New Password</label>
        <br />
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br />
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <br />
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        {passwordChangeError && <p className="error">{passwordChangeError}</p>}
        <button onClick={handleChangePassword}>Change password</button>
      </div>
    );
  };

  return (
    <>
      {isManagerBool ? <ManagerHeader /> : <Header />}
      <div>
        {user ? (
          <div className="profile-page">
            <div className="profile-links">
              <div className="pic">
                <img
                  src={
                    user.profilePicture
                      ? `http://localhost:4000/${user.profilePicture}`
                      : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  }
                  alt="Profile Picture"
                />
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
              </div>
              {isManagerBool ? (
                <> </>
              ) : (
                <>
                  {isMember ? (
                    <Link to={`././AddProduct/${memberId}`}>Add to Store</Link>
                  ) : (
                    <Link>My orders</Link>
                  )}

                  <br />
                </>
              )}
              <Link>wishlist</Link>
              <br />
              {isMember ? (
                <>
                  {" "}
                  <Link to={`/notification/${memberId}/${isMember}`}>
                    Tasks{" "}
                  </Link>
                  <br />
                </>
              ) : (
                <>
                  {" "}
                  <Link to={`/notification/${user._id}/${isMember}`}>
                    Notifications
                  </Link>
                  <br />
                </>
              )}
              <hr />
              <br />
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="profile-info">
              <div className="info">
                <h3>My profile</h3>
                <p>
                  <label>First Name</label> {user.firstName}
                </p>

                <p>
                  <label>Last Name</label> {user.lastName}
                </p>
                <p>
                  <label>Email</label> {user.email}
                </p>
                {/* <p><label>birthday</label>  {user.birthday}</p> */}
                <button onClick={togglePasswordForm}>Change password</button>
              </div>
              <div className="pic">
                <img
                  src={
                    user.profilePicture
                      ? `http://localhost:4000/${user.profilePicture}`
                      : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  }
                  alt="Profile Picture"
                />
                <br />
                <input type="file" onChange={handleFileChange} />
                <br />
                <button onClick={handlePhotoUpload}>Upload new photo</button>
              </div>
            </div>
          </div> //page
        ) : (
          <p>Loading...</p>
        )}

        {isChangingPassword && openForm()}
        <div>
          {/* your profile content */}
          {passwordChangeMessage && (
            <div className="success-message">{passwordChangeMessage}</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;

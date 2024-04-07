// ProfilePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../tokenUtils';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      console.error('Token not found');
      return;
    }

    // Fetch user data when component mounts
    axios.get('http://localhost:4000/profile', {
      headers: {
        Authorization: `Bearer ${token}` // Include token in Authorization header
      }
    })
    .then(response => {
      setUser(response.data.user); // Set user data in component state
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [token]); // Run effect whenever token changes

  return (
    <>
      <Header />
      <div>
        <h2>Profile Page</h2>
        {user ? (
          <div>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            {/* Additional user information can be displayed here */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;

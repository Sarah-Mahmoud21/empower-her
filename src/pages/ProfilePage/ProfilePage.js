// ProfilePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../tokenUtils';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../ProfilePage/ProfilePage.css';
import { Link } from 'react-router-dom';

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

  const handleLogout = () => {
    // Perform logout actions (clear token, etc.)
    localStorage.removeItem("token");
  };

  return (
    <>
      <Header />
      <div>
       
        {user ? (
          <div className='profile-page'>
          <div className='profile-links'>
            <div className='pic'>
            <img src={user.img? user.img :'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}/>
              <h3>{user.firstName } {user.lastName}</h3>
              </div>
              <Link>My orders</Link><br/>
              <Link>wishlist</Link><br/>
              <Link>Notifications</Link><br/>
              <hr/><br/>
              <button onClick={handleLogout}>Logout</button>       
          </div>
          <div className='profile-info'>
          <div className='info'>
            <h3>My profile</h3>   
          <p><label>First Name</label> {user.firstName}</p>
          <p><label>last Name</label> {user.lastName}</p>
          <p><label>Email</label> {user.email}</p>
          {/* <p><label>birthday</label>  {user.birthday}</p> */}
          <button>Change password</button>
          </div> 
         <div className='pic'>
         <img src={user.img?user.img:'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}/>
         <br/>
         <button>Upload new photo</button>
         </div>
        </div>
        </div>//page


        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;

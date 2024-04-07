// tokenUtils.js

// Utility function to retrieve token from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

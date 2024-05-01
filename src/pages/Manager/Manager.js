import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalImage from "react-modal-image";
import ManagerHeader from "../Header/ManagerHeader";

function Manager() {
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

  const openSlider = (index) => {
    setSelectedImageIndex(index);
  };

  const closeSlider = () => {
    setSelectedImageIndex(null);
  };

  return (
    <>
    <ManagerHeader/>
    
    </>
  );
}

export default Manager;

// PhotoSlider.js

import React, { useState } from 'react';
import '../PhotoSliderHome/PhotoSlider.css';

const PhotoSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  return (
    <>
    
    <div className="photo-slider">
      <button onClick={prevSlide} className="prev-btn">&#10094;</button>
      <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
      <button onClick={nextSlide} className="next-btn">&#10095;</button>
    </div>
    </>
  );
};

export default PhotoSlider;
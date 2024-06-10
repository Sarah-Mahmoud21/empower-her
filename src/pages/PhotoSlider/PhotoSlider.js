import React, {useState} from "react";

  import '../PhotoSlider/PhotoSlider.css'
import { Link } from "react-router-dom";
  const PhotoSlider = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };
  
    return (
      <div className="photo-slider1"> 
      <div className="sub-slider">  
      <div className="info">
         
          <h1>{images[currentSlide].title}</h1>
          <p>{images[currentSlide].description}</p>
          <h3> shop now</h3>
     </div>
          <img src={images[currentSlide].url} alt={`Slide ${currentSlide + 1}`} />
        
          </div>
          <div className="slider">
          <button onClick={prevSlide} className="prev-btn">&#10094;</button>
          <div className="buttons">
        {[...Array(3)].map((_, index) => (
          <span
            key={index}
            className={`circle ${currentSlide === index ? "active" : ""}`}
          ></span>
        ))}
      </div>
          <button onClick={nextSlide} className="next-btn">&#10095;</button>
          </div> 
          {/* slider */}
        </div>
    );
  };
  export default PhotoSlider;
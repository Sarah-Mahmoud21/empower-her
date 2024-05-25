import React, { useState } from "react";
import "./FeaturedCategories.css";
import { Link } from "react-router-dom";

function FeaturedCategories() {
  const images = [
    {
      url: "https://isv.prod.lovecrafts.co/v1/images/e38f3f9e161d26854c5176769cdb0e0b/d0fe1d45-6c20-4afa-a036-d8289897b479.jpg/0/*/412x412",
      title: "Clothes And Crochet",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsAUams6VVlRRag12jatuCs3q60UtMj6k2V-PzYBUdJbATzOI6btLSuHJvcHHY3DzbXGU&usqp=CAU",
      title: "Food",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvVXC0y8pfJ2ms1mKfNR0-fq2ZqNLdk_-SGe6IgsShHA&s",
      title: "Home",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmTwSNTu_9naMF40wEFHA-PTQQcjLpvYhTVshoS5AGosED_F3Cj5wxrYDskOzE5_uCr6w&usqp=CAU",
      title: "Accessories",
    }
   
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  function removeWhitespace(title) {
    return title.replace(/\s+/g, '');
  }
  
  
  return (
    <>
      <div className="head-cat">
        <h1>Featured Categories</h1>
      </div>
      <div className="hr">
        <div className="animate-hr"></div>
      </div>

      <div className="visible-categories">
        {images
          .slice(currentSlide * 4, currentSlide * 4 + 4)
          .map((image, index) => (
<Link to={`./Category/${removeWhitespace(image.title)}`}>
            <div key={index} className="category" >
              <div className="images" >
                <img src={image.url} alt={`Slide ${currentSlide + 1}`} />    
              </div>
              <h3>{image.title}</h3>
            </div>
            </Link>
          ))}
      </div>
      
    </>
  );
}

export default FeaturedCategories;

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer"
import PhotoSlider from "../PhotoSlider/PhotoSlider";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import FeaturedProducts from "../FeaturedProducts/FeautredProducts";
function Store() {

     const images = [
        {
          url: 'https://d2j6dbq0eux0bg.cloudfront.net/images/39694320/4168959789.jpg',
          title: 'Hand Painted Ceramics',
          description: 'Any Beautiful Design You Desire '
        },
        {
          url: 'https://tatreez1.com/cdn/shop/files/image_645dabae-8b49-4625-8df5-be6a5cf3e64f.jpg?v=1689370643',
          title: 'Embroidered Palestinian Thobe',
          description: 'The Best Quality And Prettiest Design '
        },
        {
          url: 'https://assets.bonappetit.com/photos/5e2f38409ca59b00088cc1e8/1:1/w_2560%2Cc_limit/0220-Tanoreen-Sumac-Chicken-full.jpg',
          title: 'Traditional Food Made with Love',
          description: 'Made By Our Finest Members'
        }
      ];
      
    return (
        <>
        <Header/> 
        <PhotoSlider images={images} />
        <FeaturedCategories/>
         <FeaturedProducts/> 
        <Footer/>
        
        </>
      );

}

export default Store;
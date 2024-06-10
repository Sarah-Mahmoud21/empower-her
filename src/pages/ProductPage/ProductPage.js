import React, { useEffect, useState ,useContext} from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import FeaturedProducts from "../FeaturedProducts/FeautredProducts";
import "../ProductPage/ProductPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShekel } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../helper/CartContext";

function ProductPage() {
    const { id } = useParams();
  const [product, setProduct] = useState(null);
  // const [quantity, setQuantity] = useState(1);
  const [selectedSubImageIndex, setSelectedSubImageIndex] = useState(-1);
  const {  cart,addToCart } = useContext(CartContext);


  useEffect(() => {
    axios
      .get(`http://localhost:4000/product/${id}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });
  }, [id]);

 if (!product) {
    return <div>Loading...</div>;
  }
  const images = product.images.map((picture) => ({
    original: picture,
    thumbnail: picture,
  }));

  // const incrementQuan = () => {
  //   if (quantity < product.quantity) {
  //     setQuantity(quantity + 1);
  //   }
  // };

  // const decrementQuan = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  

  const handleSubImageClick = (index) => {
    setSelectedSubImageIndex(index);
  };
  const handleAddToCart = (product) => {
     addToCart(product); 
  }

    return (
    <>
    <Header/>
    <div className="product">
        <div className="images">
          <img
            src={
              selectedSubImageIndex === -1
                ? product.images[0]
                : product.images[selectedSubImageIndex]
            }
            alt={product.ProductName}
          />
          <div className="sub-images">
            {product.images.slice(0,3)
            .map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.productName}
                onClick={() => handleSubImageClick(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="head-info">
            <h1>{product.productName}</h1>
            <h1>
            <FontAwesomeIcon icon={faShekel} style={{fontSize:'20px'}}></FontAwesomeIcon> {product.price}
            </h1>
          </div>

          <div className="sub-header">
            <div className="quantity">
              {/* <button onClick={decrementQuan}>-</button> */}
              <span> Available Quantity in Stock : {product.quantity}</span>
              {/* <button onClick={incrementQuan}>+</button> */}
            </div>

             <div className="add-cart">
              {/* <button>
                <BookmarkBorderIcon />
              </button> */}
              <button onClick={()=>handleAddToCart(product)} className="add">Add to cart</button>
            </div> 
          </div>
          <p style={{textTransform:'capitalize'}}>{product.description}</p>
        </div>
      </div>
      <FeaturedProducts />
      <Footer/>
    </>
  );
}

export default ProductPage;


  
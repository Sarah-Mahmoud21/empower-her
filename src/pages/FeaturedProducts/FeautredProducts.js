import React, { useState, useEffect ,useContext} from "react";
import axios from "axios";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";
import "../FeaturedProducts/FeaturedProducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShekel } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../helper/CartContext";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const {  cart,addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); 
 }


  return (
    <>
      <div className="head-cat">
        <h1 >Featured Products</h1>
      </div>

      <div className="hr">
        <div className="animate-hr"></div>
      </div>

      <div className="visible-products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.slice(0, 3).map((product) => (
            <div className="category" key={product._id}>
              <Link key={product.id} to={`/Store/${product._id}`}>
              <img src={product.images[0]} />
              <p>{product.productName}</p>
              <p className="original-price"> <FontAwesomeIcon icon={faShekel} style={{fontSize:'10px'}}></FontAwesomeIcon> {product.price}</p>              
              </Link>
              <button onClick={()=>handleAddToCart(product)}>Add to Cart</button>
              
            </div>
          ))
        )}
      </div>
      
    </>
  );
}

export default FeaturedProducts;

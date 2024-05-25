import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShekel } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Category() {
    const { title } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
          .get(`http://localhost:4000/products/${title}`)
          .then((response) => {
            setProducts(response.data.products);
          })
          .catch((error) => {
            console.error("Error fetching products data:", error);
          });
    }, [title]);

    
    
    return (
        <>
            <Header />
            <h1>{title} Related Products</h1>
            <div className="visible-products">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => (
            <div className="category" key={product._id}>
              <Link key={product.id} to={`/Store/${product._id}`}>
              <img src={product.images[0]} />
              <p>{product.productName}</p>
              <p className="original-price"> <FontAwesomeIcon icon={faShekel} style={{fontSize:'10px'}}></FontAwesomeIcon> {product.price}</p>
              
              </Link>
              <button>Add to Cart</button>
              </div>
          ))
        )}
      </div>
            <Footer />
        </>
    );
}

export default Category;

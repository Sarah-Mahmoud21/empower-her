import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import "../CartPage/CartPage.css";
import { CartContext } from "../../helper/CartContext";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShekel } from "@fortawesome/free-solid-svg-icons";

function CartPage() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const queryParams = new URLSearchParams();


  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item._id] = 1; // Assuming the initial quantity is 1
    });
    setQuantities(initialQuantities);
  }, [cart]);

  cart.forEach((item, index) => {
    queryParams.append(`quantity${index + 1}`, quantities[item._id]);
  });

  const incrementQuan = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item._id]:
        prevQuantities[item._id] < item.quantity
          ? prevQuantities[item._id] + 1
          : prevQuantities[item._id],
    }));
  };

  const decrementQuan = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item._id]:
        prevQuantities[item._id] > 1
          ? prevQuantities[item._id] - 1
          : prevQuantities[item._id],
    }));
  };

  const totalItems = Object.values(quantities).reduce(
    (total, num) => total + num,
    0
  );

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * (quantities[item._id] || 1);
  }, 0);

  return (
    <>
      <Header />

      <div>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div key={item._id} className="cart-items">
                <button
                  className="close"
                  onClick={() => removeFromCart(item._id)}>
                  <CloseIcon />
                </button>
                <img src={item.images[0]} alt={item.productName} />
                <p>{item.productName}</p>
                <div className="quantity">
                  <button onClick={() => decrementQuan(item)}>-</button>
                  <span>{quantities[item._id]}</span>
                  <button onClick={() => incrementQuan(item)}>+</button>
                </div>
              </div>
            ))}
            <div className="cart-info">
              <p>Subtotal ({totalItems}) items </p>
              <p
                style={{
                  fontSize: "25px",
                }}>
                <FontAwesomeIcon
                  icon={faShekel}
                  style={{ fontSize: "20px" }}></FontAwesomeIcon>{" "}
                {totalPrice.toFixed(2)}
              </p>

              <hr />
             <Link to={`/checkout?${queryParams.toString()}`}>
        <button>Proceed to Checkout</button>
      </Link>
            </div>
          </>
        ) : (
          <>
            <div className="empty">
              <h1>Your cart is empty</h1>
              <img src="https://solartrade.in/img/404.svg" alt="empty cart" />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartPage;

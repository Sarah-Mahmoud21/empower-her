import React, { useEffect, useState ,useContext} from "react";
import Header from "../Header/Header";
import "../CartPage/CartPage.css";
import { CartContext } from "../../helper/CartContext";
import CloseIcon from "@mui/icons-material/Close";

function CartPage() {
  const {  cart,addToCart ,removeFromCart} = useContext(CartContext);
  const [number,setNumber] = useState(1);

  const incrementQuan = (item) => {
    if(number < item.quantity){
        setNumber(number + 1);
    } 
  };

  const decrementQuan = (item) => {
    if(number > 1){
        setNumber(number - 1);
    } 
  };

 
  
  let len = 0;
  cart.forEach((item) => {
    const quan = number;
    len += quan;
  });

  const Price = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      const originalPrice = item.price * number;
      total += originalPrice;
    });
    return total;
  };
  const handleAddToCart = (item) => {
    addToCart(item); // Add current product to the cart
  };
  
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
                  onClick={() => removeFromCart(item.id)}>
                  <CloseIcon />
                </button>
                <img src={item.images[0]} alt={item.productName} />
                <p>{item.productName}</p>
                <div className="quantity">
                  <button onClick={() => decrementQuan(item)}>-</button>
                  <span>{number}</span>
                  <button onClick={() => incrementQuan(item)}>+</button>
                </div>
              </div>
            ))}
            <div className="cart-info">
              <p>Subtotal ({len}) items </p>
              <p
                style={{
                  color: "#707070",
                  textDecoration: "line-through",
                  fontSize: "15px",
                }}>
                ${Price(cart)}
              </p>
             
              <hr />
              <button>Proceed to Checkout</button>
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

import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../helper/CartContext";
import "../CheckOut/Checkout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";

function Checkout() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { cart, removeFromCart } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  const quantities = [];
  for (const param of queryParams.entries()) {
    if (param[0].startsWith("quantity")) {
      quantities.push(Number(param[1]));
    }
  }

  useEffect(() => {
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * quantities[index];
    });
    setSubtotal(total);
  }, [cart, quantities]);

  const [shippingAddress, setShippingAddress] = useState({
    country: "",
    city: "",
    address: "",
    phone :""
  });
  
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  

  const isShippingAddressValid = () => {
    return (
      shippingAddress.country &&
      shippingAddress.city &&
      shippingAddress.address &&
      shippingAddress.phone

    );
  };

  

  const handleStepChange = (step) => {
    if (step === 2 && (!isShippingAddressValid())) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }
    setActiveStep(step);
  };

  const handleOrderSubmission = async () => {
  try {
    await Promise.all(
      cart.map(async (item, index) => {
        if(isShippingAddressValid()){
          const initialQuantity = Number(item.quantity);
          const purchaseQuantity = Number(quantities[index]);
          let newQuantity = initialQuantity - purchaseQuantity;
          console.log(`Updating product ${item.id}: initial ${initialQuantity}, purchased ${purchaseQuantity}, new ${newQuantity}`);
          await axios.put(`http://localhost:4000/products/${item._id}`, {
            quantity: newQuantity,
          });
          
          const saleDetails = {
            productId: item._id,
            quantity: quantities[index]
          };
          await axios.post("http://localhost:4000/sales", saleDetails);
        

          // Post to customers table
          const orderDetails = {
            cartItems: cart.map((item, index) => ({
              _id: item._id,
              quantity: quantities[index]
            })),
            country: shippingAddress.country,
            city: shippingAddress.city,
            street: shippingAddress.address,
            mobileNumber: shippingAddress.phone,
            totalAmount: subtotal
          };
          await axios.post("http://localhost:4000/customers", orderDetails);

          // Post to sales table
          
            

          removeFromCart(item._id);
        }
      })
    );
    handleStepChange(2);
  } catch (error) {
    console.error("Failed to update the item quantity", error);
    alert("There was an error processing your order. Please try again.");
  }
};

  
  
  return (
    <>
      <Header />
      <div className="checkout">
        <h3>Review Order:</h3>
        <span
          className={`num ${activeStep === 1 ? "active" : ""}`}
          onClick={() => handleStepChange(1)}
        >
          1
        </span>
        Payment
        <span className="hr"></span>
        <span
          className={`num ${activeStep === 2 ? "active" : ""}`}
        >
          2
        </span>
        Place an Order
        <div className="content">
          {activeStep === 1 ? (
            <div className="payment">
              <div className="shipping">
                <h2> Shipping Address </h2>
                <form>
                  <div className="form-group">
                    <label>Country:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Only Palestine Available Now"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleAddressChange}
                    />
                    <br />
                  </div>
                  <div className="form-group">
                    <label>City:</label>
                    <br />
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                    />
                    <br />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <br />
                    <textarea
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleAddressChange}
                    ></textarea>
                    <br />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <br />
                    <input
                      type="text"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                    />
                    <br/>
                  </div>
                </form>
                <div>
                  
                </div>
              </div>
              <div>
                {cart.map((item, index) => (
                  <div className="cartinfo" key={item._id}>
                    <img src={item.images[0]} alt={item.productName} />
                    <p>{item.productName}</p>
                    <p>
                      {item.price} x {quantities[index]}
                    </p>
                    <p>
                      Subtotal: ${(item.price * quantities[index]).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="total">
                  <h2>Total: ${subtotal.toFixed(2)}</h2>
                  <Link to="/cart">
                    <button className="review"> Review Order</button>
                  </Link>
                  <button
                    onClick={handleOrderSubmission}
                    className="review"
                  >
                    Submit Order
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="done">
              <h2>Order Confirmed</h2>
              <p>Thank you for your purchase!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;

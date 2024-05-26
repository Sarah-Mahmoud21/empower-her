import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../helper/CartContext";
import "../CheckOut/Checkout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Checkout() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { cart } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const [activeStep, setActiveStep] = useState(1); // State to manage active step

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

  // State variables for shipping address and payment details
  const [shippingAddress, setShippingAddress] = useState({
    country: "",
    city: "",
    address: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    phone: "",
  });

  // Event handler for shipping address input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Event handler for payment details input changes
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Event handler to change the active step
  const handleStepChange = (step) => {
    setActiveStep(step);
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
          onClick={() => handleStepChange(2)}
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
                </form>

                <div>
                  <h2> Payment Details </h2>
                  <form>
                    <div className="form-group">
                      <label>Card Number:</label>
                      <br />
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentChange}
                      />
                      <br />
                    </div>
                    <div className="form-group">
                      <label>Expiration Date:</label>
                      <br />
                      <input
                        type="text"
                        name="expirationDate"
                        value={paymentDetails.expirationDate}
                        onChange={handlePaymentChange}
                      />
                      <br />
                    </div>
                    <div className="form-group">
                      <label>CVV:</label>
                      <br />
                      <input
                        type="text"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Don't have a visa? Enter your phone number here:</label>
                      <br />
                      <input
                        type="text"
                        name="phone"
                        value={paymentDetails.phone}
                        onChange={handlePaymentChange}
                      />
                    </div>
                  </form>
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
                    <p>Subtotal: ${(item.price * quantities[index]).toFixed(2)}</p>
                  </div>
                ))}
                 <div className="total">
              <h2>Total: ${subtotal.toFixed(2)}</h2>
              <Link to ="/cart">
              <button className="review"> Review Order</button>
              </Link>
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

import React from "react";
import { Link } from "react-router-dom";

const CheckOut = ({ setCartOpen }) => {
  return (
    <div className="easy-checkout">
      <div className="checkout-actions">
        <Link to="/shop" className="shopping">
          {" "}
          <button
            onClick={() => setCartOpen(false)}
            className="button-secondary"
          >
            Continue shopping
          </button>
        </Link>

        <Link to="/shipping" className="checkout">
          <button onClick={() => setCartOpen(false)} className="button">
            Proceed To Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CheckOut;

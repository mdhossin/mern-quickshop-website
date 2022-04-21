import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";
const OrderSuccess = () => {
  return (
    <div className="orderSuccess container-div">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Order - Success</title>
      </Helmet>
      <BsCheckLg />
      <h1>Your Order has been Placed successfully. </h1>
      <Link to="/dashboard/myorders" className="button">
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;

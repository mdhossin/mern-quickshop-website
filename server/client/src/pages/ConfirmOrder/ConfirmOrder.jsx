import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state?.cart);

  const { userInfo } = useSelector((state) => state?.userLogin);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal < 1000 ? 0 : 100;

  // const tax = subtotal;
  // const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      // tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <section className="container-div section confirm">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Confirm - Order</title>
      </Helmet>

      <div className="confirm__order grid">
        <div className="confirm__order__shipping grid">
          <div className="confirm__order__shipping__area">
            <h3 className="confirm__order__shipping__area-title">
              Shipping Info
            </h3>
            <div className="confirm__order__shipping__area__box">
              <div>
                <p>
                  Name: <span>{userInfo?.user?.name}</span>
                </p>
              </div>
              <div>
                <p>
                  Phone: <span>{shippingInfo?.phoneNo}</span>
                </p>
              </div>
              <div>
                <p>
                  Address: <span> {address}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="confirm__order__cartItem">
            <h3 className="confirm__order__shipping__area-title">
              Your Cart Items:
            </h3>
            <div className="confirm__order__cartItem__container">
              {cartItems &&
                cartItems?.map((item) => (
                  <div
                    key={item.product}
                    className="confirm__order__cartItem__container__items"
                  >
                    <img src={item.image} alt="Product" />
                    <div className="confirm__order__cartItem__container__items-price">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                      <span>
                        {item.quantity} X {item.price} = $
                        {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="confirm__order__summary">
          <h3 className="confirm__order__shipping__area-title">
            Order Summery
          </h3>
          <div className="confirm__order__summary__subtotal">
            <div>
              <p>Subtotal:</p>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div>
              <p>Shipping Charges:</p>
              <span>${shippingCharges}</span>
            </div>
            {/* <div>
              <p>GST:</p>
              <span>${tax.toFixed(2)}</span>
            </div> */}
          </div>

          <hr />
          <div className="confirm__order__summary__total">
            <p>Total:</p>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="confirm__button">
            <button className="button" onClick={proceedToPayment}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmOrder;

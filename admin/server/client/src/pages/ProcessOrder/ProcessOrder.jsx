import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineAccountTree } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../redux/actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../redux/constants/orderConstants";
import axios from "axios";
import { BASE_URL } from "../../config";
const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");

  const user = useSelector((state) => state?.userLogin?.userInfo);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { addToast } = useToasts();

  const updateOrderSubmitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));

    if (status === "Delivered") {
      await axios.post(
        `${BASE_URL}/api/user/delivered`,
        {
          email: order?.user?.email,
        },
        {
          headers: { Authorization: user?.access_token },
        }
      );
    }
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, addToast, id]);

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }
    if (updateError) {
      addToast(updateError, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      addToast("Order Updated Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError, addToast]);
  return (
    <>
      {loading ? (
        <Spinner
          style={{ marginLeft: "50%", marginTop: "5%" }}
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="orderDetails grid container-div">
            <div className="orderDetails__container grid">
              <div className="orderDetails__container__box">
                <h3>Shipping Info</h3>
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>

                <div>
                  <p className="address">Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <div className="orderDetails__container__box">
                <h3>Payment</h3>
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>
                    ${order.totalPrice && order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="orderDetails__container__box">
                <h3>Order Status</h3>
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
              <div className="orderDetails__cartItems">
                <h3>Order Items:</h3>
                <div className="orderDetails__cartItems__container">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X ${item.price} ={" "}
                          <b>${item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* update area */}
            <div
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <form
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h3>Process Order</h3>

                <div>
                  <MdOutlineAccountTree />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {order.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <button
                  className="button"
                  type="submit"
                  disabled={status === "" ? true : false}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Process"
                  )}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProcessOrder;

import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { clearErrors, myOrders } from "../../../../redux/actions/orderActions";
import Loading from "../../../common/Loading/Loading";
import { Helmet } from "react-helmet";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      // addToast(error, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, addToast]);

  return (
    <section className="myorders container-div">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My - Orders</title>
      </Helmet>
      <h2>My Orders</h2>
      <div>
        <Table responsive="sm">
          <thead>
            <tr className="myorders__header">
              <th>Order Id</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="order-loading">
                  <Loading backdrop />
                </td>
              </tr>
            ) : error ? (
              <h3
                style={{
                  color: "#333",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {error}
              </h3>
            ) : (
              <>
                {orders?.length > 0 &&
                  orders?.map(
                    ({ _id, orderStatus, totalPrice, orderItems }) => (
                      <tr key={_id}>
                        <td>{_id}</td>
                        <td>{orderItems?.length}</td>
                        <td>${totalPrice.toFixed(2)}</td>
                        <td>
                          <button>{orderStatus}</button>
                        </td>
                        <td title="Order Details">
                          <Link
                            className="order-detail"
                            to={`/dashboard/order/${_id}`}
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
              </>
            )}
          </tbody>
        </Table>
      </div>
      <h2
        style={{
          marginTop: "2rem",
          textAlign: "center",
          color: "#333",
        }}
      >
        {orders?.length === 0 && "Your order is empty."}
      </h2>
    </section>
  );
};

export default MyOrders;

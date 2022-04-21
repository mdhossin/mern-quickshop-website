import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { Table } from "react-bootstrap";
import { clearErrors, myOrders } from "../../../../redux/actions/orderActions";
import Loader from "../../../../components/Loader/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, addToast]);

  return (
    <section className="myorders container-div">
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
                  <Loader backdrop />
                </td>
              </tr>
            ) : error ? (
              <h3>{error}</h3>
            ) : (
              <>
                {orders?.map(({ _id, orderStatus, totalPrice, orderItems }) => (
                  <tr key={_id}>
                    <td>#{_id}</td>
                    <td>{orderItems?.length}</td>
                    <td>{totalPrice.toFixed(2)}</td>
                    <td>
                      <button>{orderStatus}</button>
                    </td>
                    <td title="Order Details">
                      {" "}
                      <Link to={`/dashboard/order/${_id}`}>
                        {" "}
                        <BiEdit
                          style={{
                            color: "#f1510a",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
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

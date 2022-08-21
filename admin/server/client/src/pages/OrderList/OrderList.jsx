import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../redux/actions/orderActions";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const { error, orders, loading } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    if (window.confirm("Are you sure want to delete order ?")) {
      dispatch(deleteOrder(id));
    }
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }

    if (deleteError) {
      addToast(deleteError, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      addToast("Order Deleted Succssfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted, addToast]);

  return (
    <>
      <section className="myorders container-div">
        <h2>All Orders</h2>
        {orders && (
          <div>
            <Table responsive="md" style={{ overflowX: "auto" }}>
              <thead>
                <tr className="myorders__header">
                  <th>Order Id</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th style={{ textAlign: "end" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="order-loading">
                      <Spinner
                        style={{ marginLeft: "50%", marginTop: "5%" }}
                        animation="border"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </td>
                  </tr>
                ) : error ? (
                  <h3>{error}</h3>
                ) : (
                  <>
                    {orders?.length > 0 &&
                      orders?.map(
                        ({ _id, orderStatus, totalPrice, orderItems }) => (
                          <tr key={_id}>
                            <td>#{_id}</td>
                            <td>{orderItems?.length}</td>
                            <td>{totalPrice.toFixed(2)}</td>
                            <td>
                              <button
                                className={
                                  orderStatus === "Delivered"
                                    ? "greenColor"
                                    : "redColor"
                                }
                              >
                                {orderStatus}
                              </button>
                            </td>
                            <td
                              title="Update Order"
                              style={{ textAlign: "center" }}
                            >
                              {" "}
                              <Link to={`/dashboard/admin/order/${_id}`}>
                                {" "}
                                <BiEdit
                                  style={{
                                    color: "#333",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                  }}
                                />
                              </Link>
                            </td>
                            <td title="Delete Order">
                              <BsFillTrashFill
                                onClick={() => deleteOrderHandler(_id)}
                                style={{
                                  color: "#f1510a",
                                  fontSize: "18px",
                                  cursor: "pointer",
                                }}
                              />
                            </td>
                          </tr>
                        )
                      )}
                  </>
                )}
              </tbody>
            </Table>
          </div>
        )}
        <h2
          style={{
            marginTop: "2rem",
            textAlign: "center",
            color: "#333",
          }}
        >
          {orders?.length === 0 && "No order found."}
        </h2>
      </section>
    </>
  );
};

export default OrderList;

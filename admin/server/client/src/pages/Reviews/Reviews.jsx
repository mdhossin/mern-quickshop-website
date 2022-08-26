import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";

import { BsFillTrashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { clearErrors } from "../../redux/actions/orderActions";
import {
  deleteReviews,
  getAllReviews,
} from "../../redux/actions/productActions";

import { DELETE_REVIEW_RESET } from "../../redux/constants/productConstants";

const Reviews = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.getAllProductReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    if (window.confirm("Are you sure want to delete?")) {
      dispatch(deleteReviews(reviewId, productId));
    }
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }

    if (deleteError) {
      addToast(deleteError, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      addToast("Review Deleted Successfully", {
        appearance: "success",
        autoDismiss: true,
      });

      navigate("/dashboard/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, navigate, isDeleted, productId, addToast]);

  return (
    <>
      <section className="container-div reviews">
        <form
          className="review-container"
          onSubmit={productReviewsSubmitHandler}
        >
          <h2>All Reviews</h2>
          <input
            required
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            type="text"
            placeholder="Enter product id.."
          />
          <button type="submit" className="button-primary">
            Search Review
          </button>
        </form>
        {reviews && (
          <div>
            <Table responsive="md" style={{ overflowX: "auto" }}>
              <thead>
                <tr className="myorders__header">
                  <th>Review Id</th>
                  <th>User</th>
                  <th>Comment</th>
                  <th>Actions</th>
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
                    {reviews?.length > 0 &&
                      reviews?.map(({ _id, name, comment }) => (
                        <tr key={_id}>
                          <td>{_id}</td>
                          <td>{name}</td>
                          <td>{comment}</td>

                          <td title="Delete Order">
                            <BsFillTrashFill
                              onClick={() => deleteReviewHandler(_id)}
                              style={{
                                color: "#f1510a",
                                fontSize: "18px",
                                cursor: "pointer",
                                textAlign: "end",
                              }}
                            />
                          </td>
                        </tr>
                      ))}
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
          {reviews?.length === 0 && "Reviews not found."}
        </h2>
      </section>
    </>
  );
};

export default Reviews;

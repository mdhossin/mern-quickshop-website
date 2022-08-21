import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  getAllProduct,
} from "../../redux/actions/productActions";
import { Spinner } from "react-bootstrap";
import { BASE_URL } from "../../config";

const AllProducts = () => {
  const [callback, setCallback] = useState(false);
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.allProducts);
  const { products, loading, error } = productsData;
  const token = useSelector((state) => state.userLogin?.userInfo?.access_token);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch, callback]);

  const deleteHandler = async (id, public_id) => {
    try {
      if (window.confirm("are you sure?")) {
        const destroyImg = axios.post(
          `${BASE_URL}/api/destroy`,
          { public_id },
          {
            headers: { Authorization: token },
          }
        );
        await destroyImg;
        dispatch(deleteProduct(token, id));
        setCallback(!callback);
        alert("Product Deleted Successfully");
      }
    } catch (error) {
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  return (
    <section className="allProducts">
      <h2>All Products</h2>

      <div className="allProducts__container grid">
        {loading ? (
          <Spinner
            style={{ marginLeft: "50%", marginTop: "5%" }}
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <h2 style={{ color: "#333", fontWeight: "500", textAlign: "center" }}>
            {error}
          </h2>
        ) : (
          <>
            {products?.map((product) => (
              <div key={product?._id} className="allProducts__container__item">
                <img src={product?.images?.url} alt="" />

                <div className="allProducts__container__item__content">
                  <h3>{product.name}</h3>
                  <div className="allProducts__container__item-price">
                    <h5>${product.price}</h5>
                    <p>Stock : {product.Stock}</p>
                  </div>
                  <p>Id: {product?._id}</p>
                  <p>{product.description.slice(0, 30)}...</p>
                  <div className="allProducts__buttons">
                    <Link
                      className="button"
                      to={`/dashboard/edit/${product._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="button delete"
                      onClick={() =>
                        deleteHandler(product._id, product.images.public_id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {products?.length === 0 && (
        <h3 style={{ color: "#333", fontWeight: "500", textAlign: "center" }}>
          No product found.
        </h3>
      )}
    </section>
  );
};

export default AllProducts;

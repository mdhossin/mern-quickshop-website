import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { Spinner } from "react-bootstrap";

import { useToasts } from "react-toast-notifications";
import {
  getAllProduct,
  getProductById,
} from "../../redux/actions/productActions";
import { addItemsToCart } from "../../redux/actions/cartActions";

import { Footer, ProductRating } from "../../components";
import { FiShoppingCart } from "react-icons/fi";
import SingleProduct from "../../components/common/Products/SingleProduct/SingleProduct";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productById);

  const { cartItems } = useSelector((state) => state.cart);

  const addOrNot = cartItems?.find((item) => item.product === product._id);

  const { addToast } = useToasts();

  const productsData = useSelector((state) => state.allProducts);
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = productsData;

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [productId, dispatch]);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId, quantity, addToast));
  };

  return (
    <>
      <section className="container-div section product">
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
          <div className="product__detail grid">
            <div className="product__detail__img">
              <img src={product?.images?.url} alt="" />
            </div>

            <div className="product__detail__info">
              <h2 className="product__detail__info-name">{product.name}</h2>

              <div className="product__detial__info__price">
                <span className="product__detail__info__price-count">
                  ${product.price}
                </span>
              </div>
              <div className="product__detail__info-rating">
                <ProductRating ratingValue={product.ratings} />(
                {product.ratings})
              </div>

              <div className="product__detail__info-stock">
                <p>
                  Status:{" "}
                  {product?.Stock && product?.Stock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </p>
              </div>

              <div className="product__detail__info__buttons">
                <div className="product__detail__info__buttons-quantity">
                  <button onClick={decreaseQuantity} className="minus">
                    -
                  </button>
                  <input
                    className="input"
                    readOnly
                    type="number"
                    value={quantity}
                  />
                  <button onClick={increaseQuantity} className="add">
                    +
                  </button>
                </div>
                <div className="product__detail__info__buttons-add">
                  {product?.Stock && product?.Stock > 0 ? (
                    <button
                      disabled={addOrNot?.quantity > 0}
                      onClick={addToCartHandler}
                    >
                      <FiShoppingCart style={{ marginRight: ".5rem" }} />
                      {addOrNot?.quantity > 0 ? "Added" : "Buy Now"}
                    </button>
                  ) : (
                    <button disabled>Out of Stock</button>
                  )}
                </div>
                <div className="product__detail__info__buttons-wishlist">
                  <button>
                    <AiOutlineHeart />
                  </button>
                </div>
              </div>

              <div className="product__detail__info-desc">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="related-products">
          <h2>Related Products</h2>
          <div className="featured__products grid">
            <>
              {productsLoading ? (
                <Spinner
                  style={{ marginLeft: "50%", marginTop: "5%" }}
                  animation="border"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : productsError ? (
                <h2
                  style={{
                    color: "#333",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {productsError}
                </h2>
              ) : (
                <>
                  {products &&
                    products?.map((item) => {
                      console.log(item, "all");
                      return item.category === product.category ? (
                        <SingleProduct key={item?._id} product={item} />
                      ) : null;
                    })}
                </>
              )}
            </>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;

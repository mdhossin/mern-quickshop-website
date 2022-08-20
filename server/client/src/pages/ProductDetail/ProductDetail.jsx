import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { Spinner } from "react-bootstrap";

import { useToasts } from "react-toast-notifications";
import {
  getAllProduct,
  getProductById,
  newReview,
} from "../../redux/actions/productActions";
import { addItemsToCart } from "../../redux/actions/cartActions";
import ReactStars from "react-rating-stars-component";

import { Footer, ProductRating } from "../../components";
import { FiShoppingCart } from "react-icons/fi";
import SingleProduct from "../../components/common/Products/SingleProduct/SingleProduct";
import { Helmet } from "react-helmet";
import { addItemsToWishlist } from "../../redux/actions/wishlistActions";
import { clearErrors } from "../../redux/actions/orderActions";
import { NEW_REVIEW_RESET } from "../../redux/constants/productConstants";
const ProductDetail = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productById);

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;
  const { cartItems } = useSelector((state) => state.cart);

  const addOrNot = cartItems?.find((item) => item.product === product._id);

  const { addToast } = useToasts();

  const productsData = useSelector((state) => state.allProducts);

  const {
    success,
    error: reviewError,
    message,
    loading: reviewLoading,
  } = useSelector((state) => state.newReview);

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

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const addWishlistOrNot = wishlistItems?.find(
    (item) => item.product === productId
  );

  const addToWishlistHandler = () => {
    dispatch(addItemsToWishlist(productId, 1, addToast));
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      newReview({ rating, comment, name: userInfo?.user?.name, productId })
    );

    e.target.reset();
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }

    if (reviewError) {
      addToast(reviewError, { appearance: "error", autoDismiss: true });
      dispatch(clearErrors());
    }

    if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductById(productId));
  }, [dispatch, productId, error, reviewError, success, addToast, message]);

  return (
    <>
      <section className="container-div section product">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Product - Detail</title>
        </Helmet>
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
                  <button
                    disabled={addWishlistOrNot?.quantity > 0}
                    onClick={addToWishlistHandler}
                    title={
                      addWishlistOrNot?.quantity > 0
                        ? "Added to Wishlist"
                        : "Add to Wishlist"
                    }
                  >
                    {addWishlistOrNot?.quantity > 0 ? (
                      <AiFillHeart style={{ color: "red" }} />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </button>
                </div>
              </div>

              <div className="product__detail__info-desc">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="product-review-containter">
          <div className="product-review-left">
            {product?.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product?.reviews &&
                  product.reviews.map((review) => <h1>review</h1>)}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </div>
          {userInfo?.user && (
            <form className="product-review-right" onSubmit={handleSubmit}>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                fullIcon={<AiFillStar />}
                activeColor="#ffd700"
              />

              <div>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  name="message"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>

              <button type="submit">
                {reviewLoading ? "Loading.." : "Submit Review"}
              </button>
            </form>
          )}
        </div>

        {/* <ReactStars
          count={5}
          value={review?.ratingStar}
          edit={false}
          size={24}
          isHalf={true}
          fullIcon={<AiFillStar />}
          activeColor="#ffd700"
        /> */}

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

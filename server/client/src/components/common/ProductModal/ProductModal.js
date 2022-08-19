import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { addItemsToCart } from "../../../redux/actions/cartActions";
import { addItemsToWishlist } from "../../../redux/actions/wishlistActions";
import ProductRating from "../ProductRating/ProductRating";

const ProductModal = ({ showmodal, setShowModal, product }) => {
  const modalRef = useRef();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addOrNot = cartItems?.find((item) => item.product === product._id);

  const { addToast } = useToasts();

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
    dispatch(addItemsToCart(product._id, quantity, addToast));
  };

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const addWishlistOrNot = wishlistItems?.find(
    (item) => item.product === product._id
  );

  const addToWishlistHandler = () => {
    dispatch(addItemsToWishlist(product._id, 1, addToast));
  };

  const closeModal = (e) => {
    console.log(modalRef.current, e.target);
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showmodal) {
        setShowModal(false);
        // console.log("I pressed");
      }
    },
    [setShowModal, showmodal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showmodal ? (
        <div className="modal" onClick={closeModal} ref={modalRef}>
          {/* <animated.div style={animation}> */}
          <div className="animate">
            <div className="modalWrapper">
              {product && (
                <div className="container-div section product">
                  <div className="product__detail grid">
                    <div className="product__detail__img">
                      <img src={product?.images?.url} alt="" />
                    </div>

                    <div className="product__detail__info">
                      <h2 className="product__detail__info-name">
                        {product.name}
                      </h2>

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
                              <FiShoppingCart
                                style={{ marginRight: ".5rem" }}
                              />
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
                </div>
              )}

              <div
                className="close"
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              >
                <HiX />
              </div>
            </div>
          </div>
          {/* </animated.div> */}
        </div>
      ) : null}
    </>
  );
};

export default ProductModal;

import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { useDispatch, useSelector } from "react-redux";

import { AiOutlineHeart, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import ProductRating from "../../ProductRating/ProductRating";
import { addItemsToCart } from "../../../../redux/actions/cartActions";
import { addItemsToWishlist } from "../../../../redux/actions/wishlistActions";
import { useState } from "react";
import ProductModal from "../../ProductModal/ProductModal";

const SingleProduct = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [showmodal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const { addToast } = useToasts();

  const addOrNot = cartItems?.find((item) => item.product === product._id);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(product?._id, 1, addToast));
  };
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const addWishlistOrNot = wishlistItems?.find(
    (item) => item.product === product._id
  );
  const addToWishlistHandler = () => {
    dispatch(addItemsToWishlist(product?._id, 1, addToast));
  };
  return (
    <>
      <div className={`product-wrap`}>
        <div className="product-img">
          <Link to={`/product/${product._id}`}>
            <img className="default-img" src={product?.images?.url} alt="" />
          </Link>

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
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
            <div className="pro-same-action pro-cart">
              {product?.Stock && product?.Stock > 0 ? (
                <button
                  disabled={addOrNot?.quantity > 0}
                  onClick={addToCartHandler}
                  className="cart-btn"
                  title={
                    addOrNot?.quantity > 0 ? "Added to Cart" : "Add to Cart"
                  }
                >
                  <FiShoppingCart />
                  {addOrNot?.quantity > 0 ? "Added" : "Buy Now"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
              <button onClick={() => setShowModal(true)} title="Quick View">
                <AiOutlineEye />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <div className="product-rating">
            <ProductRating ratingValue={product.ratings} />({product.ratings})
          </div>
          <h3>
            <Link to={"/product/" + product._id}>{product.name}</Link>
          </h3>

          <div className="product-price">
            <span>${product.price}</span>
          </div>
        </div>
      </div>

      {/* quick view modal */}
      <ProductModal
        product={product}
        showmodal={showmodal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default SingleProduct;

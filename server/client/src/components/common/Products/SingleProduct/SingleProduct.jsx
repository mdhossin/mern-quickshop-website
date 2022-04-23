import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { useDispatch, useSelector } from "react-redux";

import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import ProductRating from "../../ProductRating/ProductRating";
import { addItemsToCart } from "../../../../redux/actions/cartActions";

const SingleProduct = ({ product, wishlistItem }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const { addToast } = useToasts();

  const addOrNot = cartItems?.find((item) => item.product === product._id);
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addItemsToCart(product?._id, 1, addToast));
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
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                //   onClick={() => addToWishlist(product, addToast)}
              >
                <AiOutlineHeart />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product?.Stock && product?.Stock > 0 ? (
                <button
                  disabled={addOrNot?.quantity > 0}
                  onClick={addToCartHandler}
                  className="cart-btn"
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
              <Link to={`/product/${product._id}`}>
                <button title="Quick View">
                  <AiOutlineEye />
                </button>
              </Link>
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
    </>
  );
};

export default SingleProduct;

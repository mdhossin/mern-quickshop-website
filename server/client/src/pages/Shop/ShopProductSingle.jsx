import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { addItemsToCart } from "../../redux/actions/cartActions";
import { ProductRating } from "../../components";
import { addItemsToWishlist } from "../../redux/actions/wishlistActions";
import ProductModal from "../../components/common/ProductModal/ProductModal";
import { useState } from "react";

const ShopProductSingle = ({ product, gridView }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [showmodal, setShowModal] = useState(false);
  const { addToast } = useToasts();

  const addOrNot = cartItems?.find((item) => item.product === product._id);
  const dispatch = useDispatch();
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
      {gridView ? (
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
      ) : (
        <div className={`product-wrap product-grid-line-view`}>
          <div className="product-img-grid">
            <Link to={`/product/${product._id}`}>
              <img className="default-img" src={product?.images?.url} alt="" />
            </Link>
          </div>
          <div className="product-content">
            <h3>
              <Link to={"/product/" + product._id}>{product.name}</Link>
            </h3>

            <div className="product-price">
              <span>${product.price}</span>
            </div>

            <div className="product-rating">
              <ProductRating ratingValue={product.ratings} />({product.ratings})
            </div>

            <div className="product-description">
              <p>{product.description.slice(0, 400) + "...."}</p>
            </div>

            <div className="buttons-group">
              <div className="buy-now">
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

              <div className="buy-now pro-wishlist">
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
          </div>
        </div>
      )}

      {/* quick view modal */}
      <ProductModal
        product={product}
        showmodal={showmodal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default ShopProductSingle;

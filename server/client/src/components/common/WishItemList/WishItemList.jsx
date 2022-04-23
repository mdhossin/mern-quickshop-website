import React from "react";
import { HiX } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemsFromWishlist } from "../../../redux/actions/wishlistActions";

const WishItemList = ({ wishlistItems, setisWishListOpen }) => {
  // console.log(cartItems, "whist");
  const dispatch = useDispatch();

  const removeFromWishlist = (id) => {
    dispatch(removeItemsFromWishlist(id));
  };
  return (
    <div className="wishlist">
      {wishlistItems &&
        wishlistItems.map((item, index) => (
          <div key={`index-${index}`} className="wishlist__items">
            <div className="wishlist__items__item">
              <img
                src={item.image}
                className="wishlist__items__item__img"
                alt=""
              />
              <div className="wishlist__items__item__details">
                <Link
                  to={`/product/${item.product}`}
                  onClick={() => {
                    setisWishListOpen((prev) => !prev);
                  }}
                  className="wishlist__items__item__details-name"
                >
                  {item.name}
                </Link>
                <span className="wishlist__items__item__details-price">
                  ${item.price}
                </span>
                <Link
                  to={`/product/${item.product}`}
                  onClick={() => {
                    setisWishListOpen((prev) => !prev);
                  }}
                >
                  <button className="wishlist__items__item__details-button">
                    See Details
                  </button>
                </Link>
              </div>

              <div
                className="wishlist__items__item__close"
                onClick={() => removeFromWishlist(item.product)}
              >
                <HiX />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WishItemList;

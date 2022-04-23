import React from "react";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";

import { WishItemList } from "../../components";

const WishList = ({ setisWishListOpen }) => {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <div className="cart">
      <div className="cart__header">
        <h5 className="cart__header-title">
          Wishlist Products ({wishlistItems?.length})
        </h5>
        <AiOutlineClose
          className="cart__header-icon"
          onClick={() => setisWishListOpen(false)}
        />
      </div>
      {wishlistItems?.length > 0 ? (
        <div className="cart__header__body">
          <WishItemList
            wishlistItems={wishlistItems}
            setisWishListOpen={setisWishListOpen}
          />
        </div>
      ) : (
        <div className="cart__empty">
          <AiOutlineHeart />
          <p>Your wishlist is empty</p>
        </div>
      )}
    </div>
  );
};

export default WishList;

import axios from "axios";
import { BASE_URL } from "../../config";
import {
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST_ITEM,
} from "../constants/wishlistConstants";

// Add to Cart
export const addItemsToWishlist =
  (id, quantity, addToast) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);

      dispatch({
        type: ADD_TO_WISHLIST,
        payload: {
          product: data._id,
          name: data.name,
          price: data.price,
          image: data.images.url,
          stock: data.Stock,
          quantity,
        },
      });

      if (addToast) {
        addToast("Added To Wishlist", {
          appearance: "success",
          autoDismiss: true,
        });
      }

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(getState().wishlist.wishlistItems)
      );
    } catch (error) {
      console.log(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

// REMOVE FROM CART
export const removeItemsFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_WISHLIST_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

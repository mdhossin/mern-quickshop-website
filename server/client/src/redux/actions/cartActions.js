import axios from "axios";
import { BASE_URL } from "../../config";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants//cartConstants";

// Add to Cart
export const addItemsToCart =
  (id, quantity, addToast) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);

      dispatch({
        type: ADD_TO_CART,
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
        addToast("Added To Cart", { appearance: "success", autoDismiss: true });
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
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
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

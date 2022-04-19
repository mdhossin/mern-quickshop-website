import axios from "axios";
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  ALL_PRODUCTS_LOADING,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
} from "../constants/productConstants";

// create product action
export const createProduct =
  (product, navigate, addToast) => async (dispatch, getState) => {
    const token = getState().userLogin?.userInfo?.access_token;
    console.log(product, "product action");
    try {
      dispatch({
        type: CREATE_PRODUCT_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await axios.post("/api/products", product, config);

      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data,
      });
      addToast(data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      navigate("/dashboard/products");
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// update product action and reuse constants from create product
export const updateProduct =
  (product, id, addToast) => async (dispatch, getState) => {
    const token = getState().userLogin?.userInfo?.access_token;
    try {
      dispatch({
        type: CREATE_PRODUCT_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await axios.put(`/api/products/${id}`, product, config);

      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data,
      });

      addToast(data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch({
        type: CREATE_PRODUCT_RESET,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// delete product from DB
export const deleteProduct = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get All Products
export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_LOADING });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

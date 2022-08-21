import axios from "axios";
import { BASE_URL } from "../../config";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_LOADING,
  ALL_PRODUCTS_SUCCESS,
  FETCH_SHOP_PRODUCTS_FAIL,
  FETCH_SHOP_PRODUCTS_LOADING,
  FETCH_SHOP_PRODUCTS_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  PRODUCT_BY_ID_FAIL,
  PRODUCT_BY_ID_REQUEST,
  PRODUCT_BY_ID_SUCCESS,
} from "../constants/productConstants";

// get product by id from DB
export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_BY_ID_REQUEST,
    });

    const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
    dispatch({
      type: PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    // console.log(error);
  }
};

// Get All Products
export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_LOADING });

    const { data } = await axios.get(`${BASE_URL}/api/products`);

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

// fetch all products from for shop page
export const fetchShopProducts =
  (page = 1, category, sort, search) =>
  async (dispatch) => {
    try {
      dispatch({
        type: FETCH_SHOP_PRODUCTS_LOADING,
      });
      const { data } = await axios.get(
        `${BASE_URL}/api/shop/products?${category}&${sort}&name[regex]=${search}`
      );

      dispatch({
        type: FETCH_SHOP_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_SHOP_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      // console.log(error);
    }
  };

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch, getState) => {
  try {
    const token = getState().userLogin?.userInfo?.access_token;
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const { data } = await axios.put(
      `${BASE_URL}/api/review`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

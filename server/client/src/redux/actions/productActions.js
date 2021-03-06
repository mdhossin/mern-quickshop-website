import axios from "axios";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_LOADING,
  ALL_PRODUCTS_SUCCESS,
  FETCH_SHOP_PRODUCTS_FAIL,
  FETCH_SHOP_PRODUCTS_LOADING,
  FETCH_SHOP_PRODUCTS_SUCCESS,
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

    const { data } = await axios.get(
      `https://mern-quickshop-app-ecommerce.herokuapp.com/api/products/${id}`
    );
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

    const { data } = await axios.get(
      "https://mern-quickshop-app-ecommerce.herokuapp.com/api/products"
    );

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
        `https://mern-quickshop-app-ecommerce.herokuapp.com/api/shop/products?${category}&${sort}&name[regex]=${search}`
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

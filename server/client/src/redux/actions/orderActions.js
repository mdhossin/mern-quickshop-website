import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";
import axios from "axios";
import { BASE_URL } from "../../config";

// Create Order action
export const createOrder = (order, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/api/order/new`,
      order,
      config
    );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    localStorage.removeItem("cartItems");
    window.location.href = "/success";
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch, getState) => {
  try {
    const token = getState().userLogin?.userInfo?.access_token;

    dispatch({ type: MY_ORDERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/order/me`, config);

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    const token = getState().userLogin?.userInfo?.access_token;

    dispatch({ type: ORDER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/order/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

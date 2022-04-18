import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
import { checkTokenExp } from "../../utils/checkTokenExp";

// user login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://mern-quickshop-ecommerce.herokuapp.com/api/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    // set the firtlogin true when the user first login
    localStorage.setItem("logged", "quickshop");
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// user registration action
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://mern-quickshop-ecommerce.herokuapp.com/api/register",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// refresh token action
export const refreshToken = () => async (dispatch) => {
  const logged = localStorage.getItem("logged");
  if (logged !== "quickshop") return;

  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      "https://mern-quickshop-ecommerce.herokuapp.com/api/refresh_token",
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    localStorage.removeItem("logged");
  }
};

// user logout action
export const logout = (token) => async (dispatch) => {
  const result = await checkTokenExp(token, dispatch);
  const access_token = result ? result : token;

  try {
    localStorage.removeItem("logged");
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    };

    const { data } = await axios.get(
      "https://mern-quickshop-ecommerce.herokuapp.com/api/logout",
      config
    );

    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

// user google login

export const googleLogin = (id_token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: id_token,
      },
    };

    const { data } = await axios.post(
      "https://mern-quickshop-ecommerce.herokuapp.com/api/google_login",
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("logged", "quickshop");
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// user list for admin
export const userList = () => async (dispatch, getState) => {
  const token = getState().userLogin?.userInfo?.access_token;
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/api/admin/users`, config);
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

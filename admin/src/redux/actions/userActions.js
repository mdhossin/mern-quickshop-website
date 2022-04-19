import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
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
      "/api/login",
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

    const { data } = await axios.get("/api/refresh_token", config);
    // console.log(data, "refresh token action");

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
export const logout = (token, navigate) => async (dispatch) => {
  const result = await checkTokenExp(token, dispatch);
  // console.log("logout action ", result, token);
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

    const { data } = await axios.get("/api/logout", config);
    // console.log(data, access_token, "logout action");

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
  console.log(id_token);
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

    const { data } = await axios.post("/api/google_login", config);
    console.log(data, " data");

    // const res = await postAPI('google_login', { id_token })

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

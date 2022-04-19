import jwt_decode from "jwt-decode";

import axios from "axios";
import { USER_LOGIN_SUCCESS } from "../redux/constants/userConstants";

export const checkTokenExp = async (token, dispatch) => {
  const decoded = jwt_decode(token);
  console.log(decoded, "decoded");

  if (decoded.exp >= Date.now() / 1000) return;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await axios.get(
    "https://mern-quickshop-web-app.herokuapp.com/api/refresh_token",
    config
  );

  dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
  return res.data.access_token;
};

import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_LOADING,
  ALL_CATEGORIES_SUCCESS,
} from "../constants/categoryConstants";
import axios from "axios";
import { BASE_URL } from "../../config";

// Get All categories
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_LOADING });
    // http://localhost:5000/api/category
    const { data } = await axios.get(`${BASE_URL}/api/category`);

    dispatch({
      type: ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

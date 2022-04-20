import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_LOADING,
  ALL_CATEGORIES_SUCCESS,
} from "../constants/categoryConstants";
import axios from "axios";

// Get All categories
export const getAllCategories = () => async (dispatch) => {
  try {
    console.log("category action");
    dispatch({ type: ALL_CATEGORIES_LOADING });

    const { data } = await axios.get("/api/category");

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

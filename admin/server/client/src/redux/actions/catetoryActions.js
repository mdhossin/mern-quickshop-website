import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_LOADING,
  ALL_CATEGORIES_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
} from "../constants/categoryConstants";
import axios from "axios";
import { BASE_URL } from "../../config";

// create category action
export const createCategory = (category) => async (dispatch, getState) => {
  const token = getState().userLogin?.userInfo?.access_token;

  try {
    dispatch({
      type: CREATE_CATEGORY_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/category`,
      { name: category },
      config
    );

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// create category action
export const updateCategory = (category, id) => async (dispatch, getState) => {
  const token = getState().userLogin?.userInfo?.access_token;

  try {
    dispatch({
      type: CREATE_CATEGORY_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/api/category/${id}`,
      { name: category },
      config
    );

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get All categories
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_LOADING });

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

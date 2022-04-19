import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_SUCCESS,
  ALL_CATEGORIES_LOADING,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
} from "../constants/categoryConstants";

// create and update product action
export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };

    case CREATE_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_CATEGORY_RESET:
      return {};

    default:
      return state;
  }
};

// get all product
export const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_CATEGORIES_LOADING:
      return {
        loading: true,
        ...state,
      };
    case ALL_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case ALL_CATEGORIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

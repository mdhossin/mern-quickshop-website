import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_LOADING,
  ALL_CATEGORIES_SUCCESS,
} from "../constants/categoryConstants";

// get all cateogry
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

import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_LOADING,
  ALL_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_SUCCESS,
} from "../constants/productConstants";

// create and update product action
export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};
const initState = {
  products: [],
};

// get all product
export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_LOADING:
      return {
        loading: true,
        ...state,
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

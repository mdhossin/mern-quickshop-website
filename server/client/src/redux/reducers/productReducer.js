import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_LOADING,
  ALL_PRODUCTS_SUCCESS,
  PRODUCT_BY_ID_FAIL,
  PRODUCT_BY_ID_REQUEST,
  PRODUCT_BY_ID_RESET,
  PRODUCT_BY_ID_SUCCESS,
} from "../constants/productConstants";

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

export const productByIdReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_BY_ID_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case PRODUCT_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

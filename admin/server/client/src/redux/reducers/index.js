import { combineReducers } from "redux";

import { categoryReducer, createCategoryReducer } from "./categoryReducer";
import {
  allOrdersReducer,
  orderDetailsReducer,
  orderReducer,
} from "./orderReducer";
import {
  createProductReducer,
  deleteReviewReducer,
  getAllProductReviewsReducer,
  productReducer,
} from "./productReducers";
import {
  userListReducer,
  userLoginReducer,
  userLogoutReducer,
} from "./userReducer";

export default combineReducers({
  userLogin: userLoginReducer,
  userLogout: userLogoutReducer,
  createProduct: createProductReducer,
  createCategory: createCategoryReducer,
  allProducts: productReducer,
  allCategories: categoryReducer,
  userList: userListReducer,
  allOrders: allOrdersReducer,
  // update order reducer
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  getAllProductReviews: getAllProductReviewsReducer,
  deleteReview: deleteReviewReducer,
});

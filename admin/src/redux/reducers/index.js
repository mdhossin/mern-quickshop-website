import { combineReducers } from "redux";

import { categoryReducer, createCategoryReducer } from "./categoryReducer";
import { createProductReducer, productReducer } from "./productReducers";
import { userLoginReducer, userLogoutReducer } from "./userReducer";

export default combineReducers({
  userLogin: userLoginReducer,

  userLogout: userLogoutReducer,

  createProduct: createProductReducer,
  createCategory: createCategoryReducer,
  allProducts: productReducer,
  allCategories: categoryReducer,
});

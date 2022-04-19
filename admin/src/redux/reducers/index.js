import { combineReducers } from "redux";
import { createProductReducer, productReducer } from "./productReducers";
import { userLoginReducer, userLogoutReducer } from "./userReducer";

export default combineReducers({
  userLogin: userLoginReducer,

  userLogout: userLogoutReducer,

  createProduct: createProductReducer,
  allProducts: productReducer,
});

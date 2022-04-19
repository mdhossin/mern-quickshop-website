import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { productByIdReducer, productReducer } from "./productReducer";
import {
  userLoginReducer,
  userLogoutReducer,
  userRegisterReducer,
} from "./userReducer";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userLogout: userLogoutReducer,
  allProducts: productReducer,
  productById: productByIdReducer,
  cart: cartReducer,
});

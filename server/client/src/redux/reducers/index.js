import { combineReducers } from "redux";
import {
  userLoginReducer,
  userLogoutReducer,
  userRegisterReducer,
} from "./userReducer";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userLogout: userLogoutReducer,
});

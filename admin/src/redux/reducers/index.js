import { combineReducers } from "redux";
import { userLoginReducer, userLogoutReducer } from "./userReducer";

export default combineReducers({
  userLogin: userLoginReducer,

  userLogout: userLogoutReducer,
});

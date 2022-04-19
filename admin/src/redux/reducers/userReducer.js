import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_RESET,
  USER_LOGOUT_SUCCESS,
} from "../constants/userConstants";

// user login action
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LOGIN_RESET:
      return {};

    default:
      return state;
  }
};

// user register action
export const userLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        userLogout: action.payload,
      };

    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT_RESET:
      return {};

    default:
      return state;
  }
};

// only for admin
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

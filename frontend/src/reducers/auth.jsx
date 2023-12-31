import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  email: "",
  firstName:"",
  lastName:"",
};

// eslint-disable-next-line react-refresh/only-export-components
export default function (state = initialState, action) {
  const { type,payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        email: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        email: "",
      };
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return state;
    default:
      return state;
  }
}

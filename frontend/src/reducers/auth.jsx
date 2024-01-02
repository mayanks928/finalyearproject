import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  email: "",
  firstName: "",
  lastName: "",
};

// eslint-disable-next-line react-refresh/only-export-components
export default function (state = initialState, action) {
  const { type, authentication_payload,userData_payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: authentication_payload,
        email:userData_payload.email,
        firstName:userData_payload.first_name,
        lastName:userData_payload.last_name,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: authentication_payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        email: "",
        firstName:"",
        lastName:"",
      };
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return state;
    default:
      return state;
  }
}

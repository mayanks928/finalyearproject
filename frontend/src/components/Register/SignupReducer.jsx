/* eslint-disable no-case-declarations */
/* eslint-disable no-prototype-builtins */
import {
  CREATE_USER_ERROR,
  CREATE_USER_SUBMITTED,
  CREATE_USER_SUCCESS,
} from "./SignupTypes";

// define the initial state of the signup store
const initialState = {
  emailError: "",
  passwordError: "",
  isSubmitted: false,
};

// define how action will change the state of the store
export const SignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_SUBMITTED:
      return {
        emailError: "",
        passwordError: "",
        isSubmitted: true,
      };
    case CREATE_USER_ERROR:
      const errorState = {
        emailError: "",
        passwordError: "",
        isSubmitted: false,
      };
      if (action.errorData.hasOwnProperty("email")) {
        errorState.emailError = action.errorData["email"];
      }
      if (action.errorData.hasOwnProperty("password")) {
        errorState.passwordError = action.errorData["password"];
      }
      return errorState;
    case CREATE_USER_SUCCESS:
      return {
        emailError: "",
        passwordError: "",
        isSubmitted: false,
      };
    default:
      return state;
  }
};

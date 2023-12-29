import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// import new reducer
import { SignupReducer } from "./Register/SignupReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: SignupReducer 
  });

export default createRootReducer;
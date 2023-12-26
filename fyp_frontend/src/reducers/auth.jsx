import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState={
    isAuthenticated:null,
    email:'',
    first_name:'',
    last_name:''
};

// eslint-disable-next-line react-refresh/only-export-components
export default function(state=initialState,action){
  const {type} = action;

  switch(type){
    case REGISTER_SUCCESS:
        return{
            ...state,
            isAuthenticated:false,
        }
    case REGISTER_FAIL:
        return state
    default:
        return state
  }
}

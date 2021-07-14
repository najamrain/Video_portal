import { LOGIN_SUCCESS, LOGOUT } from "../types";

const intialState = {
  isLoggedIn: false,
  user: null,
}

export default (state = intialState, action) => {

  switch (action.type) {
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }

    case LOGOUT:
      return {};

    default:
      return state;
  }
}
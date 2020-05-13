import { AUTHENTICATE, SET_DID_TRY_AL, LOGOUT } from "../types";

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true
      }
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
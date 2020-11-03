import authActionTypes from "./authActionTypes";

const initialState = {
  currentUser: null,
  error: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        error: null,
      };

    case authActionTypes.LOGIN_USER_FAILED:
      return {
        ...state,
        currentUser: null,
        error: payload,
      };

    case authActionTypes.LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;

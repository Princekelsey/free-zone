import authActionTypes from "./authActionTypes";

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authActionTypes.LOGIN_USER_START:
    case authActionTypes.SIGN_UP_USER_START:
      return {
        ...state,
        isLoading: true,
      };

    case authActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        error: null,
        isLoading: false,
      };

    case authActionTypes.LOGIN_USER_FAILED:
      return {
        ...state,
        currentUser: null,
        error: payload,
        isLoading: false,
      };

    case authActionTypes.LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
        error: null,
      };

    case authActionTypes.LOGOUT_FAILED:
      return {
        ...state,
        error: payload,
      };

    case authActionTypes.SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        error: null,
        isLoading: false,
      };

    case authActionTypes.SIGN_UP_USER_FAILED:
      return {
        ...state,
        currentUser: null,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;

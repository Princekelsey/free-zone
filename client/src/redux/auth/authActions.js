import authActionTypes from "./authActionTypes";

export const loginStart = (request) => ({
  type: authActionTypes.LOGIN_USER_START,
  payload: request,
});

export const loginSuccess = (user) => ({
  type: authActionTypes.LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginFailed = (error) => ({
  type: authActionTypes.LOGIN_USER_FAILED,
  payload: error,
});

export const checkUserSession = () => ({
  type: authActionTypes.CHECK_SESSION,
});

export const logoutUser = () => ({
  type: authActionTypes.LOGOUT_START,
});

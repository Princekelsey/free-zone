import { takeLatest, put, all, call } from "redux-saga/effects";
import Server from "../../api/Server";
import authActionTypes from "./authActionTypes";
import Cookies from "js-cookie";
import { loginSuccess, loginFailed } from "./authActions";
import { Toast } from "../../utils/toast";

function* loginUser({ payload }) {
  try {
    const { data } = yield call(Server.signInUser, payload);
    Cookies.set("refreshToken", data.token, { expires: 7 });
    const response = yield call(Server.getCurrentUser, data.token);
    yield put(loginSuccess(response.data.data));
  } catch (error) {
    const {
      response: { data },
    } = error;
    if (data) {
      Toast.fire({
        type: "error",
        title: data.error,
        icon: "error",
      });
    } else {
      Toast.fire({
        type: "error",
        title: "Login failed. Please try again",
        icon: "error",
      });
    }
    yield put(loginFailed(error));
  }
}

function* getCurrentUser() {
  const token = Cookies.get("refreshToken");
  try {
    const { data } = yield call(Server.getCurrentUser, token);
    yield put(loginSuccess(data.data));
  } catch (error) {
    yield put(loginFailed(error));
  }
}

function* logoutUser() {
  try {
    Cookies.remove("refreshToken");
    yield put({ type: authActionTypes.LOGOUT_USER });
  } catch (error) {
    yield put({ type: authActionTypes.LOGOUT_FAILED, payload: error });
  }
}

function* onLoginUserStart() {
  yield takeLatest(authActionTypes.LOGIN_USER_START, loginUser);
}

function* onCheckUserSessionStart() {
  yield takeLatest(authActionTypes.CHECK_SESSION, getCurrentUser);
}

function* onLogoutStart() {
  yield takeLatest(authActionTypes.LOGOUT_START, logoutUser);
}

export function* authSagas() {
  yield all([
    call(onLoginUserStart),
    call(onCheckUserSessionStart),
    call(onLogoutStart),
  ]);
}

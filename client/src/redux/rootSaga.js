import { all, call } from "redux-saga/effects";
import { authSagas } from "./auth/authSaga";
import { consultantsSagas } from "./consultants/consultantsSaga";

export default function* rootSaga() {
  yield all([call(consultantsSagas), call(authSagas)]);
}

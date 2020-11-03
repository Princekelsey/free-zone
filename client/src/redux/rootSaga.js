import { all, call } from "redux-saga/effects";
import { consultantsSagas } from "./consultants/consultantsSaga";

export default function* rootSaga() {
  yield all([call(consultantsSagas)]);
}

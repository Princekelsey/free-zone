import { takeLatest, put, all, call } from "redux-saga/effects";
import Server from "../../api/Server";
import consultantsActionTypes from "./consultantsActionTypes";
import {
  getConsultantsFailed,
  getConsultantsSuccess,
} from "./consultantsActions";

function* getAllConsultants() {
  try {
    const response = yield call(Server.getAllConsultants);
    yield put(getConsultantsSuccess(response.data.data));
  } catch (error) {
    yield put(getConsultantsFailed(error.response.data.error));
  }
}

function* getAllConsultantsStart() {
  yield takeLatest(
    consultantsActionTypes.GET_ALL_CONSULTANTS_START,
    getAllConsultants
  );
}

export function* consultantsSagas() {
  yield all([call(getAllConsultantsStart)]);
}

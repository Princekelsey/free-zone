import consultantsActionTypes from "./consultantsActionTypes";

export const getAllConsultants = () => ({
  type: consultantsActionTypes.GET_ALL_CONSULTANTS_START,
});

export const getConsultantsSuccess = (consultants) => ({
  type: consultantsActionTypes.GET_ALL_CONSULTANTS_SUCCESS,
  payload: consultants,
});

export const getConsultantsFailed = (error) => ({
  type: consultantsActionTypes.GET_ALL_CONSULTANTS_FAILED,
  payload: error,
});

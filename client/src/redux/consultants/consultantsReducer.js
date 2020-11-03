import consultantsActionTypes from "./consultantsActionTypes";

const initialState = {
  consultants: [],
  error: null,
};

const consultantsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case consultantsActionTypes.GET_ALL_CONSULTANTS_SUCCESS:
      return {
        ...state,
        consultants: payload,
      };

    case consultantsActionTypes.GET_ALL_CONSULTANTS_FAILED:
      return {
        ...state,
        consultants: [],
        error: payload,
      };

    default:
      return state;
  }
};

export default consultantsReducer;

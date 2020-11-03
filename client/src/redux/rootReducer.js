import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import consultantsReducer from "./consultants/consultantsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  consultants: consultantsReducer,
});

export default rootReducer;

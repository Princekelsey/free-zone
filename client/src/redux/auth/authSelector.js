import { createSelector } from "reselect";

const userSelector = (state) => state.auth;

export const selectCurrentUser = createSelector(
  [userSelector],
  (auth) => auth.currentUser
);

import { createSelector } from "reselect";

const consultantSelector = (state) => state.consultants;

export const selectConsultant = createSelector(
  [consultantSelector],
  (consultants) => consultants.consultants
);

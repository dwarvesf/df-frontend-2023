import * as actionTypes from "./actionTypes";

export const createContextActions = (dispatch) => {
  return {
    navDashboard: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_NAV_DASHBOARD });
      },
      collapse: () => {
        dispatch({ type: actionTypes.COLLAPSE_NAV_DASHBOARD});
      },
    },
  };
};
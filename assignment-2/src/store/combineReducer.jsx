import * as actionTypes from "./actionTypes";

export const initialState = {
  isNavDashboardActive: false,
};

export function combineReducer(state, action) {
  switch (action.type) {
    case actionTypes.COLLAPSE_NAV_DASHBOARD:
      return {
        ...state,
        isNavDashboardActive: true,
      };
    case actionTypes.OPEN_NAV_DASHBOARD:
      return {
        ...state,
        isNavDashboardActive: false,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

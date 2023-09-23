import { createContext, useContext, useReducer, useMemo } from "react";
import { combineReducer, initialState } from "./combineReducer";
import { createContextActions } from "./contextActions";

const AppContext = createContext();

//! Provider wrap Application
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(combineReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("StoreProvider that needed to use!");
  }
  const [state, dispatch] = context;
  const contextActions = createContextActions(dispatch);
  return { state, contextActions };
}
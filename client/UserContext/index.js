import React from "react";
import { reducer, ActionTypes } from "./reducer";

const initialContext = {
  user:
    typeof window !== "undefined"
      ? sessionStorage.getItem("jwt")
        ? JSON.parse(sessionStorage.getItem("jwt")).users
        : null
      : null,
  login:
    typeof window !== "undefined"
      ? sessionStorage.getItem("jwt")
        ? true
        : false
      : null,
};

const StateContext = React.createContext(initialContext);
const DispatchContext = React.createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialContext);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useUIState = () => {
  return React.useContext(StateContext);
};

export const useUIDispatch = () => {
  const dispatch = React.useContext(DispatchContext);

  // if (dispatch === undefined) {
  //   throw new Error("useBookingDispatch must be used within a BookingProvider");
  // }

  const add = React.useCallback(
    (user) => {
      dispatch({ type: ActionTypes.ADD, payload: user });
    },
    [dispatch]
  );

  const login = React.useCallback(() => {
    dispatch({ type: ActionTypes.LOGIN });
  }, [dispatch]);

  const logout = React.useCallback(() => {
    dispatch({ type: ActionTypes.LOGOUT });
  }, [dispatch]);

  return React.useMemo(
    () => ({
      add,
      login,
      logout,
    }),
    [dispatch]
  );
};

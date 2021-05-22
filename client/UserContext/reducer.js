export const ActionTypes = {
  ADD: "ADD",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.LOGIN:
      return {
        ...state,
        login: true,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        login: false,
      };
    default:
      return state;
  }
};

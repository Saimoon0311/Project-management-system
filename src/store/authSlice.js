const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const logout = () => ({ type: "LOGOUT" });

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case "LOGIN_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT":
      return { ...initialState, loading: false };
    default:
      return state;
  }
};

export default authReducer;

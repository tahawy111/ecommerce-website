const { loginSuccess, loginFailure } = require("../slices/authSlice");
export const isUserLoggedIn = (dispatch) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token) {
    dispatch(loginSuccess({ token, user: JSON.parse(user) }));
  } else {
    dispatch(loginFailure({ authenticate: false, error: "Failed to login" }));
  }
};

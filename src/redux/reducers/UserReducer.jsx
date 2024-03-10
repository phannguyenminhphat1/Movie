import { USER_LOGIN, USER_LOGIN_ERROR, USER_LOGOUT } from "../types/UserType";

let user = null;
let accessToken = null;
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
if (localStorage.getItem("accessToken")) {
  accessToken = JSON.parse(localStorage.getItem("accessToken"));
}

const stateDefault = {
  userLogin: user,
  loginError: null,
};
export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      const { dataLogin } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(dataLogin));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(dataLogin.accessToken)
      );

      state.userLogin = dataLogin;
      state.loginError = null;
      return { ...state };
    }
    case USER_LOGIN_ERROR: {
      state.loginError = action.err;
      return { ...state };
    }
    case USER_LOGOUT: {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem("accessToken");
      state.userLogin = null;
      state.accessToken = null;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

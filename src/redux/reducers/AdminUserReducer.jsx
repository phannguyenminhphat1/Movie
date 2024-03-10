import { GET_USERS } from "../types/UserType";

const stateDefault = {
  users: [],
};
export const AdminUserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_USERS: {
      state.users = action.users;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

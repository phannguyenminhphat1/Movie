import { HIDE_LOADING, SHOW_LOADING } from "../types/LoadingType";

const stateDefault = {
  isLoading: false,
};

export const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SHOW_LOADING: {
      state.isLoading = true;
      console.log("IsLoading: ", state.isLoading);
      return { ...state };
    }
    case HIDE_LOADING: {
      state.isLoading = false;
      console.log("IsLoading: ", state.isLoading);

      return { ...state };
    }

    default:
      return { ...state };
  }
};

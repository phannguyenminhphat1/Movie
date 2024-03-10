import { HIDE_LOADING, SHOW_LOADING } from "../types/LoadingType";

export const ShowLoadingAction = () => {
  return (dispatch) => {
    dispatch({
      type: SHOW_LOADING,
    });
  };
};
export const HideLoadingAction = () => {
  return (dispatch) => {
    dispatch({
      type: HIDE_LOADING,
    });
  };
};

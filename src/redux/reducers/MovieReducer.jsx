import { GET_MOVIE, PHIM_DANG_CHIEU, PHIM_SAP_CHIEU } from "../types/MovieType";

const stateDefault = {
  arrMovie: [],
  isShowing: false,
  isUpComming: false,
  arrMovieDefault: [],
};

export const MovieReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_MOVIE: {
      state.arrMovie = action.movies;
      state.arrMovieDefault = state.arrMovie;
      return { ...state };
    }
    case PHIM_DANG_CHIEU: {
      state.isUpComming = false;
      state.isShowing = !state.isShowing;
      state.arrMovie = state.arrMovieDefault.filter(
        (item) => item.dangChieu === state.isShowing
      );
      return { ...state };
    }
    case PHIM_SAP_CHIEU: {
      state.isShowing = false;
      state.isUpComming = !state.isUpComming;
      state.arrMovie = state.arrMovieDefault.filter(
        (item) => item.sapChieu === state.isUpComming
      );
      return { ...state };
    }

    default:
      return { ...state };
  }
};

import {
  GET_MOVIE_SHOWTIME_DETAIL,
  GET_MOVIE_SYSTEM,
} from "../types/MovieType";

const stateDefault = {
  arrMovieComplex: [],
  flimDetails: {},
};

export const MovieComplexReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_MOVIE_SYSTEM: {
      state.arrMovieComplex = action.movieSystems;
      return { ...state };
    }
    case GET_MOVIE_SHOWTIME_DETAIL: {
      state.flimDetails = action.movieDetail;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

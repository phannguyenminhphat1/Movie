import {
  ADMIN_GET_MOVIE_DETAIL,
  ADMIN_GET_MOVIE_DETAIL_ERR,
  CREATE_MOVIE,
  CREATE_MOVIE_ERROR,
  ADMIN_CLEAR_MOVIE_DETAIL,
} from "../types/AdminMovieType";

const stateDefault = {
  createMovie: {},
  createMovieError: null,
  editMovieDetails: {},
  editMovieDetailsError: null,
};
export const AdminMovieReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case CREATE_MOVIE: {
      return { ...state };
    }
    case CREATE_MOVIE_ERROR: {
      state.createMovieError = action.err;
      return { ...state };
    }
    case ADMIN_GET_MOVIE_DETAIL: {
      state.editMovieDetails = action.data;
      return { ...state };
    }
    case ADMIN_GET_MOVIE_DETAIL_ERR: {
      state.editMovieDetailsError = action.err;
      return { ...state };
    }
    case ADMIN_CLEAR_MOVIE_DETAIL: {
      state.editMovieDetails = {};
      return { ...state };
    }

    default:
      return { ...state };
  }
};

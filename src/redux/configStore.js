import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { BannerReducer } from "./reducers/BannerReducer";
import { MovieReducer } from "./reducers/MovieReducer";
import { MovieComplexReducer } from "./reducers/MovieComplexReducer";
import { UserReducer } from "./reducers/UserReducer";
import { BookingTicketReducer } from "./reducers/BookingTicketReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { AdminMovieReducer } from "./reducers/AdminMovieReducer";
import { AdminUserReducer } from "./reducers/AdminUserReducer";

const rootReducer = combineReducers({
  BannerReducer,
  MovieReducer,
  MovieComplexReducer,
  UserReducer,
  BookingTicketReducer,
  LoadingReducer,
  AdminMovieReducer,
  AdminUserReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

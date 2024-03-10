import { GET_BANNER } from "../types/MovieType";

const stateDefault = {
  arrBanner: [],
};

export const BannerReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_BANNER: {
      state.arrBanner = action.banners;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

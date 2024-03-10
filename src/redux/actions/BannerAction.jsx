import baseAPI from "../../apis/baseAPI";
import { GET_BANNER } from "../types/MovieType";

export const GetBannerAction = () => {
  return async (dispatch) => {
    try {
      const result = await baseAPI.get("/QuanLyPhim/LayDanhSachBanner");
      dispatch({
        type: GET_BANNER,
        banners: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

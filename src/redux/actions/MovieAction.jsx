import baseAPI from "../../apis/baseAPI";
import { GET_MOVIE, PHIM_DANG_CHIEU, PHIM_SAP_CHIEU } from "../types/MovieType";

export const GetMovieAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      if (tenPhim.trim() !== "") {
        const result = await baseAPI.get(
          `/QuanLyPhim/LayDanhSachPhim?maNhom=GP03&tenPhim=${tenPhim}`
        );
        dispatch({
          type: GET_MOVIE,
          movies: result.data.content,
        });
      } else {
        const result = await baseAPI.get(
          "/QuanLyPhim/LayDanhSachPhim?maNhom=GP03"
        );
        dispatch({
          type: GET_MOVIE,
          movies: result.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const GetMovieActionSearch = async () => {
  try {
    const result = await baseAPI.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP03");
    return result.data.content;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

export const IsShowingMovieAction = () => {
  return (dispatch) => {
    dispatch({
      type: PHIM_DANG_CHIEU,
    });
  };
};
export const UpComingMovieAction = () => {
  return (dispatch) => {
    dispatch({
      type: PHIM_SAP_CHIEU,
    });
  };
};

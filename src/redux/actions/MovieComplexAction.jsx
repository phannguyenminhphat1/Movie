import baseAPI from "../../apis/baseAPI";
import {
  GET_MOVIE_SHOWTIME_DETAIL,
  GET_MOVIE_SYSTEM,
} from "../types/MovieType";

export const MovieComplexAction = () => {
  return async (dispatch) => {
    try {
      const result = await baseAPI.get(
        "/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03"
      );
      dispatch({
        type: GET_MOVIE_SYSTEM,
        movieSystems: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetMovieShowtimeAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await baseAPI.get(
        `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
      );
      dispatch({
        type: GET_MOVIE_SHOWTIME_DETAIL,
        movieDetail: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const GetMovieShowtimeSearchAction = async (maPhim) => {
  try {
    const result = await baseAPI.get(
      `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
    return result.data.content;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

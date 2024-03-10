import baseAPI from "../../apis/baseAPI";
import { GET_USERS } from "../types/UserType";

export const AdminGetUsersAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      if (tuKhoa.trim() !== "") {
        const result = await baseAPI.get(
          `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00&tuKhoa=${tuKhoa}`
        );
        dispatch({
          type: GET_USERS,
          users: result.data.content,
        });
      } else {
        const result = await baseAPI.get(
          "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00"
        );
        dispatch({
          type: GET_USERS,
          users: result.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const AdminCreateUserAction = async (user) => {
  try {
    const res = await baseAPI.post("/QuanLyNguoiDung/ThemNguoiDung", user);
    return res;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

export const AdminGetInfoUserAction = async (taiKhoan) => {
  try {
    const res = await baseAPI.post(
      `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
    );
    return res;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};
export const AdminEditUserAction = async (user) => {
  try {
    const res = await baseAPI.post(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      user
    );
    return res;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

export const AdminDeleteUserAction = async (taiKhoan) => {
  try {
    const res = await baseAPI.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
    return res;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

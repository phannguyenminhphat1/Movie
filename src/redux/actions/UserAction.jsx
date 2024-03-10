import baseAPI from "../../apis/baseAPI";
import { USER_LOGIN, USER_LOGIN_ERROR, USER_LOGOUT } from "../types/UserType";
import Swal from "sweetalert2";

export const LoginAction = (credentials) => {
  return async (dispatch) => {
    try {
      const result = await baseAPI.post(
        "/QuanLyNguoiDung/DangNhap",
        credentials
      );
      if (result.data.statusCode === 200) {
        dispatch({
          type: USER_LOGIN,
          dataLogin: result.data.content,
        });
        Swal.fire({
          title: "Đăng nhập thành công",
          icon: "success",
        });
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_ERROR,
        err: error.response.data.content,
      });
    }
  };
};
export const LogoutAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGOUT,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const RegisterAction = async (credentials) => {
  try {
    const result = await baseAPI.post("/QuanLyNguoiDung/DangKy", credentials);
    return result;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

export const GetUserInfoAction = async () => {
  try {
    const result = await baseAPI.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
    return result;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

export const UpdateUserInfoAction = async (user) => {
  try {
    const result = await baseAPI.put(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      user
    );
    return result;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.content;
    }
    throw error;
  }
};

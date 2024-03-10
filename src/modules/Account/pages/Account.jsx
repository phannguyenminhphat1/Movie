import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUserInfoAction,
  UpdateUserInfoAction,
} from "../../../redux/actions/UserAction";
import moment from "moment";
import "moment/locale/vi";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import {
  HideLoadingAction,
  ShowLoadingAction,
} from "../../../redux/actions/LoadingAction";
import Swal from "sweetalert2";

const validationSchema = object({
  taiKhoan: string().required("Tài khoản không được trống !!"),
  matKhau: string()
    .required("Mật khẩu không được trống !!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu phải có ít nhất 8 ký tự, 1 ký tự in hoa, 1 ký tự thường và 1 số"
    ),
  email: string()
    .required("Email không được trống !!")
    .email("Email không đúng định dạng"),
  soDT: string()
    .required("Số điện thoại không được trống !!")
    .matches(
      /^(0[1-9][0-9]{8}|84[1-9][0-9]{7})$/,
      "Không đúng định dạng số điện thoại"
    ),
  hoTen: string()
    .required("Họ tên không được trống !!")
    .matches(
      /^[a-zA-Z ]{4,20}$/,
      "Họ tên phải ít nhất 4 ký tự và không bao gồm số"
    ),
});

export default function Account() {
  const { userLogin } = useSelector((state) => state.UserReducer);
  const [userInfo, setUserInfo] = useState({});
  const [userType, setUserType] = useState("");
  const [isShowingAccountInfo, setIsShowingAccountInfo] = useState(true);
  const [isShowingHistory, setIsShowingHistory] = useState(false);
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      hoTen: "",
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserInfo();
    return () => {
      dispatch(HideLoadingAction());
    };
  }, []);

  const getUserInfo = async () => {
    try {
      dispatch(ShowLoadingAction());
      const result = await GetUserInfoAction();
      const user = result.data.content;
      setUserInfo(user);
      if (result.data.statusCode === 200) {
        setValue("taiKhoan", result.data.content.taiKhoan);
        setValue("matKhau", result.data.content.matKhau);
        setValue("email", result.data.content.email);
        setValue("soDT", result.data.content.soDT);
        setValue("hoTen", result.data.content.hoTen);
        setUserType(result.data.content.maLoaiNguoiDung);
      }
    } catch (error) {
      dispatch(HideLoadingAction());
    } finally {
      dispatch(HideLoadingAction());
    }
  };

  let checkIsShowingAccountInfo = isShowingAccountInfo ? "activeBtn" : "";
  let checkIsShowingHistory = isShowingHistory ? "activeBtn" : "";

  const handleIsShowingAccountInfo = () => {
    setIsShowingAccountInfo(true);
    setIsShowingHistory(false);
  };
  const handleIsShowingHistory = () => {
    setIsShowingAccountInfo(false);
    setIsShowingHistory(true);
  };

  const handleUpdateUser = async (values) => {
    try {
      const payload = {
        ...values,
        maLoaiNguoiDung: userType,
        maNhom: "GP03",
      };
      dispatch(ShowLoadingAction());
      setErr(null);
      const result = await UpdateUserInfoAction(payload);
      if (result.data.statusCode === 200) {
        Swal.fire({
          title: "Cập nhật thành công",
          icon: "success",
          confirmButtonColor: "OK",
        }).then((res) => {
          if (res.isConfirmed) {
            window.scrollTo(0, 0);
          }
        });
      }
    } catch (error) {
      dispatch(HideLoadingAction());
      setErr(error);
    } finally {
      dispatch(HideLoadingAction());
    }
  };

  const formattedDate = (dateString) => {
    moment.locale("vi");
    const formatted = moment(dateString).format("DD/MM/YYYY, HH:mm A");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const renderTable = () => {
    return userInfo?.thongTinDatVe?.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.tenPhim}</td>
          <td>{item.thoiLuongPhim} phút</td>
          <td>{formattedDate(item.ngayDat)}</td>
          <td>{_.first(item.danhSachGhe).tenHeThongRap}</td>
          <td>{_.first(item.danhSachGhe).tenCumRap}</td>
          <td>{item.maVe}</td>
          <td>
            {_.sortBy(item.danhSachGhe, "tenGhe")
              .map((ghe, indexGhe) => ghe.tenGhe)
              .join(", ")}
          </td>
          <td>{item.giaVe.toLocaleString()}</td>
        </tr>
      );
    });
  };

  return (
    <div className="account">
      <div className="account__content">
        <div className="row">
          <div className="col-sm-3 account__content-left">
            <div className="content__left-img">
              <img
                src={`https://i.pravatar.cc/300?u=${userLogin.taiKhoan}`}
                alt=""
              />
              {/* <h1>Phannguyenminhphat1@gmail.com</h1> */}
            </div>
          </div>
          <div className="col-sm-9 account__content-right">
            <header>
              <div className="content__right-header">
                <button
                  onClick={() => handleIsShowingAccountInfo()}
                  className={`${checkIsShowingAccountInfo}`}
                >
                  THÔNG TIN TÀI KHOẢN
                </button>
                <button
                  onClick={() => handleIsShowingHistory()}
                  className={`${checkIsShowingHistory}`}
                >
                  LỊCH SỬ ĐẶT VÉ
                </button>
              </div>
            </header>
            <div className="content__right-content">
              <div style={{ padding: "24px" }}>
                {isShowingAccountInfo ? (
                  <form onSubmit={handleSubmit(handleUpdateUser)}>
                    <div className="form-group">
                      <label htmlFor="taiKhoan">Tài khoản</label>
                      <input
                        disabled={true}
                        type="text"
                        id="taiKhoan"
                        className="form-control"
                        {...register("taiKhoan")}
                      />
                      {errors.taiKhoan && (
                        <p className="errors">{errors.taiKhoan.message}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="matKhau">Mật khẩu</label>
                      <input
                        type="password"
                        id="matKhau"
                        className="form-control"
                        {...register("matKhau")}
                      />
                      {errors.matKhau && (
                        <p className="errors">{errors.matKhau.message}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="hoTen">Họ và tên</label>
                      <input
                        type="text"
                        id="hoTen"
                        className="form-control"
                        {...register("hoTen")}
                      />
                      {errors.hoTen && (
                        <p className="errors">{errors.hoTen.message}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        id="email"
                        className="form-control"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="errors">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="soDT">Số điện thoại</label>
                      <input
                        type="text"
                        id="soDT"
                        className="form-control"
                        {...register("soDT")}
                      />
                      {errors.soDT && (
                        <p className="errors">{errors.soDT.message}</p>
                      )}
                    </div>
                    {err && (
                      <p style={{ color: "red", marginBottom: "15px" }}>
                        {err}
                      </p>
                    )}

                    <div className="btnCapNhat">
                      <button className="btn btn-primary">Cập nhật</button>
                    </div>
                  </form>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên phim</th>
                          <th>Thời lượng</th>
                          <th>Ngày đặt</th>
                          <th>Tên rạp</th>
                          <th>Mã rạp</th>
                          <th>Mã vé</th>
                          <th>Tên ghế</th>
                          <th>Tổng tiền</th>
                        </tr>
                      </thead>
                      <tbody>{renderTable()}</tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

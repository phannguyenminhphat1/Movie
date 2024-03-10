import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Switch } from "antd";
import { object, string } from "yup";
import moment from "moment";
// import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoadingAction,
  ShowLoadingAction,
} from "../../../../redux/actions/LoadingAction";
import Swal from "sweetalert2";
import { Select } from "antd";
import { AdminCreateUserAction } from "../../../../redux/actions/AdminUserAction";

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

export default function CreateUser() {
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const [selectedUserType, setSelectedUserType] = useState(null);
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const {
    register,
    handleSubmit,
    reset,
    setError,
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

  const onChangeTypeUser = (value) => {
    setSelectedUserType(value);
  };

  const handleCreateUser = async (values) => {
    try {
      const payload = {
        ...values,
        maNhom: "GP03",
        maLoaiNguoiDung: selectedUserType,
      };
      dispatch(ShowLoadingAction());
      setErr(null);
      const result = await AdminCreateUserAction(payload);
      if (result.data.statusCode === 200) {
        Swal.fire({
          title: "Thêm người dùng thành công",
          icon: "success",
          confirmButtonColor: "OK",
        }).then((res) => {
          if (res.isConfirmed) {
            window.scrollTo(0, 0);
            reset();
            setSelectedUserType(null);
          }
        });
      }
      window.scrollTo(0, 0);
      reset();
    } catch (error) {
      dispatch(HideLoadingAction());
      setErr(error);
    } finally {
      dispatch(HideLoadingAction());
    }
  };

  return (
    <div
      className="form__content"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: "25px",
        borderRadius: "5px",
      }}
    >
      <h2 className="text-3xl mb-3 font-semibold">Thêm Người dùng</h2>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="form-group">
          <label className="font-semibold" htmlFor="taiKhoan">
            Tài khoản
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tài khoản"
            id="taiKhoan"
            {...register("taiKhoan")}
          />
          {errors.taiKhoan && (
            <p className="errors">{errors.taiKhoan.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="font-semibold" htmlFor="matKhau">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Nhập mật khẩu"
            id="matKhau"
            {...register("matKhau")}
          />
          {errors.matKhau && <p className="errors">{errors.matKhau.message}</p>}
        </div>
        <div className="form-group">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập email"
            id="email"
            {...register("email")}
          />
          {errors.email && <p className="errors">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label className="font-semibold" htmlFor="soDT">
            Số điện thoại
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập số điện thoại"
            id="soDT"
            {...register("soDT")}
          />
          {errors.soDT && <p className="errors">{errors.soDT.message}</p>}
        </div>
        <div className="form-group">
          <label className="font-semibold" htmlFor="hoTen">
            Họ tên
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập họ tên"
            id="hoTen"
            {...register("hoTen")}
          />
          {errors.hoTen && <p className="errors">{errors.hoTen.message}</p>}
        </div>

        <div className="form-group">
          <label
            className="font-semibold"
            style={{ display: "block" }}
            htmlFor="maLoaiNguoiDung"
          >
            Loại người dùng
          </label>
          <Select
            style={{
              width: "350px",
            }}
            options={[
              {
                label: "Quản trị",
                value: "QuanTri",
              },
              {
                label: "Khách hàng",
                value: "KhachHang",
              },
            ]}
            onChange={onChangeTypeUser}
            placeholder="Chọn loại người dùng"
          />
        </div>

        {err && <p style={{ color: "red", marginBottom: "15px" }}>{err}</p>}

        <button disabled={isLoading} className="btn btn-success">
          Thêm người dùng
        </button>
      </form>
    </div>
  );
}

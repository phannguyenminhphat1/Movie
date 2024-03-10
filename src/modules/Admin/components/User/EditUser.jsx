import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoadingAction,
  ShowLoadingAction,
} from "../../../../redux/actions/LoadingAction";
import Swal from "sweetalert2";
import { Select } from "antd";
import {
  AdminEditUserAction,
  AdminGetInfoUserAction,
} from "../../../../redux/actions/AdminUserAction";
import { useNavigate, useParams } from "react-router-dom";

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
      "Họ tên phải ít nhất 4 ký tự và nhiều nhất 20 ký tự và không bao gồm số"
    ),
});

export default function EditUser() {
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState(null);
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const {
    register,
    handleSubmit,
    setValue,
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
  }, []);

  const onChangeTypeUser = (value) => {
    setSelectedUserType(value);
  };

  const getUserInfo = async () => {
    const result = await AdminGetInfoUserAction(params.id);
    if (result.data.statusCode === 200) {
      setValue("taiKhoan", result.data.content.taiKhoan);
      setValue("matKhau", result.data.content.matKhau);
      setValue("email", result.data.content.email);
      setValue("soDT", result.data.content.soDT);
      setValue("hoTen", result.data.content.hoTen);
      setSelectedUserType(result.data.content.maLoaiNguoiDung);
    }
  };

  const handleEditUser = async (values) => {
    try {
      const payload = {
        ...values,
        maNhom: "GP03",
        maLoaiNguoiDung: selectedUserType,
      };
      dispatch(ShowLoadingAction());
      setErr(null);
      const result = await AdminEditUserAction(payload);
      if (result.data.statusCode === 200) {
        Swal.fire({
          title: "Cập nhật người dùng thành công",
          icon: "success",
          confirmButtonColor: "OK",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/admin/users");
          }
          navigate("/admin/users");
        });
      }
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
      <h2 className="text-3xl mb-3 font-semibold">Cập nhật Người dùng</h2>
      <form onSubmit={handleSubmit(handleEditUser)}>
        <div className="form-group">
          <label className="font-semibold" htmlFor="taiKhoan">
            Tài khoản
          </label>
          <input
            disabled
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
            value={selectedUserType}
            placeholder="Chọn loại người dùng"
          />
        </div>

        {err && <p style={{ color: "red", marginBottom: "15px" }}>{err}</p>}

        <button disabled={isLoading} className="btn btn-primary">
          Cập nhật người dùng
        </button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction } from "../../../redux/actions/UserAction";
import { USER_REGISTER_ERROR } from "../../../redux/types/UserType";
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
  soDt: string()
    .required("Số điện thoại không được trống !!")
    .matches(
      /^(0[1-9][0-9]{8}|84[1-9][0-9]{7})$/,
      "Không đúng định dạng số điện thoại"
    ),
  hoTen: string()
    .required("Họ tên không được trống !!")
    .matches(
      /^[a-zA-Z]{4,20}$/,
      "Họ tên phải ít nhất 4 ký tự và không bao gồm số"
    ),
});

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    return () => {
      dispatch({
        type: USER_REGISTER_ERROR,
        err: "",
      });
    };
  }, []);

  const handleRegister = async (values) => {
    try {
      setIsLoading(true);
      setErr(null);
      const result = await RegisterAction(values);
      if (result.data.statusCode === 200) {
        Swal.fire({
          title: "Đăng ký tài khoản thành công",
          icon: "success",
          confirmButtonColor: "OK",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/auth/login");
          }
          navigate("/auth/login");
        });
      }
    } catch (error) {
      setIsLoading(false);
      setErr(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="register"
      style={{ backgroundImage: `url(/assets/img/bgAuth.jpg)` }}
    >
      <div className="register__content">
        <div className="register__content-form">
          <div className="form__header">
            <Link to="/">
              <i className="fa-solid fa-x"></i>
            </Link>
          </div>
          <div className="form__title">
            <div className="form__icon">
              <i className="fa-solid fa-lock"></i>
            </div>
            <p>ĐĂNG KÍ</p>
          </div>
          <div className="form__content">
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="form-group">
                <label htmlFor="taiKhoan">Tài khoản:</label>
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
                <label htmlFor="matKhau">Mật khẩu:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Nhập mật khẩu"
                  id="matKhau"
                  {...register("matKhau")}
                />
                {errors.matKhau && (
                  <p className="errors">{errors.matKhau.message}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="hoTen">Họ tên:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập họ tên"
                  id="hoTen"
                  {...register("hoTen")}
                />
                {errors.hoTen && (
                  <p className="errors">{errors.hoTen.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập email"
                  id="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="errors">{errors.email.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="soDt">Số điện thoại:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập số điện thoại"
                  id="soDt"
                  {...register("soDt")}
                />
                {errors.soDt && <p className="errors">{errors.soDt.message}</p>}
              </div>
              {err && <p style={{ color: "red" }}>{err}</p>}
              <button disabled={isLoading} className="btn">
                Đăng kí
              </button>
            </form>
          </div>
          <Link to="/auth/login">Bạn đã có tài khoản ? Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}

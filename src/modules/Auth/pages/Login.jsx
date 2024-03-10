import React, { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../../redux/actions/UserAction";
import { useEffect } from "react";
import { USER_LOGIN_ERROR } from "../../../redux/types/UserType";

const validationSchema = object({
  taiKhoan: string().required("Tài khoản không được trống !!"),
  matKhau: string().required("Mật khẩu không được trống !!"),
});
export default function Login() {
  const { userLogin, loginError } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = (values) => {
    try {
      setIsLoading(true);
      dispatch(LoginAction(values));
    } catch (error) {
      setIsLoading(false);
    } finally {
      dispatch({
        type: USER_LOGIN_ERROR,
        err: "",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: USER_LOGIN_ERROR,
        err: "",
      });
    };
  }, []);

  const handleExit = () => {
    navigate("/");
  };
  if (userLogin) {
    if (userLogin.maLoaiNguoiDung === "QuanTri") {
      let url = searchParams.get("from") || "/admin/users";

      return <Navigate to={url} replace />;
    }
    let url = searchParams.get("from") || "/";
    return <Navigate to={url} replace />;
  }

  return (
    <div
      className="login"
      style={{ backgroundImage: `url(/assets/img/bgAuth.jpg)` }}
    >
      <div className="login__content">
        <div className="login__content-form">
          <div className="form__header">
            <Link to="/">
              <i className="fa-solid fa-x" onClick={() => handleExit()}></i>
            </Link>
          </div>
          <div className="form__title">
            <div className="form__icon">
              <i className="fa-solid fa-circle-user"></i>
            </div>
            <p>ĐĂNG NHẬP</p>
          </div>
          <div className="form__content">
            <form onSubmit={handleSubmit(handleLogin)}>
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
              {loginError && <p style={{ color: "red" }}>{loginError}</p>}
              <button disabled={isLoading} className="btn">
                Đăng nhập
              </button>
            </form>
          </div>
          <Link to="/auth/register">Bạn chưa có tài khoản ? Đăng kí</Link>
        </div>
      </div>
    </div>
  );
}

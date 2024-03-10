import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { LogoutAction } from "../../../redux/actions/UserAction";

export default function AdminHeader() {
  let userLogin = useSelector((state) => state.UserReducer.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(LogoutAction());
    Swal.fire({
      title: "Đăng xuất thành công !",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };
  return (
    <header
      style={{ borderBottom: "1px solid #cbd0dd", boxShadow: "none" }}
      className="header"
    >
      <div className="container flex h-16  header__content">
        <div className="items-center flex-shrink-0 hidden lg:flex btn__content">
          <Fragment>
            <Link className="self-center pr-8 py-3 btn__login" to="/account">
              <img
                style={{
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "0.75rem",
                }}
                src={`https://i.pravatar.cc/20?u=${userLogin.taiKhoan}`}
                alt="avtarr"
              />
              {userLogin.hoTen}
            </Link>
            <Link
              className="self-center pl-8 py-3 btn__register"
              onClick={() => handleLogout()}
            >
              <i className="fa-solid fa-circle-user mr-3"></i>
              Đăng xuất
            </Link>
          </Fragment>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}

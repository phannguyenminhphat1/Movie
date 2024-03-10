import React, { Fragment, useEffect, useState } from "react";
import "../../../../../styles/styleLayout.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../../../../../redux/actions/UserAction";
import Swal from "sweetalert2";

const useScrollIntoView = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    scrollTo,
  };
};

export default function Header() {
  let userLogin = useSelector((state) => state.UserReducer.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { scrollTo } = useScrollIntoView();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowMenuIconBurger, setIsShowMenuIconBurger] = useState(false);
  const [isShowMenuIconClose, setIsShowMenuIconClose] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname]);

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

  const handleNavLink = (id) => {
    if (pathname !== "/") {
      navigate("/");
    }

    scrollTo(id);
  };

  let checkShowMenu = isShowMenu ? "show__menu" : "";
  let checkShowMenuIconBurger = isShowMenuIconBurger ? "show__icon-burger" : "";
  let checkShowMenuIconClose = isShowMenuIconClose ? "show__icon-close" : "";

  const handleShowMenu = () => {
    setIsShowMenu(!isShowMenu);
    setIsShowMenuIconBurger(!isShowMenuIconBurger);
    setIsShowMenuIconClose(!isShowMenuIconClose);
  };

  return (
    <header className="header">
      <div className="container flex justify-between h-16 header__content">
        <Link to="/" className="flex items-center p-2">
          <img src="/assets/img/logo.png" alt="logo" className="logo" />
        </Link>
        <ul className="hidden space-x-3 lg:flex">
          <li className="flex">
            <p
              onClick={() => handleNavLink("listCard")}
              className="flex items-center px-4 -mb-1"
            >
              Lịch Chiếu
            </p>
          </li>
          <li className="flex">
            <p
              onClick={() => handleNavLink("theaterComplex")}
              className="flex items-center px-4 -mb-1 "
            >
              Cụm Rạp
            </p>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex btn__content">
          {userLogin == null ? (
            <Fragment>
              <Link
                to="/auth/login"
                className="self-center pr-8 py-3 btn__login"
              >
                <i className="fa-solid fa-circle-user mr-3"></i>
                Đăng nhập
              </Link>
              <Link
                to="/auth/register"
                className="self-center pl-8 py-3 btn__register"
              >
                <i className="fa-solid fa-circle-user mr-3"></i>
                Đăng kí
              </Link>
            </Fragment>
          ) : (
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
          )}
        </div>
        <div className="btn__toggle" onClick={() => handleShowMenu()}>
          <button
            className={`p-4 btn__toggle-burger ${checkShowMenuIconBurger}`}
          >
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
          <button className={`p-4 btn__toggle-close ${checkShowMenuIconClose}`}>
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {userLogin ? (
        <div className={`nav__menu ${checkShowMenu}`} id="nav__menu">
          <ul className="nav__list">
            <li>
              <img
                style={{
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "0.5rem",
                }}
                src={`https://i.pravatar.cc/20?u=${userLogin.taiKhoan}`}
                alt="avtarr"
              />
              <Link to="/account" className="nav__link">
                {userLogin.hoTen}
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-right-from-bracket mr-2"></i>
              <Link onClick={() => handleLogout()} className="nav__link">
                Đăng xuất
              </Link>
            </li>
            <li>
              <i className="fa-regular fa-calendar mr-2"></i>
              <a
                onClick={() => handleNavLink("listCard")}
                className="nav__link"
                style={{ cursor: "pointer" }}
              >
                Lịch chiếu
              </a>
            </li>
            <li>
              <i className="fa-solid fa-film mr-2"></i>
              <a
                onClick={() => handleNavLink("theaterComplex")}
                className="nav__link"
                style={{ cursor: "pointer" }}
              >
                Cụm rạp
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className={`nav__menu ${checkShowMenu}`} id="nav__menu">
          <ul className="nav__list">
            <li>
              <i className="fa-solid fa-circle-user mr-2"></i>
              <Link to="/auth/login" className="nav__link">
                Đăng nhập
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-circle-user mr-2"></i>
              <Link to="/auth/register" className="nav__link">
                Đăng kí
              </Link>
            </li>
            <li>
              <i className="fa-regular fa-calendar mr-2"></i>
              <a
                onClick={() => handleNavLink("listCard")}
                className="nav__link"
              >
                Lịch chiếu
              </a>
            </li>
            <li>
              <i className="fa-solid fa-film mr-2"></i>
              <a
                onClick={() => handleNavLink("theaterComplex")}
                className="nav__link"
              >
                Cụm rạp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

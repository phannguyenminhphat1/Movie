import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { userLogin } = useSelector((state) => state.UserReducer);
  const location = useLocation();
  if (!userLogin) {
    let url = `/auth/login?from=${location.pathname}`;
    return <Navigate to={url} replace />;
  }
  return children || <Outlet />;
}

import React, { Fragment, useEffect } from "react";
import Header from "../../modules/Home/components/layouts/headers/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../modules/Home/components/layouts/footers/Footer";

export const HomeTemplate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

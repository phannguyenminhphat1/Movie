import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieComplexAction } from "../../../../../redux/actions/MovieComplexAction";
import { Tabs } from "antd";
import moment from "moment";
import "moment/locale/vi";
import { Fragment } from "react";
import PrivateLink from "../../../../../components/PrivateLink";

export default function TheaterComplex() {
  const [selectedSystem, setSelectedSystem] = useState("BHDStar");

  const movieSystems = useSelector(
    (state) => state.MovieComplexReducer.arrMovieComplex
  );
  const handleSelectedSysTem = (system) => {
    setSelectedSystem(system);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(MovieComplexAction());
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, []);

  const formattedDate = (dateString) => {
    moment.locale("vi");
    const formatted = moment(dateString).format("dddd, DD [tháng] MM, YYYY");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const renderMovieSystems = () => {
    return movieSystems.map((item, index) => {
      return (
        <li className="nav-item" key={index}>
          <button
            className="nav-link"
            data-toggle="pill"
            onClick={() => handleSelectedSysTem(item.maHeThongRap)}
          >
            <img src={item.logo} alt="logo" />
          </button>
        </li>
      );
    });
  };

  const renderMovieComplex = () => {
    const selectedSystemData = movieSystems.find(
      (item) => item.maHeThongRap === selectedSystem
    );
    if (!selectedSystemData) {
      return null;
    }
    return selectedSystemData.lstCumRap.map((cumRap) => {
      return (
        <Tabs.TabPane
          className="complex__show-item"
          tab={
            <div
              style={{
                display: "flex",
                padding: "20px 15px 15px 20px",
              }}
              className="show__content"
            >
              <img src={cumRap.hinhAnh} width="50" alt="hinhAnh" />
              <div style={{ paddingLeft: "10px" }}>
                <h5
                  style={{
                    color: "#fb4226",
                    fontSize: "14px",
                    fontWeight: 500,
                    textAlign: "left",
                  }}
                >
                  {cumRap.tenCumRap}
                </h5>
                <span
                  style={{
                    color: "#949494",
                    overflow: "hidden",
                    fontSize: "12px",
                  }}
                >
                  {cumRap.diaChi}
                </span>
              </div>
            </div>
          }
          key={cumRap.tenCumRap}
        >
          {cumRap.danhSachPhim.map((phim) => {
            return (
              <Fragment key={phim.tenPhim}>
                <div
                  key={phim.indexPhim}
                  style={{ padding: "20px 15px 17px 20px" }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      src={phim.hinhAnh}
                      alt="John Wick"
                      width={75}
                      height={75}
                    ></img>
                    <div style={{ padding: "6px 0 0 15px" }}>
                      <p style={{ fontWeight: 500, textAlign: "left" }}>
                        {phim.tenPhim}
                      </p>
                      <span>120 phút</span>
                    </div>
                  </div>
                </div>
                <div style={{ paddingTop: "15px", paddingLeft: "20px" }}>
                  {phim.lstLichChieuTheoPhim.map((lcTheoPhim) => {
                    return (
                      <div key={lcTheoPhim.maLichChieu}>
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            marginBottom: "5px",
                          }}
                        >
                          {formattedDate(lcTheoPhim.ngayChieuGioChieu)}
                        </p>
                        <div
                          style={{
                            gap: "10px",
                            display: "flex",
                          }}
                        >
                          <button
                            style={{
                              color: "#9b9b9b",
                              border: "1px solid #e4e4e4",
                              padding: "5px",
                              fontSize: "14px",
                              transition: "all .2s",
                              fontWeight: 400,
                              borderRadius: "7px",
                              backgroundColor: "rgba(246,246,246,.5)",
                              outline: "none",
                            }}
                          >
                            <PrivateLink
                              to={`/ticket/${lcTheoPhim.maLichChieu}`}
                              style={{
                                textDecoration: "none",
                              }}
                            >
                              {moment(lcTheoPhim.ngayChieuGioChieu).format(
                                "hh:mm A"
                              )}
                            </PrivateLink>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
        </Tabs.TabPane>
      );
    });
  };

  return (
    <>
      <div className="complex" id="theaterComplex">
        <h4>Cụm rạp</h4>
        <div className="complex__content">
          <div className="complex__navs">
            <ul className="nav nav-pills">{renderMovieSystems()}</ul>
          </div>
          <div className="complex__show">
            <div className="complex__show-content">
              <Tabs tabPosition="left">{renderMovieComplex()}</Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

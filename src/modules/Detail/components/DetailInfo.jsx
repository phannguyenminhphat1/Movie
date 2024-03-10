import React, { Fragment, useEffect, useState } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetMovieShowtimeAction } from "../../../redux/actions/MovieComplexAction";
import moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import PrivateLink from "../../../components/PrivateLink";

export default function DetailInfo({ movieId }) {
  const filmDetails = useSelector(
    (state) => state.MovieComplexReducer.flimDetails
  );
  const [desc, setDesc] = useState(false);
  const [showing, setShowing] = useState(true);

  let checkIsClickDesc = desc ? "activeBtn" : "";
  let checkIsClickShowing = showing ? "activeBtn" : "";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetMovieShowtimeAction(movieId));
  }, []);

  const handleOnClickShowing = () => {
    setShowing(true);
    setDesc(false);
  };
  const handleOnClickDesc = () => {
    setShowing(false);
    setDesc(true);
  };

  const formattedDate = (dateString) => {
    moment.locale("vi");
    const formattedDateString = moment(dateString).format("DD.MM.YYYY");
    const formattedTimeString = formattedTime(dateString);
    return (
      <span>
        <span style={{ color: "#108f3e" }}>{formattedDateString}</span> ~{" "}
        <span style={{ color: "#fb4226" }}>{formattedTimeString}</span>
      </span>
    );
  };

  const formattedTime = (dateString) => {
    moment.locale("vi");
    return moment(dateString).format("HH:mm");
  };

  const formattedDateOrginal = (dateString) => {
    moment.locale("vi");
    const formatted = moment(dateString).format("dddd, DD [tháng] MM, YYYY");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <div className="detail__info" id="detail__info">
      <div className="info__content">
        <div className="info__content-navs">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <button
                className={`nav-link ${checkIsClickShowing}`}
                onClick={() => handleOnClickShowing()}
              >
                LỊCH CHIẾU
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${checkIsClickDesc}`}
                onClick={() => handleOnClickDesc()}
              >
                THÔNG TIN
              </button>
            </li>
          </ul>
        </div>
        <div className="info__content-show">
          {showing && (
            <div className="show__tabs">
              {filmDetails.heThongRapChieu?.length ? (
                <Tabs tabPosition="left">
                  {filmDetails.heThongRapChieu?.map((item, index) => {
                    return (
                      <Tabs.TabPane
                        tab={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img src={item.logo} width={50} height={70} />
                            <h4
                              style={{ fontWeight: "bold", marginLeft: "20px" }}
                            >
                              {item.tenHeThongRap.toUpperCase()}
                            </h4>
                          </div>
                        }
                        key={index}
                      >
                        {item.cumRapChieu?.map((cumRap, indexCumRap) => {
                          return (
                            <div
                              key={indexCumRap}
                              style={{
                                padding: "10px 0",
                              }}
                            >
                              <h3
                                style={{
                                  color: "rgb(139, 195, 74)",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  lineHeight: 1.1,
                                  padding: "8px",
                                }}
                              >
                                {cumRap.tenCumRap}
                              </h3>
                              {cumRap.lichChieuPhim.map(
                                (lcPhim, indexLcPhim) => {
                                  return (
                                    <div
                                      key={indexLcPhim}
                                      className="tabs__btn"
                                    >
                                      <PrivateLink
                                        to={`/ticket/${lcPhim.maLichChieu}`}
                                      >
                                        {formattedDate(
                                          lcPhim.ngayChieuGioChieu
                                        )}
                                      </PrivateLink>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          );
                        })}
                      </Tabs.TabPane>
                    );
                  })}
                </Tabs>
              ) : (
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    margin: "25px auto",
                  }}
                >
                  Không có lịch chiếu
                </p>
              )}
            </div>
          )}
          {desc ? (
            <div className="show__desc">
              <div className="show__desc-content">
                <div className="show__desc-datetime">
                  <h3>Ngày công chiếu:</h3>
                  <p>{formattedDateOrginal(filmDetails.ngayKhoiChieu)}</p>
                </div>
                <div className="show__desc-description">
                  <h3>Mô tả:</h3>
                  <p>{filmDetails.moTa}</p>
                </div>
              </div>
            </div>
          ) : (
            "Phim hiện chưa có thông tin mô tả"
          )}
        </div>
      </div>
    </div>
  );
}

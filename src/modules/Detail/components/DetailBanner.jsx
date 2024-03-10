import React, { Fragment, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { GetMovieShowtimeAction } from "../../../redux/actions/MovieComplexAction";
import ReactStars from "react-rating-stars-component";
import moment from "moment";
import "moment/locale/vi";
import ReactPlayer from "react-player";
import { Modal } from "antd";
import PrivateLink from "../../../components/PrivateLink";

const useScrollIntoView = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    scrollTo,
  };
};

export default function DetailBanner({ movieId }) {
  const flimDetails = useSelector(
    (state) => state.MovieComplexReducer.flimDetails
  );
  const { scrollTo } = useScrollIntoView();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const maPhim = movieId;
    dispatch(GetMovieShowtimeAction(maPhim));
  }, []);

  const showModal = (trailer) => {
    setIsModalOpen(true);
    setTrailer(trailer);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleNavLink = (id) => {
    scrollTo(id);
  };

  const formattedDate = (dateString) => {
    moment.locale("vi");
    return moment(dateString).format("DD.MM.YYYY");
  };

  return (
    <Fragment>
      <div
        className="detail__bg"
        style={{ backgroundImage: `url(${flimDetails.hinhAnh})` }}
      ></div>

      <div className="detail__banner">
        <div className="detail__content">
          <div
            className="detail__content-img"
            style={{ backgroundImage: `url(${flimDetails.hinhAnh})` }}
          >
            <i
              onClick={() => showModal(flimDetails.trailer)}
              className="fa-regular fa-circle-play"
            ></i>
          </div>
          <div className="detail__content-text">
            <p>Ngày khởi chiếu: {formattedDate(flimDetails.ngayKhoiChieu)}</p>
            <p
              style={{ padding: "3px 0", fontSize: "22px", fontWeight: "bold" }}
            >
              {flimDetails.tenPhim?.toUpperCase()}
            </p>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => handleNavLink("detail__info")}
              className="btn"
            >
              Mua vé
            </a>
          </div>
          <div className="detail__content-circle">
            <div
              className=""
              style={{ width: 150, height: 150, marginBottom: "1rem" }}
            >
              <CircularProgressbar
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#7ed321",
                })}
                strokeWidth={8}
                value={flimDetails.danhGia}
                text={`${flimDetails.danhGia}`}
              />
            </div>

            <p>{flimDetails.danhGia} đánh giá</p>
          </div>
        </div>
      </div>
      <Modal
        title="Trailer"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <ReactPlayer
          controls={true}
          playing={false}
          width="100%"
          url={trailer}
        />
      </Modal>
    </Fragment>
  );
}

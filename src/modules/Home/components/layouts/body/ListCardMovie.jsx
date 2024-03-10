import React, { useEffect, useState } from "react";
import CardMovieItem from "./CardMovieItem";
import { useSelector, useDispatch } from "react-redux";
import {
  GetMovieAction,
  IsShowingMovieAction,
  UpComingMovieAction,
} from "../../../../../redux/actions/MovieAction";
import { Fragment } from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

export default function ListCardMovie() {
  const [isLoading, setIsLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const data = useSelector((state) => state.MovieReducer.arrMovie);
  const stateIsShowing = useSelector((state) => state.MovieReducer.isShowing);
  const stateIsUpComming = useSelector(
    (state) => state.MovieReducer.isUpComming
  );
  const dispatch = useDispatch();

  let checkIsShowing = stateIsShowing ? "activeBtn" : "";
  let checkIsUpComming = stateIsUpComming ? "activeBtn" : "";

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    try {
      dispatch(GetMovieAction());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderMovie = () => {
    return data.slice(0, 8).map((item, index) => {
      return (
        <Fragment key={index}>
          <div className="col-lg-3 col-md-4 col-xs-12" style={{ padding: "0" }}>
            <div className="listCard__item">
              <CardMovieItem item={item} />
              <div className="overlay">
                <i
                  onClick={() => showModal(item.trailer)}
                  className="fa-regular fa-circle-play"
                ></i>
                <Link to={`/detail/${item.maPhim}`} className="btn">
                  MUA VÉ
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      );
    });
  };
  const handleIsShowingMovie = () => {
    dispatch(IsShowingMovieAction());
  };
  const handleUpComingMovie = () => {
    dispatch(UpComingMovieAction());
  };

  if (isLoading) {
    return <h1 className="text-center">... LOADING</h1>;
  }
  return (
    <div className="listCard" id="listCard">
      <div className="flex items-center listCard__menu">
        <button
          className={`${checkIsShowing} px-3 py-1`}
          onClick={() => handleIsShowingMovie()}
        >
          Đang chiếu
        </button>
        <button
          className={`${checkIsUpComming} px-3 py-1`}
          onClick={() => handleUpComingMovie()}
        >
          Sắp chiếu
        </button>
      </div>
      <div style={{ margin: "15px auto" }}>
        <div className="listCard__content">
          <div className="row">{renderMovie()}</div>
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
    </div>
  );
}

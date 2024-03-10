import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { GetMovieActionSearch } from "../../../../../redux/actions/MovieAction";
import { GetMovieShowtimeSearchAction } from "../../../../../redux/actions/MovieComplexAction";
import moment from "moment";
import PrivateLink from "../../../../../components/PrivateLink";

export default function Search() {
  const [state, setState] = useState({
    movie: [],
    movieComplex: [],
    movieShowTime: [],
    maLichChieu: "",
  });
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let result = await GetMovieActionSearch();
      setState({ ...state, movie: result });
    };
    fetchData();
  }, []);

  const loadOptionsMovie = () => {
    return state.movie?.map((item) => {
      return {
        value: item.maPhim,
        label: item.tenPhim,
      };
    });
  };

  const handleChangeMovie = async (value) => {
    try {
      const result = await GetMovieShowtimeSearchAction(value);
      setState({ ...state, movieComplex: result });
    } catch (error) {
      console.log(error);
    }
  };

  const loadOptionsComplex = () => {
    return state.movieComplex?.heThongRapChieu?.flatMap((htr) =>
      htr.cumRapChieu.map((item) => ({
        value: item.maCumRap,
        label: item.tenCumRap,
      }))
    );
  };

  const handleChangeComplex = (value) => {
    let arrMovieShowTime = state.movieComplex?.heThongRapChieu?.map((htr) => {
      return htr.cumRapChieu.find((item) => item.maCumRap === value);
    });
    arrMovieShowTime = arrMovieShowTime.filter((item) => item !== undefined);
    setState({ ...state, movieShowTime: arrMovieShowTime });
  };

  const loadOptionsShowTime = () => {
    return state.movieShowTime.flatMap((item) =>
      item.lichChieuPhim.map((lcp) => ({
        value: lcp.maLichChieu,
        label: moment(lcp.ngayChieuGioChieu).format("DD/MM/YYYY ~ HH:mm"),
      }))
    );
  };
  const handleChangeShowTime = (value) => {
    if (value === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
    setState({ ...state, maLichChieu: value });
  };

  let btnDisable = disable ? "disabled" : "";

  return (
    <div className="search">
      <div className="search__content">
        <div className="row">
          <div className="col-lg-3 col">
            <div className="search__item">
              <Select
                placeholder="Phim"
                className="select"
                options={loadOptionsMovie()}
                onChange={handleChangeMovie}
              />
            </div>
          </div>
          <div className="col-lg-3 col">
            <div className="search__item">
              <Select
                placeholder="Rạp"
                className="select"
                options={loadOptionsComplex()}
                onChange={handleChangeComplex}
              />
            </div>
          </div>
          <div className="col-lg-3 col">
            <div className="search__item">
              <Select
                className="select"
                placeholder="Ngày giờ chiếu"
                options={loadOptionsShowTime()}
                onChange={handleChangeShowTime}
              />
            </div>
          </div>
          <div className="col-lg-3 col">
            <div className="search__item">
              <PrivateLink
                to={`/ticket/${state.maLichChieu}`}
                className={`btn btn-secondary ${btnDisable}`}
              >
                MUA VÉ NGAY
              </PrivateLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

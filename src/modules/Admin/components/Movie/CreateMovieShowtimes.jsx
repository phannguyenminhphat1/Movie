import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoadingAction,
  ShowLoadingAction,
} from "../../../../redux/actions/LoadingAction";
import Swal from "sweetalert2";
import { Select, DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import {
  AdminCreateMovieShowtimesAction,
  AdminGetMovieComplexAction,
  AdminGetMovieSystemsAction,
} from "../../../../redux/actions/AdminMovieAction";
import { useNavigate, useParams } from "react-router-dom";

const disabledDate = (current) => {
  return current && current < dayjs().startOf("day");
};

export default function CreateMovieShowtimes() {
  const params = useParams();
  const navigate = useNavigate();

  const [stateSelect, setStateSelect] = useState({
    movieSystems: [],
    movieComplex: [],
  });
  const dispatch = useDispatch();
  const [err, setErr] = useState(null);
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const [selectedMovieComplex, setSelectedMovieComplex] = useState("");
  const [stateDate, setStateDate] = useState("");
  const [statePrice, setStatePrice] = useState(75000);

  const { handleSubmit } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      const result = await AdminGetMovieSystemsAction();
      setStateSelect({
        ...stateSelect,
        movieSystems: result.data.content,
      });
    }
    fetchData();

    return () => {
      localStorage.removeItem("flim");
    };
  }, []);

  const loadMovieSystems = () => {
    return stateSelect.movieSystems?.map((item, index) => {
      return {
        value: item.maHeThongRap,
        label: item.tenHeThongRap,
      };
    });
  };

  const onChangeMovieSystems = async (value, options) => {
    try {
      const result = await AdminGetMovieComplexAction(value);
      setStateSelect({
        ...stateSelect,
        movieComplex: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeMovieComplex = (value) => {
    setSelectedMovieComplex(value);
  };

  const handleCreateShowtimes = async (values) => {
    try {
      const payload = {
        maPhim: Number(params.id),
        maRap: selectedMovieComplex,
        ngayChieuGioChieu: stateDate,
        giaVe: statePrice,
      };
      dispatch(ShowLoadingAction());
      const result = await AdminCreateMovieShowtimesAction(payload);
      if (result.data.statusCode === 200) {
        Swal.fire({
          title: "Tạo lịch chiếu phim thành công",
          icon: "success",
          confirmButtonColor: "OK",
        }).then((res) => {
          if (res.isConfirmed) {
            setSelectedMovieComplex("");
            setStateDate("");
            setStatePrice(75000);
            navigate("/admin/movies");
            window.scrollTo(0, 0);
          }
        });
        setSelectedMovieComplex("");
        setStateDate("");
        setStatePrice(75000);
        navigate("/admin/movies");
        window.scrollTo(0, 0);
      }
    } catch (error) {
      dispatch(HideLoadingAction());
      setErr(error);
    } finally {
      dispatch(HideLoadingAction());
    }
  };

  const loadMovieComplex = () => {
    return stateSelect.movieComplex?.map((item, index) => {
      return {
        label: item.tenCumRap,
        value: item.maCumRap,
      };
    });
  };
  const onChangeDateTime = (value) => {
    const valueDatetime = moment(value).format("DD/MM/YYYY hh:mm:ss");
    setStateDate(valueDatetime);
  };

  const onOk = (value) => {
    const valueDatetime = moment(value).format("DD/MM/YYYY hh:mm:ss");
    setStateDate(valueDatetime);
  };

  const onChangeNumber = (value) => {
    setStatePrice(value);
  };

  let flim = {};
  if (localStorage.getItem("flim")) {
    flim = JSON.parse(localStorage.getItem("flim"));
  }

  return (
    <div
      className="form__content"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: "25px",
        borderRadius: "5px",
      }}
    >
      <h2 className="text-3xl mb-3 font-semibold">
        Tạo lịch chiếu phim:{" "}
        <span style={{ color: "#fb4226", fontWeight: "700" }}>
          {flim.tenPhim}
        </span>
      </h2>
      <form onSubmit={handleSubmit(handleCreateShowtimes)}>
        <div className="form-group">
          <label
            className="font-semibold"
            style={{ display: "block" }}
            htmlFor="heThongRap"
          >
            Hệ thống rạp
          </label>
          <Select
            style={{
              width: "350px",
            }}
            options={loadMovieSystems()}
            onChange={onChangeMovieSystems}
            placeholder="Chọn hệ thống rạp"
          />
          {/* {errors.tenPhim && <p className="errors">{errors.tenPhim.message}</p>} */}
        </div>
        <div className="form-group">
          <label
            className="font-semibold"
            style={{ display: "block" }}
            htmlFor="cumRap"
          >
            Cụm rạp
          </label>
          <Select
            style={{
              width: "350px",
            }}
            options={loadMovieComplex()}
            onChange={onChangeMovieComplex}
            placeholder="Chọn cụm rạp"
          />
          {/* {errors.tenPhim && <p className="errors">{errors.tenPhim.message}</p>} */}
        </div>
        <div className="form-group">
          <label
            className="font-semibold"
            style={{ display: "block" }}
            htmlFor="ngayGioChieu"
          >
            Ngày giờ chiếu
          </label>
          <DatePicker
            format="DD-MM-YYYY HH:mm:ss"
            disabledDate={disabledDate}
            showTime
            onChange={onChangeDateTime}
            onOk={onOk}
            defa
          />
          {/* {errors.tenPhim && <p className="errors">{errors.tenPhim.message}</p>} */}
        </div>
        <div className="form-group">
          <label
            className="font-semibold"
            style={{ display: "block" }}
            htmlFor="giaVe"
          >
            Giá vé
          </label>
          <InputNumber
            min={75000}
            max={150000}
            defaultValue={75000}
            onChange={onChangeNumber}
          />
          {/* {errors.tenPhim && <p className="errors">{errors.tenPhim.message}</p>} */}
        </div>

        {err && <p style={{ color: "red", marginBottom: "15px" }}>{err}</p>}

        <button disabled={isLoading} className="btn btn-success">
          Tạo lịch chiếu
        </button>
      </form>
    </div>
  );
}

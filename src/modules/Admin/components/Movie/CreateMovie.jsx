import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Switch } from "antd";
import { date, object, string, mixed } from "yup";
import moment from "moment";
// import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { AdminCreateMovieAction } from "../../../../redux/actions/AdminMovieAction";
import { CREATE_MOVIE_ERROR } from "../../../../redux/types/AdminMovieType";
import {
  HideLoadingAction,
  ShowLoadingAction,
} from "../../../../redux/actions/LoadingAction";
import Swal from "sweetalert2";

const validationSchema = object({
  tenPhim: string().required("Tên phim không được trống !!"),
  moTa: string().required("Mô tả không được trống !!"),
  trailer: string().required("Trailer không được trống !!"),
});

export default function CreateMovie() {
  const [booleanHot, setBooleanHot] = useState(false);
  const [booleanSapChieu, setBooleanSapChieu] = useState(false);
  const [booleanDangChieu, setBooleanDangChieu] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhim: "",
      ngayKhoiChieu: "",
      moTa: "",
      trailer: "",
      hinhAnh: "",
      hot: false,
      sapChieu: false,
      dangChieu: false,
    },
    resolver: yupResolver(validationSchema),
  });

  const onChangeHot = (checked) => {
    setBooleanHot(checked);
  };
  const onChangeSapChieu = (checked) => {
    setBooleanSapChieu(checked);
  };
  const onChangeDangChieu = (checked) => {
    setBooleanDangChieu(checked);
  };

  const handleOnChangeImgPreview = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      setImgPreview(e.target.result);
    };
  };

  const handleCreateMovie = async (values) => {
    try {
      const payload = {
        ...values,
        hinhAnh: values.hinhAnh?.[0],
        hot: booleanHot,
        dangChieu: booleanDangChieu,
        sapChieu: booleanSapChieu,
      };
      dispatch(ShowLoadingAction());
      setErr(null);
      // if (payload.hinhAnh.size / 1024 / 1024 > 1) {
      //   setError("hinhAnh", { message: "Kích thước hình ảnh vượt quá 1MB" });
      //   return
      // }
      const result = await AdminCreateMovieAction(payload);
      if (result.data.statusCode === 200) {
        Swal.fire({
          title: "Thêm phim thành công",
          icon: "success",
          confirmButtonColor: "OK",
        }).then((res) => {
          if (res.isConfirmed) {
            window.scrollTo(0, 0);
            reset({
              tenPhim: "",
              ngayKhoiChieu: "",
              moTa: "",
              trailer: "",
              hinhAnh: "",
              hot: false,
              sapChieu: false,
              dangChieu: false,
            });
            setBooleanHot(false);
            setBooleanSapChieu(false);
            setBooleanDangChieu(false);
            setImgPreview("");
          }
        });
      }
      window.scrollTo(0, 0);
      reset();
    } catch (error) {
      dispatch(HideLoadingAction());
      setErr(error);
    } finally {
      dispatch(HideLoadingAction());
    }
  };

  const formattedDate = (value) => {
    return moment(value).format("DD/MM/YYYY");
  };

  return (
    <div
      className="form__content"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: "25px",
        borderRadius: "5px",
      }}
    >
      <h2 className="text-3xl mb-3 font-semibold">Thêm Phim</h2>
      <form onSubmit={handleSubmit(handleCreateMovie)}>
        <div className="form-group">
          <label className="font-semibold" htmlFor="tenPhim">
            Tên phim
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên phim"
            id="tenPhim"
            {...register("tenPhim")}
          />
          {errors.tenPhim && <p className="errors">{errors.tenPhim.message}</p>}
        </div>

        <div className="form-group">
          <label className="font-semibold" htmlFor="moTa">
            Mô tả
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập mô tả"
            id="moTa"
            {...register("moTa")}
          />
          {errors.moTa && <p className="errors">{errors.moTa.message}</p>}
        </div>
        <div className="form-group">
          <label className="font-semibold" htmlFor="trailer">
            Trailer
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập link trailer"
            id="trailer"
            {...register("trailer")}
          />
          {errors.trailer && <p className="errors">{errors.trailer.message}</p>}
        </div>
        <div className="form-group">
          <label className="font-semibold" htmlFor="hinhAnh">
            Hình ảnh
          </label>
          <input
            accept=".png,.jpg,.jpeg"
            type="file"
            className="form-control"
            placeholder="Chọn hình ảnh"
            id="hinhAnh"
            {...register("hinhAnh", { onChange: handleOnChangeImgPreview })}
          />
          {imgPreview && (
            <div
              style={{
                border: "1px solid black",
                margin: "10px 0",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={imgPreview}
                alt="imgPreview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}
          {errors.hinhAnh && <p className="errors">{errors.hinhAnh.message}</p>}
        </div>
        <div className="form-group">
          <label
            className="font-semibold"
            htmlFor="ngayKhoiChieu"
            style={{ display: "block" }}
          >
            Ngày khởi chiếu
          </label>
          <input
            type="date"
            className="form-control"
            id="ngayKhoiChieu"
            {...register("ngayKhoiChieu", {
              setValueAs: (value) => {
                return formattedDate(value);
              },
            })}
          />

          {errors.ngayKhoiChieu && (
            <p className="errors">{errors.ngayKhoiChieu.message}</p>
          )}
        </div>

        <table>
          <tbody>
            <tr>
              <th className="mr-3 font-semibold">Hot:</th>
              <td style={{ padding: "10px" }}>
                <Switch onChange={onChangeHot} />
              </td>
            </tr>

            <tr>
              <th className="mr-3 font-semibold">Đang chiếu:</th>
              <td style={{ padding: "10px" }}>
                <Switch onChange={onChangeDangChieu} />
              </td>
            </tr>
            <tr>
              <th className="mr-3 font-semibold">Sắp chiếu:</th>
              <td style={{ padding: "10px" }}>
                <Switch onChange={onChangeSapChieu} />
              </td>
            </tr>
          </tbody>
        </table>

        {err && <p style={{ color: "red", marginBottom: "15px" }}>{err}</p>}

        <button disabled={isLoading} className="btn btn-success">
          Thêm phim
        </button>
      </form>
    </div>
  );
}

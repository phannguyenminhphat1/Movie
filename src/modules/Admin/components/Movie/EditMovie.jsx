import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Switch } from "antd";
import { object, string } from "yup";
import moment from "moment";
import "moment/locale/vi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminEditMovieAction,
  AdminGetMovieDetailsAction,
} from "../../../../redux/actions/AdminMovieAction";
import Swal from "sweetalert2";
import {
  HideLoadingAction,
  ShowLoadingAction,
} from "../../../../redux/actions/LoadingAction";

const validationSchema = object({
  tenPhim: string().required("Tên phim không được trống !!"),
  moTa: string().required("Mô tả không được trống !!"),
  trailer: string().required("Trailer không được trống !!"),
});

export default function EditMovie() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState(null);
  const [defaultBooleanHot, setDefaultBooleanHot] = useState(false);
  const [defaultBooleanDangChieu, setDefaultBooleanDangChieu] = useState(false);
  const [defaultBooleanSapChieu, setDefaultBooleanSapChieu] = useState(false);

  const [imgPreview, setImgPreview] = useState("");
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhim: "",
      ngayKhoiChieu: "",
      moTa: "",
      trailer: "",
      hinhAnh: null,
      hot: false,
      sapChieu: false,
      dangChieu: false,
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getMovieDetails();
  }, []);

  const getMovieDetails = async () => {
    const result = await AdminGetMovieDetailsAction(params.id);
    if (result.data.statusCode === 200) {
      setValue("tenPhim", result.data.content.tenPhim);
      setValue("moTa", result.data.content.moTa);
      setValue("trailer", result.data.content.trailer);
      setDefaultBooleanHot(result.data.content.hot);
      setDefaultBooleanSapChieu(result.data.content.sapChieu);
      setDefaultBooleanDangChieu(result.data.content.dangChieu);
      if (imgPreview === "") {
        setImgPreview(result.data.content.hinhAnh);
      }
      let date = new Date(result.data.content.ngayKhoiChieu).toLocaleDateString(
        "en-CA"
      );
      setValue("ngayKhoiChieu", date);
    }
  };

  const onChangeHot = (checked) => {
    setDefaultBooleanHot(checked);
  };
  const onChangeSapChieu = (checked) => {
    setDefaultBooleanSapChieu(checked);
  };
  const onChangeDangChieu = (checked) => {
    setDefaultBooleanDangChieu(checked);
  };
  const formattedDate = (value) => {
    return moment(value).format("DD/MM/YYYY");
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

  const handleEditMovie = async (values) => {
    const payload = {
      maPhim: Number(params.id),
      ...values,
      hinhAnh: values.hinhAnh?.[0],
      hot: defaultBooleanHot,
      dangChieu: defaultBooleanDangChieu,
      sapChieu: defaultBooleanSapChieu,
    };
    try {
      dispatch(ShowLoadingAction());
      const result = await AdminEditMovieAction(payload);
      if (result.data.statusCode === 200) {
        Swal.fire({
          title: "Cập nhật phim thành công",
          icon: "success",
          confirmButtonColor: "OK",
        }).then((res) => {
          if (res.isConfirmed) {
            setImgPreview("");
            navigate("/admin/movies");
          }
        });
        navigate("/admin/movies");
      }
    } catch (error) {
      dispatch(HideLoadingAction());
      console.log(error);
      setErr(error);
    } finally {
      dispatch(HideLoadingAction());
    }
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
      <h2 className="text-3xl mb-3 font-semibold">Cập nhật Phim</h2>
      <form onSubmit={handleSubmit(handleEditMovie)}>
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
          <label className="font-semibold" htmlFor="ngayKhoiChieu">
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
                <Switch onChange={onChangeHot} checked={defaultBooleanHot} />
              </td>
            </tr>

            <tr>
              <th className="mr-3 font-semibold">Đang chiếu:</th>
              <td style={{ padding: "10px" }}>
                <Switch
                  onChange={onChangeDangChieu}
                  checked={defaultBooleanDangChieu}
                />
              </td>
            </tr>
            <tr>
              <th className="mr-3 font-semibold">Sắp chiếu:</th>
              <td style={{ padding: "10px" }}>
                <Switch
                  onChange={onChangeSapChieu}
                  checked={defaultBooleanSapChieu}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {err && <p style={{ color: "red", marginBottom: "15px" }}>{err}</p>}

        <button disabled={isLoading} className="btn btn-primary">
          Cập nhật
        </button>
      </form>
    </div>
  );
}

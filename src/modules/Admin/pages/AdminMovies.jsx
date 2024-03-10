import React, { Fragment, useEffect, useState } from "react";
import { Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetMovieAction } from "../../../redux/actions/MovieAction";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AdminDeleteMovieAction } from "../../../redux/actions/AdminMovieAction";

export default function AdminMovies() {
  const { arrMovie } = useSelector((state) => state.MovieReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(GetMovieAction());
  }, []);

  const { Search } = Input;

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      onFilter: (value, record) => record.maPhim.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      render: (text, flim) => {
        return moment(flim.ngayKhoiChieu).format("DD/MM/YYYY");
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, flim) => {
        return (
          <Fragment>
            <img
              src={flim.hinhAnh}
              alt="flim"
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${flim.maPhim}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      onFilter: (value, record) => record.hinhAnh.indexOf(value) === 0,
    },
    {
      title: "Bí danh",
      dataIndex: "biDanh",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
    },
    {
      title: "Hành động",
      width: "15%",
      render: (text, flim) => {
        return (
          <Fragment>
            <Link
              to={`/admin/movies/edit/${flim.maPhim}`}
              className="btn btn-primary mr-3"
            >
              Sửa
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleOnclickDelete(flim.maPhim)}
            >
              Xóa
            </button>
            <Link
              to={`/admin/movies/showtimes/create/${flim.maPhim}`}
              onClick={() => localStorage.setItem("flim", JSON.stringify(flim))}
              className="btn btn-secondary mt-3"
            >
              Tạo lịch chiếu
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const handleOnclickDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn xóa phim này ?",
      icon: "error",
      showDenyButton: true,
      confirmButtonText: "Có",
      denyButtonText: "Không",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const result = await AdminDeleteMovieAction(id);
        if (result.data.statusCode === 200) {
          dispatch(GetMovieAction());
          Swal.fire("Xóa phim thành công", "", "success");
        }
      }
    });
  };
  const data = arrMovie;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const onSearch = (value) => {
    dispatch(GetMovieAction(value));
  };

  const addNewMovie = () => {
    navigate("/admin/movies/create");
  };

  return (
    <div>
      <h2 className="text-3xl mb-3 font-semibold">Quản lý Phim</h2>
      <Search
        placeholder="Tìm kiếm phim"
        allowClear
        onSearch={onSearch}
        enterButton
        style={{
          width: "100%",
          marginBottom: "16px",
        }}
      />
      <div className="mb-4">
        <button onClick={() => addNewMovie()} className="btn btn-success mr-3">
          Thêm phim
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={(record) => record.maPhim}
      />
    </div>
  );
}

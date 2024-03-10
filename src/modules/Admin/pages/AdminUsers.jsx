import React, { Fragment, useEffect, useState } from "react";
import { Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  AdminDeleteUserAction,
  AdminGetUsersAction,
} from "../../../redux/actions/AdminUserAction";

export default function AdminUsers() {
  const { users } = useSelector((state) => state.AdminUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(AdminGetUsersAction());
  }, []);

  const { Search } = Input;
  const data = users;

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      onFilter: (value, record) => record.maPhim.indexOf(value) === 0,
      sorter: (a, b) => a.taiKhoan - b.taiKhoan,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
    },
    {
      title: "Hành động",
      width: "15%",
      render: (text, user) => {
        return (
          <Fragment>
            <Link
              to={`/admin/users/edit/${user.taiKhoan}`}
              className="btn btn-primary mr-3"
            >
              Sửa
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleOnclickDelete(user.taiKhoan)}
            >
              Xóa
            </button>
          </Fragment>
        );
      },
    },
  ];

  const handleOnclickDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn người dùng này ?",
      icon: "error",
      showDenyButton: true,
      confirmButtonText: "Có",
      denyButtonText: "Không",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const result = await AdminDeleteUserAction(id);
        if (result.data.statusCode === 200) {
          dispatch(AdminGetUsersAction());
          Swal.fire("Xóa người dùng thành công", "", "success");
        }
      }
    });
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const onSearch = (value) => {
    dispatch(AdminGetUsersAction(value));
  };

  const addNewUser = () => {
    navigate("/admin/users/create");
  };

  return (
    <div>
      <h2 className="text-3xl mb-3 font-semibold">Quản lý Người dùng</h2>
      <Search
        placeholder="Tìm kiếm người dùng"
        allowClear
        onSearch={onSearch}
        enterButton
        style={{
          width: "100%",
          marginBottom: "16px",
        }}
      />
      <div className="mb-4">
        <button onClick={() => addNewUser()} className="btn btn-success mr-3">
          Thêm người dùng
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={(record) => record.taiKhoan}
      />
    </div>
  );
}

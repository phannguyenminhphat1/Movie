import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import AdminHeader from "../../modules/Admin/components/AdminHeader";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Quản lý người dùng", "1", <UserOutlined />, [
    getItem(
      <Link to="users" style={{ textDecoration: "none" }}>
        Danh sách người dùng
      </Link>,
      "1.1"
    ),
    getItem(
      <Link to="users/create" style={{ textDecoration: "none" }}>
        Thêm người dùng
      </Link>,
      "1.2"
    ),
  ]),
  getItem("Quản lý phim", "2", <FileOutlined />, [
    getItem(
      <Link to="movies" style={{ textDecoration: "none" }}>
        Danh sách phim
      </Link>,
      "2.1"
    ),
    getItem(
      <Link to="movies/create" style={{ textDecoration: "none" }}>
        Thêm phim
      </Link>,
      "2.2"
    ),
  ]),
];

export default function AdminTemplate() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical">
          <Link to="/admin/users">
            <img src="/assets/img/logo.png" alt="das" />
          </Link>
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <AdminHeader />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              margin: "16px 0",
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
